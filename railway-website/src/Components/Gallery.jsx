
function Gallery() {
  const images = [
    {
      title: "Railway Station",
      image: "/images/railway-station.jpg",
    },
    {
      title: "Indian Railway",
      image: "/images/railway-train.jpg",
    },
    {
      title: "Railway Track",
      image: "/images/railway-track.jpg",
    },
    {
      title: "Train Journey",
      image: "/images/railway-journey.jpg",
    },
    {
      title: "Railway Infrastructure",
      image: "/images/railway-infrastructure.jpg",
    },
    {
      title: "Railway Network",
      image: "/images/railway-network.jpg",
    },
  ]

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

          <div>
            <p className="text-xs sm:text-sm font-bold text-red-700 uppercase tracking-[0.2em]">
              Visual Gallery
            </p>

            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-gray-800">
              Railway Gallery
            </h2>

            <div className="flex items-center gap-2 mt-3">
              <div className="w-12 h-1 bg-red-700 rounded-full"></div>
              <div className="w-2 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          <p className="text-sm text-gray-500 max-w-sm">
            Explore railway stations, trains, tracks and infrastructure.
          </p>

        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {images.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-gray-200 h-64 sm:h-72 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">

                <div className="w-10 h-1 bg-yellow-400 rounded-full mb-3"></div>

                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-200 mt-1">
                  West Central Railway
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Gallery
