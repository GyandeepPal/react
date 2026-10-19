
import { useEffect, useState } from "react"

function Recruitment() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5001/api/recruitments")
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data.slice(0, 3) : [])
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error fetching recruitment:", error)
        setLoading(false)
      })
  }, [])

  const getPdfUrl = (pdfUrl) => {
    if (!pdfUrl) return ""
    return `http://localhost:5001${pdfUrl}`
  }

  return (
    <section className="bg-white py-10 sm:py-14">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

          <div>

            <p className="text-xs sm:text-sm font-bold text-red-700 uppercase tracking-[0.18em]">
              Career Opportunities
            </p>

            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-gray-800">
              Railway Recruitment
            </h2>

            <div className="flex items-center gap-2 mt-3">
              <div className="w-12 h-1 bg-red-700 rounded-full"></div>
              <div className="w-2 h-1 bg-yellow-400 rounded-full"></div>
            </div>

          </div>

          <a
            href="/recruitments"
            className="self-start sm:self-auto shrink-0 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition"
          >
            View All →
          </a>

        </div>


        {/* Loading */}
        {loading && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">

            <div className="inline-block w-7 h-7 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div>

            <p className="text-sm text-gray-500 mt-3">
              Loading recruitment...
            </p>

          </div>
        )}


        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">

            <div className="text-4xl">
              👨‍💼
            </div>

            <p className="text-gray-500 mt-3">
              No recruitment available.
            </p>

          </div>
        )}


        {/* Recruitment Cards */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {jobs.map((job, index) => (

              <div
                key={job._id}
                className="group relative bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:bg-white hover:border-red-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Top Accent */}
                <div className="h-1 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>


                <div className="p-5 sm:p-6">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">

                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl group-hover:bg-red-700 transition">
                      👨‍💼
                    </div>

                    {job.isNew && (
                      <span className="bg-red-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        NEW
                      </span>
                    )}

                  </div>


                  {/* Number */}
                  <p className="mt-5 text-xs font-bold text-gray-400">
                    RECRUITMENT • {String(index + 1).padStart(2, "0")}
                  </p>


                  {/* Title */}
                  <h3 className="mt-2 text-base sm:text-lg font-bold text-gray-800 leading-6 group-hover:text-red-700 transition">
                    {job.title}
                  </h3>


                  {/* Category */}
                  {job.category && (
                    <span className="inline-block mt-3 bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {job.category}
                    </span>
                  )}


                  {/* Description */}
                  {job.description && (
                    <p className="text-xs sm:text-sm text-gray-500 leading-6 mt-3 line-clamp-3">
                      {job.description}
                    </p>
                  )}


                  {/* Date */}
                  {job.date && (
                    <p className="text-xs text-gray-400 mt-4">
                      📅 Published:{" "}
                      {new Date(job.date).toLocaleDateString("en-IN")}
                    </p>
                  )}


                  {/* PDF */}
                  {job.pdfUrl && (
                    <a
                      href={getPdfUrl(job.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-5 bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition"
                    >
                      📄 View Notification
                      <span>↗</span>
                    </a>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </section>
  )
}

export default Recruitment
