import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

function Header() {
  const [search, setSearch] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()

    if (!search.trim()) return

    window.location.href = `/search?search=${encodeURIComponent(search)}`
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Departments", path: "/departments" },
    { name: "Recruitment", path: "/recruitments" },
    { name: "Tenders", path: "/tenders" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header>

      {/* Top Government Bar */}
      <div className="bg-gray-950 text-gray-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">

          <p>Government of India</p>

          <p className="hidden sm:block">
            Ministry of Railways
          </p>

        </div>
      </div>


      {/* Main Header */}
      <div className="bg-red-700 text-white">

        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Railway Logo + Name */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3"
            >

              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white text-red-700 flex items-center justify-center font-black text-lg sm:text-xl shrink-0">
                🚆
              </div>

              <div>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-tight">
                  West Central Railway
                </h1>

                <p className="text-xs sm:text-sm text-red-100 mt-1">
                  Indian Railways
                </p>
              </div>

            </Link>


            {/* Right Side */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="flex"
              >

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full sm:w-56 px-4 py-2.5 text-sm text-gray-800 bg-white rounded-l-lg outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gray-900 rounded-r-lg hover:bg-gray-800 transition"
                >
                  🔍
                </button>

              </form>


              {/* Ministry Information */}
              <div className="hidden md:block text-right">

                <p className="text-sm font-semibold">
                  Ministry of Railways
                </p>

                <p className="text-xs text-red-100 mt-1">
                  Government of India
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>


      {/* Navigation */}
      <nav className="bg-gray-900 text-white border-b border-gray-700">

        <div className="max-w-7xl mx-auto px-4">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 min-h-12">

            {navItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`whitespace-nowrap px-4 py-3 font-semibold transition ${
                  isActive(item.path)
                    ? "bg-red-700 text-white"
                    : "hover:text-yellow-400 hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>

            ))}

          </div>


          {/* Mobile Navigation Header */}
          <div className="md:hidden flex items-center justify-between min-h-12">

            <span className="font-semibold">
              Navigation
            </span>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl px-3 py-2 hover:bg-gray-800 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>


          {/* Mobile Menu */}
          {menuOpen && (

            <div className="md:hidden border-t border-gray-700 pb-3">

              {navItems.map((item) => (

                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 font-semibold rounded-lg mt-1 transition ${
                    isActive(item.path)
                      ? "bg-red-700 text-white"
                      : "hover:bg-gray-800 hover:text-yellow-400"
                  }`}
                >
                  {item.name}
                </Link>

              ))}

            </div>

          )}

        </div>

      </nav>

    </header>
  )
}

export default Header