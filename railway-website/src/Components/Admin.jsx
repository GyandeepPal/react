import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Admin() {
  const navigate = useNavigate()

  const token = localStorage.getItem("adminToken")

  const [type, setType] = useState("notice")

  const [notices, setNotices] = useState([])
  const [recruitments, setRecruitments] = useState([])
  const [tenders, setTenders] = useState([])

  const [noticeCount, setNoticeCount] = useState(0)
  const [recruitmentCount, setRecruitmentCount] = useState(0)
  const [tenderCount, setTenderCount] = useState(0)

  const totalContent =
    noticeCount + recruitmentCount + tenderCount

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")

  const [editingId, setEditingId] = useState(null)

  const [search, setSearch] = useState("")

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // ===============================
  // AUTH CHECK
  // ===============================

  useEffect(() => {
    if (!token) {
      navigate("/admin-login")
    }
  }, [token, navigate])

  // ===============================
  // FETCH DATA
  // ===============================

  const fetchData = async () => {
    try {
      const [noticeRes, recruitmentRes, tenderRes] =
        await Promise.all([
          fetch("http://localhost:5001/api/notices"),
          fetch("http://localhost:5001/api/recruitments"),
          fetch("http://localhost:5001/api/tenders"),
        ])

      const noticeData = await noticeRes.json()
      const recruitmentData = await recruitmentRes.json()
      const tenderData = await tenderRes.json()

      setNotices(noticeData)
      setRecruitments(recruitmentData)
      setTenders(tenderData)

      setNoticeCount(noticeData.length)
      setRecruitmentCount(recruitmentData.length)
      setTenderCount(tenderData.length)

    } catch (error) {
      console.error(error)
      alert("Data fetch failed")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ===============================
  // CLEAR FORM
  // ===============================

  const clearForm = () => {
    setTitle("")
    setCategory("")
    setDescription("")
    setDate("")
    setPdfUrl("")
    setEditingId(null)
  }

  // ===============================
  // TYPE CHANGE
  // ===============================

  const changeType = (newType) => {
    setType(newType)
    clearForm()
    setSearch("")
  }

  // ===============================
  // PDF UPLOAD
  // ===============================

  const uploadPdf = async (file) => {
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("PDF size must be less than 10MB")
      return
    }

    try {
      setUploading(true)

      const formData = new FormData()
      formData.append("pdf", file)

      const response = await fetch(
        "http://localhost:5001/api/uploads/pdf",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Upload failed")
      }

      setPdfUrl(data.url)

      alert("PDF uploaded successfully ✅")

    } catch (error) {
      console.error(error)
      alert(error.message || "PDF upload failed")
    } finally {
      setUploading(false)
    }
  }

  // ===============================
  // SUBMIT
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Title required")
      return
    }

    try {
      setLoading(true)

      const payload = {
        title,
        category,
        description,
        date,
        pdfUrl,
      }

      let url = `http://localhost:5001/api/${type}s`

      let method = "POST"

      if (editingId) {
        url = `http://localhost:5001/api/${type}s/${editingId}`
        method = "PUT"
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Operation failed")
      }

      alert(
        editingId
          ? "Updated successfully ✅"
          : "Published successfully ✅"
      )

      clearForm()

      await fetchData()

    } catch (error) {
      console.error(error)
      alert(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // EDIT
  // ===============================

  const handleEdit = (item) => {
    setEditingId(item._id)

    setTitle(item.title || "")
    setCategory(item.category || "")
    setDescription(item.description || "")
    setDate(
      item.date
        ? new Date(item.date).toISOString().split("T")[0]
        : ""
    )
    setPdfUrl(item.pdfUrl || "")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // ===============================
  // DELETE
  // ===============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this content?"
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(
        `http://localhost:5001/api/${type}s/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Delete failed")
      }

      alert("Deleted successfully 🗑️")

      await fetchData()

    } catch (error) {
      console.error(error)
      alert(error.message || "Delete failed")
    }
  }

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin-login")
  }

  // ===============================
  // PDF URL
  // ===============================

  const getPdfUrl = (url) => {
    if (!url) return ""

    if (url.startsWith("http")) {
      return url
    }

    return `http://localhost:5001${url}`
  }

  // ===============================
  // CURRENT DATA
  // ===============================

  let currentData = []

  if (type === "notice") {
    currentData = notices
  }

  if (type === "recruitment") {
    currentData = recruitments
  }

  if (type === "tender") {
    currentData = tenders
  }

  // ===============================
  // SEARCH
  // ===============================

  const filteredData = currentData.filter((item) => {
    const text = `
      ${item.title || ""}
      ${item.category || ""}
      ${item.description || ""}
    `.toLowerCase()

    return text.includes(search.toLowerCase())
  })

  // ===============================
  // UI
  // ===============================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}

      <header className="bg-red-700 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <p className="text-xs text-red-100 font-semibold uppercase tracking-widest">
                West Central Railway
              </p>

              <h1 className="text-2xl sm:text-3xl font-black">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-2">

              {/* VIEW WEBSITE */}

              <button
                onClick={() => navigate("/")}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2.5 rounded-lg text-sm font-bold transition"
              >
                🌐 View Website
              </button>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-lg text-sm font-bold transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">


        {/* ================= TOTAL CONTENT ================= */}

        <div className="bg-gray-900 text-white rounded-2xl p-5 shadow-sm mb-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-400">
                Total Published Content
              </p>

              <h3 className="text-4xl font-black mt-2">
                {totalContent}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Notices + Recruitment + Tenders
              </p>

            </div>

            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-3xl">
              📊
            </div>

          </div>

        </div>


        {/* ================= DASHBOARD STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">


          {/* NOTICES */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Total Notices
                </p>

                <h3 className="text-3xl font-black text-gray-800 mt-2">
                  {noticeCount}
                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center text-2xl">
                📢
              </div>

            </div>

          </div>


          {/* RECRUITMENTS */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Total Recruitment
                </p>

                <h3 className="text-3xl font-black text-gray-800 mt-2">
                  {recruitmentCount}
                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl">
                👨‍💼
              </div>

            </div>

          </div>


          {/* TENDERS */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Total Tenders
                </p>

                <h3 className="text-3xl font-black text-gray-800 mt-2">
                  {tenderCount}
                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-2xl">
                📄
              </div>

            </div>

          </div>

        </div>


        {/* ================= CONTENT TABS ================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => changeType("notice")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition ${
                type === "notice"
                  ? "bg-red-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📢 Notices
            </button>

            <button
              onClick={() => changeType("recruitment")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition ${
                type === "recruitment"
                  ? "bg-red-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              👨‍💼 Recruitment
            </button>

            <button
              onClick={() => changeType("tender")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition ${
                type === "tender"
                  ? "bg-red-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📄 Tenders
            </button>

          </div>

        </div>


        {/* ================= FORM ================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 mb-8">

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-xs uppercase tracking-widest font-bold text-red-700">
                Content Management
              </p>

              <h2 className="text-2xl font-black text-gray-800 mt-1">
                {editingId ? "Edit Content" : "Publish New Content"}
              </h2>

            </div>

            {editingId && (
              <button
                onClick={clearForm}
                className="text-sm font-bold text-gray-500 hover:text-red-700"
              >
                Cancel Edit
              </button>
            )}

          </div>


          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              {/* TITLE */}

              <div className="md:col-span-2">

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

              </div>


              {/* CATEGORY */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

              </div>


              {/* DATE */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

              </div>


              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

              </div>


              {/* PDF */}

              <div className="md:col-span-2">

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  PDF Document
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    uploadPdf(e.target.files[0])
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
                />

                {uploading && (
                  <p className="text-sm text-blue-600 font-semibold mt-2">
                    Uploading PDF...
                  </p>
                )}

                {pdfUrl && (
                  <div className="mt-3 flex items-center gap-3">

                    <span className="text-sm text-green-700 font-semibold">
                      PDF uploaded ✅
                    </span>

                    <a
                      href={getPdfUrl(pdfUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-red-700 font-bold hover:underline"
                    >
                      View PDF
                    </a>

                  </div>
                )}

              </div>

            </div>


            {/* FORM BUTTONS */}

            <div className="flex flex-wrap gap-3 mt-6">

              <button
                type="submit"
                disabled={loading || uploading}
                className="bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-bold transition"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Content"
                  : "Publish Content"}
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold transition"
              >
                Clear
              </button>

            </div>

          </form>

        </div>


        {/* ================= CONTENT LIBRARY ================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

            <div>

              <p className="text-xs uppercase tracking-widest font-bold text-red-700">
                Content Library
              </p>

              <h2 className="text-2xl font-black text-gray-800 mt-1">
                {type === "notice"
                  ? "Notices"
                  : type === "recruitment"
                  ? "Recruitments"
                  : "Tenders"}
              </h2>

            </div>


            {/* SEARCH */}

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content..."
              className="w-full sm:w-72 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />

          </div>


          {/* DATA */}

          {filteredData.length === 0 ? (

            <div className="text-center py-12">

              <div className="text-5xl mb-4">
                📭
              </div>

              <p className="text-gray-500 font-semibold">
                No content found
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredData.map((item) => (

                <div
                  key={item._id}
                  className="border border-gray-200 rounded-2xl p-4 hover:border-red-200 hover:shadow-sm transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">


                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-[10px] font-black uppercase bg-green-100 text-green-700 px-2 py-1 rounded-md">
                          Published
                        </span>

                        {item.category && (
                          <span className="text-[10px] font-black uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                            {item.category}
                          </span>
                        )}

                      </div>


                      <h3 className="text-lg font-bold text-gray-800 mt-2 break-words">
                        {item.title}
                      </h3>


                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}


                      {item.date && (
                        <p className="text-xs text-gray-400 mt-2">
                          📅{" "}
                          {new Date(item.date).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      )}

                    </div>


                    {/* ACTIONS */}

                    <div className="flex flex-wrap items-center gap-2">

                      {item.pdfUrl && (
                        <a
                          href={getPdfUrl(item.pdfUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold"
                        >
                          📄 PDF
                        </a>
                      )}

                      <button
                        onClick={() => handleEdit(item)}
                        className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-sm font-bold"
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default Admin