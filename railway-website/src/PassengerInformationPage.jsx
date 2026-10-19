function PassengerInformationPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">
            West Central Railway
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Passenger Information
          </h1>

          <p className="mt-3 text-red-100 max-w-2xl">
            Important information and services for railway passengers.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">🎫</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Ticket Booking
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Information about railway ticket booking and reservation
              services for passengers.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">🚆</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Train Information
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Find important information related to trains, routes and
              railway services.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">🛡️</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Passenger Safety
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Important safety guidelines and information for railway
              passengers.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">♿</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Passenger Facilities
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Information about facilities available for passengers
              at railway stations.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">📞</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Railway Helpline
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Railway passengers can use helpline services for
              assistance and enquiries.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-4xl">ℹ️</div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              General Information
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Useful railway information and guidelines for a
              convenient journey.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default PassengerInformationPage