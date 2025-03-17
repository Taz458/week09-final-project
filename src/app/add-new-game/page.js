// app/add-new-game/page.js or wherever your page is
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities.js";
import { redirect } from "next/navigation";
import AddGameForm from "@/components/Add-Game-Form";
import SignInModal from "@/components/SignInModal";

export default async function AddNewGamePage() {
    // Clerk auth check
    const { userId: clerkUserId, redirectToSignIn } = await auth();

    if (!clerkUserId) {
        redirectToSignIn();
        return;
    }

    // Check if user exists in the "users" table
    const userResult = await db.query(
        `SELECT id FROM users WHERE clerk_id = $1`,
        [clerkUserId]
    );
    const user = userResult.rows[0];

    // If the user doesn’t exist, show the SignInModal
    if (!user) {
        return <SignInModal />;
    }

    // Form submission logic
    async function handleSubmit(formData) {
        'use server';
        const data = Object.fromEntries(formData);
        const { name, creator, description, released_year, img_url } = data;

        // Insert game with user_id
        await db.query(
        `INSERT INTO games (name, creator, description, released_year, img_url, user_id) VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, creator, description, released_year, img_url, user.id]
        );

        redirect('/games');
    }

    return (
        <AddGameForm handleSubmit={handleSubmit} />
    );
}
