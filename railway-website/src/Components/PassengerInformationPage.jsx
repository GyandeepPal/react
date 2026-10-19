
function PassengerInformationPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">
            Passenger Services
          </p>

          <h1 className="text-3xl sm:text-4xl font-black mt-2">
            Passenger Information
          </h1>

          <p className="mt-3 text-red-100 max-w-2xl">
            Important information and services for railway passengers.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-4xl">
              🎫
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Ticket Information
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-6">
              Information related to railway tickets, reservations and
              passenger booking services.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-4xl">
              🚆
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Train Services
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-6">
              Find information about train services and railway operations.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-4xl">
              🛡️
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Passenger Safety
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-6">
              Follow important railway safety guidelines during your journey.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-4xl">
              🧳
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Baggage Information
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-6">
              Important information regarding passenger luggage and baggage.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-4xl">
              ♿
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Passenger Facilities
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-6">
              Information about facilities and assistance available to
              passengers.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-4xl">
              ☎️
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Help & Support
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-6">
              Get important contact and support information for railway
              passengers.
            </p>
          </div>

        </div>

      </main>

    </div>
  )
}

export default PassengerInformationPage