import { db } from "@/utils/utilities";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function Page({ params }) {
    const { id } = await params; // Get the user ID from the URL

    // Fetch user info
    const userInfo = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (userInfo.rowCount === 0) {
        return notFound();
    }

    const user = userInfo.rows[0];

    // Fetch user's games
    const userGames = await db.query(`
        SELECT id, name, creator, released_year, description, img_url
        FROM games
        WHERE user_id = $1
        ORDER BY id DESC
    `, [id]);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{user.username}'s Profile</h1>
            <p className="text-lg mb-4">{user.bio || "No bio available"}</p>

            <h2 className="text-2xl font-semibold mb-4">{user.username}'s Posts:</h2>
            {userGames.rowCount === 0 ? (
                <p>No games posted yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userGames.rows.map((game) => (
                        <div key={game.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
                            <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                            <Link href={`/games/${game.id}`}>
                                <Image
                                    src={game.img_url}
                                    alt={game.name}
                                    width={350}
                                    height={500}
                                    className="rounded-lg mb-4"
                                />
                            </Link>
                            <p className="text-md font-medium text-gray-700"><strong>Created by:</strong> {game.creator}</p>
                            <p className="text-md font-medium text-gray-700"><strong>Release Year:</strong> {game.released_year}</p>
                            <p className="text-sm text-gray-600 mt-2"><strong>Description:</strong> {game.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
