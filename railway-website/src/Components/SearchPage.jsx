import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"

function SearchPage() {
  const [searchParams] = useSearchParams()

  const search =
    searchParams.get("search")?.toLowerCase().trim() || ""

  const [notices, setNotices] = useState([])
  const [recruitments, setRecruitments] = useState([])
  const [tenders, setTenders] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    Promise.all([
      fetch("http://localhost:5001/api/notices").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5001/api/recruitments").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5001/api/tenders").then((res) =>
        res.json()
      ),
    ])
      .then(([noticeData, recruitmentData, tenderData]) => {
        setNotices(
          Array.isArray(noticeData) ? noticeData : []
        )

        setRecruitments(
          Array.isArray(recruitmentData)
            ? recruitmentData
            : []
        )

        setTenders(
          Array.isArray(tenderData) ? tenderData : []
        )

        setLoading(false)
      })
      .catch((error) => {
        console.log("Global search error:", error)
        setLoading(false)
      })
  }, [search])

  const filterItems = (items) => {
    if (!search) return []

    return items.filter((item) => {
      return (
        item.title?.toLowerCase().includes(search) ||
        item.category?.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search)
      )
    })
  }

  const filteredNotices = filterItems(notices)
  const filteredRecruitments = filterItems(recruitments)
  const filteredTenders = filterItems(tenders)

  const totalResults =
    filteredNotices.length +
    filteredRecruitments.length +
    filteredTenders.length

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-red-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold uppercase tracking-wider">
            Information Centre
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Search Results
          </h1>

          {search && (
            <p className="mt-3 text-red-100">
              Results for{" "}
              <span className="font-bold text-white">
                "{search}"
              </span>
            </p>
          )}

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {loading && (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500">
            Searching...
          </div>
        )}

        {!loading && !search && (
          <div className="bg-white rounded-xl p-10 text-center">

            <div className="text-5xl">
              🔎
            </div>

            <h2 className="text-xl font-bold text-gray-700 mt-4">
              Search Railway Website
            </h2>

            <p className="text-gray-500 mt-2">
              Enter a keyword to search notices, recruitment and tenders.
            </p>

          </div>
        )}

        {!loading && search && totalResults === 0 && (
          <div className="bg-white rounded-xl p-10 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="text-xl font-bold text-gray-700 mt-4">
              No results found
            </h2>

            <p className="text-gray-500 mt-2">
              No notices, recruitment or tenders match your search.
            </p>

          </div>
        )}

        {!loading && totalResults > 0 && (
          <div className="space-y-8">

            {/* Result Count */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                Total Results
              </p>

              <p className="text-3xl font-bold text-red-700 mt-1">
                {totalResults}
              </p>
            </div>


            {/* Notices */}
            {filteredNotices.length > 0 && (
              <section>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    📢 Notices
                  </h2>

                  <Link
                    to={`/notices?search=${encodeURIComponent(search)}`}
                    className="text-red-700 font-semibold text-sm hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

                  {filteredNotices.map((notice) => (
                    <div
                      key={notice._id}
                      className="p-5 border-b last:border-b-0 hover:bg-red-50 transition"
                    >

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

                      <h3 className="font-bold text-gray-800 mt-2">
                        {notice.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {notice.category}
                      </p>

                      {notice.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {notice.description}
                        </p>
                      )}

                    </div>
                  ))}

                </div>

              </section>
            )}


            {/* Recruitment */}
            {filteredRecruitments.length > 0 && (
              <section>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    👨‍💼 Recruitment
                  </h2>

                  <Link
                    to={`/recruitments?search=${encodeURIComponent(search)}`}
                    className="text-red-700 font-semibold text-sm hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                  {filteredRecruitments.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition"
                    >

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                        {job.category || "RECRUITMENT"}
                      </span>

                      <h3 className="font-bold text-gray-800 mt-4">
                        {job.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        Published:{" "}
                        {job.date
                          ? new Date(
                              job.date
                            ).toLocaleDateString("en-IN")
                          : "N/A"}
                      </p>

                      {job.description && (
                        <p className="text-sm text-gray-600 mt-3">
                          {job.description}
                        </p>
                      )}

                    </div>
                  ))}

                </div>

              </section>
            )}


            {/* Tenders */}
            {filteredTenders.length > 0 && (
              <section>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    📄 Tenders
                  </h2>

                  <Link
                    to={`/tenders?search=${encodeURIComponent(search)}`}
                    className="text-red-700 font-semibold text-sm hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                  {filteredTenders.map((tender) => (
                    <div
                      key={tender._id}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition"
                    >

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {tender.category || "TENDER"}
                      </span>

                      <h3 className="font-bold text-gray-800 mt-4">
                        {tender.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        Published:{" "}
                        {tender.date
                          ? new Date(
                              tender.date
                            ).toLocaleDateString("en-IN")
                          : "N/A"}
                      </p>

                      {tender.description && (
                        <p className="text-sm text-gray-600 mt-3">
                          {tender.description}
                        </p>
                      )}

                    </div>
                  ))}

                </div>

              </section>
            )}

          </div>
        )}

      </div>

    </div>
  )
}

export default SearchPage