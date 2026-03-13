import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginModalProps {
  isLoginOpen: boolean
  isSignupOpen: boolean
  onClose: () => void
}

function LoginModal({ isLoginOpen, isSignupOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate()
  const [loginName, setLoginName] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupPass, setSignupPass] = useState('')
  const [signupPass2, setSignupPass2] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const apiPost = async (path: string, body: unknown, redirectOnSuccess?: string) => {
    setBusy(true)
    setStatus('')
    try {
      const res = await fetch(`/api${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const text = await res.text()
      if (!res.ok) {
        setStatus(`Fout (${res.status}): ${text || 'request mislukt'}`)
      } else {
        setStatus(text || 'Succes')
        if (redirectOnSuccess) {
          navigate(redirectOnSuccess)
        } else {
          onClose()
        }
      }
    } catch (err) {
      setStatus('Netwerkfout: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  if (!isLoginOpen && !isSignupOpen) {
    return null
  }

  return (
    <>
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-gray-900">
            <button
              type="button"
              aria-label="Sluiten"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 text-3xl"
              onClick={onClose}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 pr-6">Login</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                // Tijdelijke bypass voor test account
                if (loginName === 'test' && loginPass === 'test') { //
                  setStatus('Tijdelijk ingelogd als test gebruiker') //
                  navigate('/home') //
                  return //
                }//Tijdelijk code
                apiPost('/auth/login', { username: loginName, password: loginPass }, '/home')
              }}
            >
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="Username">
                  Username
                </label>
                <input
                  id="Username"
                  type="text"
                  placeholder="Username"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="submit"
                  disabled={busy}
                  className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 disabled:opacity-60"
                >
                  {busy ? 'Bezig...' : 'Login'}
                </button>
              </div>
              {status && <p className="text-sm text-gray-700">{status}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-lg text-gray-900">
            <button
              type="button"
              aria-label="Sluiten"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 text-3xl"
              onClick={onClose}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 pr-6">Sign up</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                apiPost('/auth/signup', {
                  username: signupName,
                  password: signupPass,
                  passwordConfirm: signupPass2,
                })
              }}
            >
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="signup-Username">
                  Username
                </label>
                <input
                  id="signup-Username"
                  type="text"
                  placeholder="Username"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="signup-password">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Password"
                  value={signupPass}
                  onChange={(e) => setSignupPass(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="signup-password-confirm">
                  Repeat Password
                </label>
                <input
                  id="signup-password-confirm"
                  type="password"
                  placeholder="Repeat Password"
                  value={signupPass2}
                  onChange={(e) => setSignupPass2(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={busy}
                  className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 disabled:opacity-60"
                >
                  {busy ? 'Bezig...' : 'sign up'}
                </button>
              </div>
              {status && <p className="text-sm text-gray-700">{status}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginModal
