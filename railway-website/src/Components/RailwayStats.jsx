
function RailwayStats() {
  const stats = [
    {
      value: "294",
      label: "Railway Stations",
      icon: "🚉",
    },
    {
      value: "3,109",
      label: "Route Kilometres",
      icon: "🛤️",
    },
    {
      value: "260M+",
      label: "Passengers Served",
      icon: "👥",
    },
    {
      value: "55,616",
      label: "Regular Employees",
      icon: "👨‍💼",
    },
    {
      value: "5,817",
      label: "Running Track Kms",
      icon: "🚆",
    },
  ]

  return (
    <section className="bg-gray-900 text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-bold text-yellow-400 uppercase tracking-[0.2em]">
            West Central Railway
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-black">
            Railway at a Glance
          </h2>

          <div className="flex justify-center items-center gap-2 mt-3">
            <div className="w-12 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-1 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-center hover:bg-white/10 hover:border-red-500/50 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl">
                {stat.icon}
              </div>

              <p className="mt-4 text-2xl sm:text-3xl font-black text-yellow-400">
                {stat.value}
              </p>

              <p className="mt-2 text-xs sm:text-sm text-gray-300 font-semibold leading-5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-7">
          Source: West Central Railway General Manager Annual Report 2023-24
        </p>

      </div>
    </section>
  )
}

export default RailwayStats
