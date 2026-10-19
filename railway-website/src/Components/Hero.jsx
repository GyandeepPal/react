
function Hero() {
  return (
    <section className="relative overflow-hidden bg-red-800 text-white">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-[40px] border-white"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full border-[50px] border-white"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-14 sm:py-20 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-5">
              <span>🚆</span>
              <span>Indian Railways</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              West Central
              <span className="block text-yellow-300">
                Railway
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-red-100 max-w-xl leading-relaxed">
              Connecting people, places and possibilities through
              safe, reliable and efficient railway services.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">

              <a
                href="/train-services"
                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition shadow-lg"
              >
                🚆 Train Services
              </a>

              <a
                href="/passenger-information"
                className="bg-white/10 border border-white/30 px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-800 transition"
              >
                🎫 Passenger Information
              </a>

            </div>

          </div>


          {/* Right Side */}
          <div className="hidden md:flex justify-center lg:justify-end">

            <div className="relative w-full max-w-md">

              {/* Main Card */}
              <div className="bg-white text-gray-800 rounded-3xl p-7 shadow-2xl">

                <div className="flex items-center justify-between border-b border-gray-200 pb-5">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Railway Services
                    </p>

                    <h3 className="text-2xl font-black mt-1">
                      सेवा • सुरक्षा • सुविधा
                    </h3>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-3xl">
                    🚆
                  </div>

                </div>


                {/* Service Items */}
                <div className="space-y-4 mt-6">

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                      🚉
                    </div>

                    <div>
                      <p className="font-bold">
                        Train Services
                      </p>

                      <p className="text-sm text-gray-500">
                        Railway service information
                      </p>
                    </div>
                  </div>


                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
                      🎫
                    </div>

                    <div>
                      <p className="font-bold">
                        Passenger Services
                      </p>

                      <p className="text-sm text-gray-500">
                        Information for passengers
                      </p>
                    </div>
                  </div>


                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                      🛡️
                    </div>

                    <div>
                      <p className="font-bold">
                        Safety First
                      </p>

                      <p className="text-sm text-gray-500">
                        Safe and reliable railway
                      </p>
                    </div>
                  </div>

                </div>


                {/* Bottom */}
                <div className="mt-7 bg-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700">
                  🇮🇳 Ministry of Railways • Government of India
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero
