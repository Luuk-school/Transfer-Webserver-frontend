import { useNavigate } from 'react-router-dom'
import './Styles.css'

function Home() {
  const navigate = useNavigate()

  // Generate a random session ID
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  // Create a new session
  const createSession = () => {
    const newSessionId = generateSessionId()
    navigate(`/sessie/${newSessionId}`)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-8 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Sessie starten</h1>
        <p className="text-gray-300">Maak een nieuwe sessie om bestanden uit te wisselen</p>
        <button
          onClick={createSession}
          className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
        >
          Sessie creëren
        </button>
      </div>
    </div>
  )
}

export default Home
