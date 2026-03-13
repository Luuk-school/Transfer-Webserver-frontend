import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Styles.css'

function Room() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const [users, setUsers] = useState<string[]>([])
  const [username, setUsername] = useState('')
  const [copied, setCopied] = useState(false)

  // Join session (add user to session)
  const joinSession = () => {
    if (!username.trim()) {
      alert('Voer een gebruikersnaam in')
      return
    }
    // Add user to session (in a real app, this would sync with backend)
    setUsers([...users, username])
    setUsername('')
  }

  // Generate shareable link
  const generateLink = () => {
    return `${window.location.origin}/sessie/${sessionId}`
  }

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(generateLink())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-8 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Sessie actief</h1>
          <p className="text-gray-300 text-sm">Sessie ID: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{sessionId}</span></p>
        </div>

        {/* Shareable Link */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <h2 className="font-semibold text-yellow-400">Delen link</h2>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={generateLink()}
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm"
            />
            <button
              onClick={copyLink}
              className={`px-4 py-2 font-semibold rounded transition ${
                copied
                  ? 'bg-green-500 text-black'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {copied ? 'Gekopieerd!' : 'Kopieer'}
            </button>
          </div>
        </div>

        {/* Add User */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <h2 className="font-semibold text-yellow-400">Gebruiker toevoegen</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Gebruikersnaam"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && joinSession()}
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
            />
            <button
              onClick={joinSession}
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
            >
              Toevoegen
            </button>
          </div>
        </div>

        {/* Connected Users */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <h2 className="font-semibold text-yellow-400">Verbonden gebruikers ({users.length})</h2>
          <div className="space-y-2">
            {users.length === 0 ? (
              <p className="text-gray-400 text-sm">Geen gebruikers verbonden</p>
            ) : (
              <ul className="space-y-1">
                {users.map((user, idx) => (
                  <li key={idx} className="text-sm bg-gray-700 px-3 py-2 rounded flex justify-between items-center">
                    <span>{user}</span>
                    <button
                      onClick={() => setUsers(users.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Verwijderen
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Exit Session */}
        <button
          onClick={() => {
            setUsers([])
            navigate('/home')
          }}
          className="w-full px-4 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600"
        >
          Sessie sluiten
        </button>
      </div>
    </div>
  )
}

export default Room
