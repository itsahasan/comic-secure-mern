import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiFetch } from "../utils/api"

export default function Header() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // 🔍 Check login
  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((data) => setUser(data))
      .catch(() => setUser(null))
  }, [])

  // 🔴 LOGOUT
  const handleLogout = async () => {
    await apiFetch("/api/auth/signout", {
      method: "POST",
    })

    setUser(null)
    navigate("/sign-in")
  }

  return (
    <header className='bg-white shadow'>
      <div className='mx-auto flex max-w-5xl items-center justify-between p-4'>
        <Link to='/' className='text-lg font-bold'>
          Secure Comics
        </Link>

        <nav>
          <ul className='flex gap-4 text-sm'>
            <li>
              <Link to='/'>Home</Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link to='/sign-in'>Sign In</Link>
                </li>
                <li>
                  <Link to='/sign-up'>Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
