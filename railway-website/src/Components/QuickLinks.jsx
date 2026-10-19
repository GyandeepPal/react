
function QuickLinks() {
  const links = [
    {
      number: "01",
      title: "Train Services",
      description: "Check train and passenger services",
      icon: "🚆",
      path: "/train-services",
    },
    {
      number: "02",
      title: "Passenger Information",
      description: "Important information for passengers",
      icon: "🎫",
      path: "/passenger-information",
    },
    {
      number: "03",
      title: "Recruitment",
      description: "Latest railway recruitment updates",
      icon: "👨‍💼",
      path: "/recruitments",
    },
    {
      number: "04",
      title: "Tenders",
      description: "View latest railway tenders",
      icon: "📄",
      path: "/tenders",
    },
    {
      number: "05",
      title: "Departments",
      description: "Explore railway departments",
      icon: "🏢",
      path: "/departments",
    },
    {
      number: "06",
      title: "Contact Us",
      description: "Get in touch with railway officials",
      icon: "☎️",
      path: "/contact",
    },
  ]

  return (
    <section className="bg-gray-100 py-10 sm:py-14 lg:py-16">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7 sm:mb-9">

          <div>

            <p className="text-xs sm:text-sm font-bold text-red-700 uppercase tracking-[0.2em]">
              Quick Access
            </p>

            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-gray-800">
              Railway Services
            </h2>

            <div className="flex items-center gap-2 mt-3">

              <div className="w-12 h-1 bg-red-700 rounded-full"></div>

              <div className="w-2 h-1 bg-yellow-400 rounded-full"></div>

            </div>

          </div>

          <p className="text-sm text-gray-500 max-w-sm">
            Access important railway services and information quickly.
          </p>

        </div>


        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

          {links.map((link) => (

            <a
              key={link.path}
              href={link.path}
              className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Red top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>


              {/* Background number */}
              <span className="absolute right-4 top-3 text-5xl font-black text-gray-100 group-hover:text-red-50 transition-colors">
                {link.number}
              </span>


              <div className="relative flex items-start gap-4">

                {/* Icon */}
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-2xl sm:text-3xl group-hover:bg-red-700 group-hover:border-red-700 group-hover:scale-105 transition-all duration-300">
                  <span className="group-hover:grayscale group-hover:brightness-0 group-hover:invert transition">
                    {link.icon}
                  </span>
                </div>


                {/* Content */}
                <div className="min-w-0 flex-1">

                  <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                    {link.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500 leading-5">
                    {link.description}
                  </p>


                  {/* Explore */}
                  <div className="flex items-center gap-2 mt-4 text-xs sm:text-sm font-bold text-red-700">

                    <span>
                      Explore Service
                    </span>

                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>

                  </div>

                </div>

              </div>

            </a>

          ))}

        </div>


        {/* Bottom Information Strip */}
        <div className="mt-6 bg-red-700 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
              🇮🇳
            </div>

            <div>
              <p className="font-bold text-sm sm:text-base">
                Indian Railways
              </p>

              <p className="text-xs sm:text-sm text-red-100">
                Serving the nation with safe and reliable railway services
              </p>
            </div>

          </div>

          <span className="text-yellow-300 font-bold text-sm">
            सेवा • सुरक्षा • सुविधा
          </span>

        </div>

      </div>

    </section>
  )
}

export default QuickLinks
