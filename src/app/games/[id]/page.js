import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities.js";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SignInModal from "@/components/SignInModal";

export default async function GamePage({ params }) {
    const { id } = await params; // Get the game ID from the URL

    // Check Clerk authentication
    const { userId: clerkUserId, redirectToSignIn } = await auth();
    if (!clerkUserId) {
        return redirectToSignIn();
    }

    // Fetch the user's profile from your database
    const userResult = await db.query(`SELECT id FROM users WHERE clerk_id = $1`, [clerkUserId]);
    const user = userResult.rows[0];

    // Show sign-in modal if the user doesn't have a profile yet
    if (!user) {
        return <SignInModal />;
    }

    try {
        // Fetch game data with reviews
        const data = await db.query(`
            SELECT 
                games.*, 
                users.username AS game_owner, 
                ARRAY_AGG(
                    ROW(review_user.username, review.content)
                ) AS reviews
            FROM games 
            LEFT JOIN users ON games.user_id = users.id
            LEFT JOIN review ON games.id = review.games_id
            LEFT JOIN users AS review_user ON review.user_id = review_user.id
            WHERE games.id = $1
            GROUP BY games.id, users.username
        `, [id]);

        const game = data.rows[0];
        if (!game) {
            return <p>Game not found!</p>;
        }

        // Handle review submission
        async function handleReviewSubmit(formData) {
            "use server";

            const { reviewContent } = Object.fromEntries(formData);
            if (!clerkUserId) {
                throw new Error("You must be logged in to submit a review.");
            }

            // Insert the review
            await db.query(
                `INSERT INTO review (user_id, games_id, content) VALUES ($1, $2, $3)`,
                [user.id, id, reviewContent]
            );

            revalidatePath(`/games`);
            redirect(`/games`);
        }

        return (
            <div className="max-w-5xl mx-auto p-4">
                <h2 className="text-3xl font-bold mb-6">{game.name}</h2>
                <h3 className="text-xl font-semibold mb-4">Created by: {game.creator}</h3>
                <p className="text-lg mb-4">Release Year: {game.released_year}</p>
                <p className="text-lg mb-4">{game.description}</p>
                <div className="mb-6">
                    <Image 
                        src={game.img_url} 
                        height={500} 
                        width={350} 
                        alt={game.name} 
                        className="rounded-lg"
                    />
                </div>

                <h4 className="text-lg font-medium text-blue-600">
                    Added by: 
                    <Link href={`/profile/${game.user_id}`}>
                        {game.game_owner}
                    </Link>
                </h4>

                {/* Display reviews */}
                {Array.isArray(game.reviews) && game.reviews.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-xl font-semibold">Reviews:</h4>
                        {game.reviews.map((review, index) => (
                            <div key={index} className="mt-2">
                                <p className="text-lg">
                                    <strong className="text-blue-600">{review[0]}:</strong> {review[1]}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Review Form */}
                <form action={handleReviewSubmit} className="mt-8">
                    <h4 className="text-lg font-semibold">Add a Review:</h4>
                    <textarea 
                        name="reviewContent" 
                        required 
                        className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button 
                        type="submit" 
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error("Error fetching game:", error);
        return <p>There was an error loading the game details.</p>;
    }
}

