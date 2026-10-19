import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function NoticesPage() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")?.toLowerCase().trim() || ""

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

  // Search filter
  const filteredNotices = notices.filter((notice) => {
    if (!search) return true

    return (
      notice.title?.toLowerCase().includes(search) ||
      notice.category?.toLowerCase().includes(search) ||
      notice.description?.toLowerCase().includes(search)
    )
  })

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Page Header */}
      <div className="bg-red-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold uppercase tracking-wider">
            Information Centre
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            All Notices
          </h1>

          <p className="mt-2 text-red-100">
            Latest notices and official announcements
          </p>

          {/* Search Result Info */}
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
            Loading notices...
          </div>
        )}

        {/* No notices */}
        {!loading && notices.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No notices available.
          </div>
        )}

        {/* Search Results */}
        {!loading &&
          notices.length > 0 &&
          filteredNotices.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">

              <div className="text-5xl">
                🔍
              </div>

              <h2 className="text-xl font-bold text-gray-700 mt-4">
                No results found
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                No notices match your search.
              </p>

            </div>
          )}

        {/* Notices List */}
        {!loading &&
          filteredNotices.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

              {filteredNotices.map((notice, index) => (

                <div
                  key={notice._id}
                  className="p-5 border-b border-gray-200 last:border-b-0 hover:bg-red-50 transition"
                >

                  <div className="flex gap-4">

                    {/* Number */}
                    <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-lg bg-red-100 text-red-700 items-center justify-center font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-2">

                        {notice.isNew && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                            NEW
                          </span>
                        )}

                        <span className="text-xs text-gray-400">
                          {notice.date
                            ? new Date(
                                notice.date
                              ).toLocaleDateString("en-IN")
                            : ""}
                        </span>

                      </div>

                      {/* Title */}
                      <h2 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">
                        {notice.title}
                      </h2>

                      {/* Category */}
                      <p className="mt-1 text-sm text-gray-500">
                        {notice.category}
                      </p>

                      {/* Description */}
                      {notice.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {notice.description}
                        </p>
                      )}

                      {/* PDF */}
                      {notice.pdfUrl && (
                        <a
                          href={getPdfUrl(notice.pdfUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex mt-4 items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                          📄 View PDF
                        </a>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

      </div>

    </div>
  )
}

export default NoticesPage