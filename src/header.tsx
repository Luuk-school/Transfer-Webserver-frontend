import { useState } from 'react'
import './Styles.css'

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
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
          window.location.href = redirectOnSuccess
        } else {
          closeAll()
        }
      }
    } catch (err) {
      setStatus('Netwerkfout: kan backend niet bereiken op poort 5000')
    } finally {
      setBusy(false)
    }
  }

  const closeAll = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(false)
    setStatus('')
  }

  return (
    <div className="bg-gray-900 p-4">
      <div className="text-white text-2xl font-bold flex justify-between items-center">
        <span>Transfer website</span>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
            onClick={() => {
              setIsSignupOpen(false)
              setIsLoginOpen(true)
            }}
          >
            Login
          </button>
          <button
            className="px-4 py-2 border border-yellow-400 text-yellow-50 font-bold rounded hover:bg-yellow-400 hover:text-black"
            onClick={() => {
              setIsLoginOpen(false)
              setIsSignupOpen(true)
            }}
          >
            Registreren
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <button
              type="button"
              aria-label="Sluiten"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={closeAll}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 pr-6">Login</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                apiPost('/login', { username: loginName, password: loginPass }, '/home')
              }}
            >
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="gebruikersnaam">
                  Gebruikersnaam
                </label>
                <input
                  id="gebruikersnaam"
                  type="text"
                  placeholder="Gebruikernaam"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                  Wachtwoord
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Wachtwoord"
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
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
            <button
              type="button"
              aria-label="Sluiten"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={closeAll}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 pr-6">Registreren</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                apiPost('/signup', {
                  username: signupName,
                  password: signupPass,
                  passwordConfirm: signupPass2,
                })
              }}
            >
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="signup-gebruikersnaam">
                  Gebruikersnaam
                </label>
                <input
                  id="signup-gebruikersnaam"
                  type="text"
                  placeholder="Gebruikersnaam"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="signup-password">
                  Wachtwoord
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Wachtwoord"
                  value={signupPass}
                  onChange={(e) => setSignupPass(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700" htmlFor="signup-password-confirm">
                  Bevestig wachtwoord
                </label>
                <input
                  id="signup-password-confirm"
                  type="password"
                  placeholder="Herhaal wachtwoord"
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
                  {busy ? 'Bezig...' : 'Registreren'}
                </button>
              </div>
              {status && <p className="text-sm text-gray-700">{status}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
