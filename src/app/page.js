import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome to GameHub
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A platform where gamers can post their favorite games, share reviews, and explore others' posts.
        </p>
      </div>

      <div className="mt-8 max-w-3xl mx-auto text-left">
        <h2 className="text-3xl font-semibold text-gray-800">
          How It Works
        </h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-500">1.</span>
            <p className="text-lg text-gray-700">
              <strong>Sign Up</strong> using Clerk and create a personalized profile to start sharing your posts.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-500">2.</span>
            <p className="text-lg text-gray-700">
              <strong>Post a New Game</strong> by visiting the <Link href="/add-new-game" className="text-blue-500 hover:underline">Add New Game</Link> page.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-500">3.</span>
            <p className="text-lg text-gray-700">
              <strong>Add a Review</strong> by clicking on a game posted by you or others and typing your feedback.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-500">4.</span>
            <p className="text-lg text-gray-700">
              <strong>View and Manage Your Posts</strong> from your <Link href="/profile" className="text-blue-500 hover:underline">profile</Link>, where you can also delete them.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-500">5.</span>
            <p className="text-lg text-gray-700">
              <strong>Explore Other Users' Profiles</strong> by clicking on their name in a review or game listing.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/profile"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
}

