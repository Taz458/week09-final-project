import { db } from "@/utils/utilities.js";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
    try {
        // Fetch games with reviews, ensuring to get the reviewer's ID. Uses json build object from the demo on week 08.
        const data = await db.query(`
            SELECT 
                games.*, 
                users.username AS game_owner, 
                ARRAY_AGG(
                    JSON_BUILD_OBJECT(
                        'id', review_user.id,
                        'username', review_user.username,
                        'content', review.content
                    )
                ) AS reviews
            FROM games 
            LEFT JOIN users ON games.user_id = users.id
            LEFT JOIN review ON games.id = review.games_id
            LEFT JOIN users AS review_user ON review.user_id = review_user.id
            GROUP BY games.id, users.username
            ORDER BY games.id
        `);

        const games = data.rows;

        return (
            <div className="max-w-5xl mx-auto p-4">
                <h2 className="text-3xl font-bold mb-6">Games</h2>
                {games.map((game) => (
                    <div key={game.id} className="mb-8 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
                        <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                        <Link href={`/games/${game.id}`}>
                            <Image 
                                height={500} 
                                width={350} 
                                alt={game.name} 
                                src={game.img_url} 
                                className="rounded-lg mb-4"
                            />
                        </Link>
                        <h2 className="text-lg font-medium text-gray-700">Created by: {game.creator}</h2>
                        <h2 className="text-lg font-medium text-gray-700">Release Year: {game.released_year}</h2>
                        <h2 className="text-lg font-medium text-gray-700">Description: {game.description}</h2>
                        <h2 className="mt-2 text-lg font-medium text-blue-500">
                            <Link href={`/profile/${game.user_id}`}>
                                Added by: {game.game_owner}
                            </Link>
                        </h2>

                        {/* Display reviews with usernames linking to their profiles */}
                        {Array.isArray(game.reviews) && game.reviews.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-lg">Reviews:</h4>
                                {game.reviews.map((review, index) => (
                                    <p key={index} className="mt-2 text-gray-700">
                                        <Link href={`/profile/${review.id}`}>
                                            <strong className="text-blue-600">{review.username}</strong>
                                        </Link> {review.content}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error("Error fetching games:", error);
        return <p>There was an error loading the games.</p>;
    }
}
