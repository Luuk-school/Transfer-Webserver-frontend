import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">404 — Page Not Found</h1>
      <p className="text-gray-300">The page you are looking for doesn’t exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
      >
        Go to Home
      </Link>
    </div>
  )
}

export default NotFound
