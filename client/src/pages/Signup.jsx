import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import "../dashboardUI/styles/index.css"

export default function Signup() {
  const navigate = useNavigate()

  const { signUp } = useAuthStore()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")

      await signUp(
        form.email,
        form.password,
        form.name
      )

      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 py-8">
      <section
        className="w-full max-w-md rounded-2xl p-6 sm:p-7"
        style={{
          background: "var(--ss-surface)",
          border: "1px solid var(--ss-border)",
        }}
      >
        <h1 className="text-2xl font-bold mb-6">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-transparent border"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-transparent border"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-transparent border"
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg p-3 font-semibold"
            style={{
              background: "var(--ss-accent)",
              color: "var(--ss-bg)",
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-center">
          Already have an account?
          <Link to="/login">
            {" "}
            Sign In
          </Link>
        </p>
      </section>
    </main>
  )
}