function TrainServicesPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">
            West Central Railway
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Train Services
          </h1>

          <p className="mt-3 text-red-100 max-w-2xl">
            Information about railway train services and passenger operations.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">🚆</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Passenger Trains
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Information related to passenger train services operated
              through West Central Railway.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">🎫</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Reservation
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Passengers can use railway reservation services for
              booking and travel information.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">🕐</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Train Timings
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Check train schedules and timing information for
              railway journeys.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default TrainServicesPage