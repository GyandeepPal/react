import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function TendersPage() {
  const [tenders, setTenders] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")?.toLowerCase().trim() || ""

  useEffect(() => {
    fetch("http://localhost:5001/api/tenders")
      .then((res) => res.json())
      .then((data) => {
        setTenders(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error fetching tenders:", error)
        setLoading(false)
      })
  }, [])

  const getPdfUrl = (pdfUrl) => {
    if (!pdfUrl) return ""
    return `http://localhost:5001${pdfUrl}`
  }

  // Search filter
  const filteredTenders = tenders.filter((tender) => {
    if (!search) return true

    return (
      tender.title?.toLowerCase().includes(search) ||
      tender.category?.toLowerCase().includes(search) ||
      tender.description?.toLowerCase().includes(search)
    )
  })

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Page Header */}
      <div className="bg-red-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold uppercase tracking-wider">
            Procurement & Contracts
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            All Tenders
          </h1>

          <p className="mt-2 text-red-100">
            Latest tenders and procurement notices
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
            Loading tenders...
          </div>
        )}

        {/* No tenders */}
        {!loading && tenders.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No tenders available.
          </div>
        )}

        {/* No search result */}
        {!loading &&
          tenders.length > 0 &&
          filteredTenders.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">

              <div className="text-5xl">
                🔍
              </div>

              <h2 className="text-xl font-bold text-gray-700 mt-4">
                No results found
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                No tenders match your search.
              </p>

            </div>
          )}

        {/* Tenders List */}
        {!loading &&
          filteredTenders.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredTenders.map((tender) => (

                <div
                  key={tender._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition"
                >

                  <div className="flex items-center justify-between gap-3">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      {tender.category || "TENDER"}
                    </span>

                    {tender.isNew && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">
                        NEW
                      </span>
                    )}

                  </div>

                  <h2 className="mt-4 text-lg font-bold text-gray-800">
                    {tender.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Published:{" "}
                    {tender.date
                      ? new Date(
                          tender.date
                        ).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>

                  {tender.description && (
                    <p className="mt-3 text-sm text-gray-600">
                      {tender.description}
                    </p>
                  )}

                  {tender.pdfUrl && (
                    <a
                      href={getPdfUrl(tender.pdfUrl)}
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

export default TendersPage