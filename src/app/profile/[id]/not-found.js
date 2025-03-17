import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested user!</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}

//notFound() Function:
// When you call notFound() in a page (like your [id]/page.js),
// Next.js automatically looks for a file named not-found.js in the same directory as the page that called it.