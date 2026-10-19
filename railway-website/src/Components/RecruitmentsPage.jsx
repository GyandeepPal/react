import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function RecruitmentsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")?.toLowerCase().trim() || ""

  useEffect(() => {
    fetch("http://localhost:5001/api/recruitments")
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error fetching recruitments:", error)
        setLoading(false)
      })
  }, [])

  const getPdfUrl = (pdfUrl) => {
    if (!pdfUrl) return ""
    return `http://localhost:5001${pdfUrl}`
  }

  // Search filter
  const filteredJobs = jobs.filter((job) => {
    if (!search) return true

    return (
      job.title?.toLowerCase().includes(search) ||
      job.category?.toLowerCase().includes(search) ||
      job.description?.toLowerCase().includes(search)
    )
  })

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Page Header */}
      <div className="bg-red-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold uppercase tracking-wider">
            Careers
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            All Recruitment
          </h1>

          <p className="mt-2 text-red-100">
            Latest railway recruitment and job opportunities
          </p>

          {search && (
            <p className="mt-4 text-sm text-red-100">
              Search results for:{" "}
              <span className="font-bold text-white">
                "{search}"
              </span>
            </p>
          )}

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            Loading recruitments...
          </div>
        )}

        {/* No recruitment */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No recruitment available.
          </div>
        )}

        {/* No search result */}
        {!loading &&
          jobs.length > 0 &&
          filteredJobs.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">

              <div className="text-5xl">
                🔍
              </div>

              <h2 className="text-xl font-bold text-gray-700 mt-4">
                No results found
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                No recruitment matches your search.
              </p>

            </div>
          )}

        {/* Recruitment List */}
        {!loading &&
          filteredJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredJobs.map((job) => (

                <div
                  key={job._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition"
                >

                  <div className="flex items-center justify-between gap-3">

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                      {job.category || "RECRUITMENT"}
                    </span>

                    {job.isNew && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">
                        NEW
                      </span>
                    )}

                  </div>

                  <h2 className="mt-4 text-lg font-bold text-gray-800">
                    {job.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Published:{" "}
                    {job.date
                      ? new Date(job.date).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>

                  {job.description && (
                    <p className="mt-3 text-sm text-gray-600">
                      {job.description}
                    </p>
                  )}

                  {job.pdfUrl && (
                    <a
                      href={getPdfUrl(job.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mt-5 items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      📄 View PDF
                    </a>
                  )}

                </div>

              ))}

            </div>
          )}

      </div>

    </div>
  )
}

export default RecruitmentsPage