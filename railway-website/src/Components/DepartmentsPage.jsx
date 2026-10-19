function DepartmentsPage() {
  const departments = [
    {
      name: "Engineering",
      icon: "🛤️",
      description:
        "Responsible for railway tracks, bridges, buildings and other infrastructure."
    },
    {
      name: "Electrical",
      icon: "⚡",
      description:
        "Manages electrical systems, railway electrification and power-related services."
    },
    {
      name: "Mechanical",
      icon: "⚙️",
      description:
        "Responsible for locomotives, coaches, wagons and mechanical maintenance."
    },
    {
      name: "Operations",
      icon: "🚆",
      description:
        "Manages train operations, scheduling and efficient railway services."
    },
    {
      name: "Signal & Telecom",
      icon: "📡",
      description:
        "Maintains signalling, communication and railway telecommunications systems."
    },
    {
      name: "Personnel",
      icon: "👥",
      description:
        "Handles employee administration, recruitment and personnel-related matters."
    },
    {
      name: "Accounts",
      icon: "💰",
      description:
        "Manages railway finances, accounting and financial administration."
    },
    {
      name: "Commercial",
      icon: "📋",
      description:
        "Handles passenger services, freight, commercial activities and revenue."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">
            West Central Railway
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Departments
          </h1>

          <p className="mt-3 text-red-100 max-w-2xl">
            Explore the major departments responsible for railway
            operations and administration.
          </p>

        </div>
      </div>


      {/* Departments */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {departments.map((department) => (

            <div
              key={department.name}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
            >

              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-3xl">
                {department.icon}
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-5">
                {department.name}
              </h2>

              <p className="text-sm text-gray-500 leading-6 mt-3">
                {department.description}
              </p>

              <button className="mt-5 text-sm font-semibold text-red-700 hover:underline">
                View Details →
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default DepartmentsPage