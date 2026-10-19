
import { useEffect, useState } from "react"

function Notices() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5001/api/notices")
      .then((res) => res.json())
      .then((data) => {
        setNotices(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error fetching notices:", error)
        setLoading(false)
      })
  }, [])

  const getPdfUrl = (pdfUrl) => {
    if (!pdfUrl) return ""
    return `http://localhost:5001${pdfUrl}`
  }

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Heading */}
        <div className="flex items-end justify-between gap-4 mb-5">

          <div>
            <p className="text-xs sm:text-sm font-bold text-red-700 uppercase tracking-widest">
              Information Centre
            </p>

            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-800">
              Latest Notices
            </h2>

            <div className="w-12 h-1 bg-red-700 rounded-full mt-3"></div>
          </div>

          <a
            href="/notices"
            className="shrink-0 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition"
          >
            View All →
          </a>

        </div>


        {/* Loading */}
        {loading && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">

            <div className="inline-block w-7 h-7 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div>

            <p className="text-sm text-gray-500 mt-3">
              Loading notices...
            </p>

          </div>
        )}


        {/* No Notices */}
        {!loading && notices.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">

            <div className="text-4xl">
              📢
            </div>

            <p className="text-gray-500 mt-3">
              No notices available.
            </p>

          </div>
        )}


        {/* Notice Ticker */}
        {!loading && notices.length > 0 && (
          <div className="relative">

            {/* Ticker */}
            <div className="flex items-stretch bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">

              {/* Fixed Label */}
              <div className="relative z-10 shrink-0 flex items-center gap-2 bg-red-700 text-white px-4 sm:px-6 py-4 font-bold text-sm">

                <span className="text-lg">
                  📢
                </span>

                <span className="hidden sm:inline">
                  LATEST NOTICE
                </span>

                <span className="sm:hidden">
                  NOTICE
                </span>

              </div>


              {/* Scrolling Area */}
              <div className="relative flex-1 overflow-hidden">

                <div className="flex items-center min-h-[60px]">

                  <div className="flex items-center gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">

                    {[...notices, ...notices].map((notice, index) => (

                      <div
                        key={`${notice._id}-${index}`}
                        className="flex items-center gap-3"
                      >

                        {notice.isNew && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-[10px] font-bold">
                            NEW
                          </span>
                        )}

                        <span className="text-sm font-semibold text-gray-700">
                          {notice.title}
                        </span>

                        {notice.date && (
                          <span className="text-xs text-gray-400">
                            {new Date(
                              notice.date
                            ).toLocaleDateString("en-IN")}
                          </span>
                        )}

                        {notice.pdfUrl && (
                          <a
                            href={getPdfUrl(notice.pdfUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-700 text-sm font-bold hover:text-red-900"
                          >
                            PDF ↗
                          </a>
                        )}

                        <span className="text-red-300">
                          •
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>


            {/* Notice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">

              {notices.slice(0, 3).map((notice, index) => (

                <div
                  key={notice._id}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-red-200 hover:shadow-md transition"
                >

                  <div className="flex items-start gap-4">

                    {/* Number */}
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>


                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        {notice.isNew && (
                          <span className="bg-red-700 text-white px-2 py-1 rounded-full text-[10px] font-bold">
                            NEW
                          </span>
                        )}

                        {notice.date && (
                          <span className="text-xs text-gray-400">
                            {new Date(
                              notice.date
                            ).toLocaleDateString("en-IN")}
                          </span>
                        )}

                      </div>


                      <h3 className="mt-2 text-sm font-bold text-gray-800 leading-5 group-hover:text-red-700 transition">
                        {notice.title}
                      </h3>


                      {notice.category && (
                        <p className="text-xs text-gray-500 mt-2">
                          {notice.category}
                        </p>
                      )}


                      {notice.pdfUrl && (
                        <a
                          href={getPdfUrl(notice.pdfUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-red-700 hover:text-red-900"
                        >
                          📄 View PDF
                          <span>↗</span>
                        </a>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>


      {/* Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

    </section>
  )
}

export default Notices
