function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Departments", path: "/departments" },
    { name: "Recruitment", path: "/recruitments" },
    { name: "Tenders", path: "/tenders" },
    { name: "Contact Us", path: "/contact" },
  ]

  const importantLinks = [
    { name: "Indian Railways", path: "https://indianrailways.gov.in/" },
    { name: "Ministry of Railways", path: "https://www.indianrailways.gov.in/" },
    { name: "Railway Board", path: "https://indianrailways.gov.in/" },
    { name: "Passenger Services", path: "/passenger-information" },
    { name: "RTI", path: "#" },
    { name: "Help & Support", path: "/contact" },
  ]

  return (
    <footer className="bg-gray-950 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-10">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-white text-red-700 flex items-center justify-center text-xl shadow">
                🚆
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  West Central Railway
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Indian Railways
                </p>
              </div>

            </div>

            <p className="mt-5 text-sm text-gray-400 leading-6">
              Official information portal of West Central Railway.
              Providing railway services, notices, recruitment,
              tenders and important updates.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Government of India
            </div>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className="text-base sm:text-lg font-bold">
              Quick Links
            </h3>

            <div className="w-8 h-1 bg-red-700 rounded-full mt-2"></div>

            <ul className="mt-5 space-y-3">

              {quickLinks.map((link) => (
                <li key={link.name}>

                  <a
                    href={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                  >
                    <span className="text-red-600 group-hover:translate-x-1 transition">
                      →
                    </span>

                    {link.name}
                  </a>

                </li>
              ))}

            </ul>

          </div>


          {/* Important Links */}
          <div>

            <h3 className="text-base sm:text-lg font-bold">
              Important Links
            </h3>

            <div className="w-8 h-1 bg-red-700 rounded-full mt-2"></div>

            <ul className="mt-5 space-y-3">

              {importantLinks.map((link) => (
                <li key={link.name}>

                  <a
                    href={link.path}
                    target={
                      link.path.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      link.path.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                  >
                    <span className="text-red-600 group-hover:translate-x-1 transition">
                      →
                    </span>

                    {link.name}
                  </a>

                </li>
              ))}

            </ul>

          </div>


          {/* Contact */}
          <div>

            <h3 className="text-base sm:text-lg font-bold">
              Contact Us
            </h3>

            <div className="w-8 h-1 bg-red-700 rounded-full mt-2"></div>

            <div className="mt-5 space-y-4 text-sm text-gray-400">

              <div className="flex gap-3">
                <span className="text-lg">📍</span>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Headquarters
                  </p>

                  <p className="mt-1">
                    Jabalpur, Madhya Pradesh
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-lg">✉️</span>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Email
                  </p>

                  <p className="mt-1 break-words">
                    info@railway.gov.in
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-lg">📞</span>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Phone
                  </p>

                  <p className="mt-1">
                    0761-0000000
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom Bar */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-4 py-5">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
              © 2026 West Central Railway. All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">

              <a
                href="#"
                className="text-gray-500 hover:text-white transition"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-gray-500 hover:text-white transition"
              >
                Disclaimer
              </a>

              <a
                href="#"
                className="text-gray-500 hover:text-white transition"
              >
                Accessibility
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer