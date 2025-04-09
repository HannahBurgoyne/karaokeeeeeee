import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold text-pink-600">
            Karaoke App
          </Link>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-pink-600 font-semibold'
                : 'text-gray-700 hover:text-pink-500'
            }
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/songs"
            className={({ isActive }) =>
              isActive
                ? 'text-pink-600 font-semibold'
                : 'text-gray-700 hover:text-pink-500'
            }
          >
            Songs
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
