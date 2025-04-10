import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-around items-center">
        <div>
          <Link to="/" className="text-xl font-bold text-purple-500">
            Karaoke App
          </Link>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-purple-400 font-semibold'
                : 'text-purple-500 hover:text-pink-500'
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
                ? 'text-purple-400 font-semibold'
                : 'text-purple-500 hover:text-pink-500'
            }
          >
            Songs
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
