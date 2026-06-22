import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"

export default function Login() {
  const navigate = useNavigate()

  const { signIn } = useAuthStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")

      await signIn(email, password)

      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <section className="w-full max-w-md p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6">
          Sign In
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg border bg-transparent"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-lg border bg-transparent"
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg font-semibold"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center">
          New here?
          <Link to="/signup">
            {" "}
            Create Account
          </Link>
        </p>
      </section>
    </main>
  )
}