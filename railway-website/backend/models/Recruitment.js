import { useEffect, useState } from "react"

function Recruitment() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5001/api/recruitments")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error fetching recruitment:", error)
        setLoading(false)
      })
  }, [])

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">

          <div>
            <p className="text-xs sm:text-sm font-semibold text-red-700 uppercase tracking-wider">
              Career Opportunities
            </p>

            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-800">
              Recruitment
            </h2>
          </div>

          <button className="shrink-0 text-sm sm:text-base text-red-700 font-semibold hover:underline">
            View All →
          </button>

        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Loading recruitment...
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recruitment available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="group border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 hover:border-red-200 transition duration-200"
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                    {job.category}
                  </span>

                  <span className="text-gray-300 group-hover:text-red-600 transition">
                    →
                  </span>

                </div>

                <h3 className="mt-5 text-base sm:text-lg font-semibold text-gray-800 leading-6 group-hover:text-red-700 transition">
                  {job.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-gray-500">
                  {job.description}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-gray-500">
                  Published:{" "}
                  {new Date(job.date).toLocaleDateString("en-IN")}
                </p>

                <button className="mt-5 text-sm font-semibold text-red-700 hover:underline">
                  View Details →
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  )
}

export default Recruitment