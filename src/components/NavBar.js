import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
            {/* Logo or App Name */}
            <div className="text-white font-bold text-lg">
            <Link href="/">GameHub</Link>
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6">
            <li>
                <Link href="/" className="text-white hover:text-gray-200">Home</Link>
            </li>
            <li>
                <Link href="/profile" className="text-white hover:text-gray-200">My Profile</Link>
            </li>
            <li>
                <Link href="/games" className="text-white hover:text-gray-200">Games</Link>
            </li>
            <li>
                <Link href="/add-new-game" className="text-white hover:text-gray-200">Add New game</Link>
            </li>
            </ul>
        </div>
        </nav>
    );
}
