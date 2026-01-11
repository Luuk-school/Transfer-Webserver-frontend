import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Styles.css'
import LoginModal from './loginmodal'

function startpage() {
  const navigate = useNavigate()
  

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const closeAll = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(false)
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Transfer Website</h1>
      <p className="text-lg mb-8">Perfect to exchange files securely and efficiently.</p>
      <div className="space-x-4 ">
        <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400" onClick={() => setIsSignupOpen(true)}>
          Get Started
        </button>
        <button className="px-6 py-3 bg-gray-500 text-black font-bold rounded hover:bg-gray-400" onClick={() => navigate('/About')}>
          About us
        </button>
      </div>

        <LoginModal 
          isLoginOpen={isLoginOpen} 
          isSignupOpen={isSignupOpen} 
          onClose={closeAll}
      />
    </div>
  )
}

export default startpage
