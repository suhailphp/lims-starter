/* REUSABLE */
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-light">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-default">Page not found.</p>
      <Link
        to="/login"
        className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-800"
      >
        Go home
      </Link>
    </div>
  )
}
