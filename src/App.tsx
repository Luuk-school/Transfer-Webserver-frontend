import { useState } from 'react'
import './Styles.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Tailwind Test</h1>

      <div className="bg-red-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <p className="mb-4 text-gray-300">Als je dit ziet, werkt Tailwind! dit is je eis voor de MVP.</p>
        <button
          className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
          onClick={() => setCount(count + 1)}
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
