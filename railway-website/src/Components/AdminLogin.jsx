import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLogin() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()
    setLoading(true)

    try {

      const response = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Login failed")
        return
      }

      localStorage.setItem(
        "adminToken",
        data.token
      )

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      )

      navigate("/admin")

    } catch (error) {

      console.error(error)

      alert(
        "Backend se connection nahi ho raha ❌"
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            🚆
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Railway Admin
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Login to manage website
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 outline-none focus:border-red-600"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 outline-none focus:border-red-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Login 🔐"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default AdminLogin