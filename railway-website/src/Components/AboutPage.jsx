function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">
            West Central Railway
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            About Us
          </h1>

          <p className="mt-3 text-red-100 max-w-2xl">
            Information about West Central Railway and its role in Indian Railways.
          </p>

        </div>
      </div>


      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">

            <h2 className="text-2xl font-bold text-gray-800">
              West Central Railway
            </h2>

            <div className="w-16 h-1 bg-red-700 mt-3 mb-6 rounded-full"></div>

            <p className="text-gray-600 leading-7">
              West Central Railway is one of the railway zones of
              Indian Railways. The zone is responsible for railway
              operations, passenger services, freight transportation,
              infrastructure and safety across its jurisdiction.
            </p>

            <p className="text-gray-600 leading-7 mt-4">
              The railway administration works towards providing
              efficient, safe and reliable railway services to
              passengers and supporting the transportation needs
              of the region.
            </p>

          </div>


          {/* Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            <h3 className="text-xl font-bold text-gray-800">
              Railway Information
            </h3>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs uppercase text-gray-400 font-semibold">
                  Organization
                </p>
                <p className="text-gray-700 font-semibold mt-1">
                  Indian Railways
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400 font-semibold">
                  Ministry
                </p>
                <p className="text-gray-700 font-semibold mt-1">
                  Ministry of Railways
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400 font-semibold">
                  Government
                </p>
                <p className="text-gray-700 font-semibold mt-1">
                  Government of India
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Responsibilities */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Our Responsibilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="text-3xl">🚆</div>
              <h3 className="font-bold text-gray-800 mt-3">
                Train Operations
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Safe and efficient operation of passenger and freight trains.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="text-3xl">👥</div>
              <h3 className="font-bold text-gray-800 mt-3">
                Passenger Services
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Providing reliable services and facilities for railway passengers.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="text-3xl">🛤️</div>
              <h3 className="font-bold text-gray-800 mt-3">
                Infrastructure
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Development and maintenance of railway infrastructure.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="text-3xl">🛡️</div>
              <h3 className="font-bold text-gray-800 mt-3">
                Safety
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Maintaining high standards of railway safety and security.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AboutPage
