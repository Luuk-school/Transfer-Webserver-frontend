import { useState } from 'react'
import './Styles.css'
import LoginModal from './loginmodal'

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const closeAll = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(false)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 p-4 z-50">
      <div className="text-white text-2xl font-bold flex justify-between items-center">
        <span>Bjorn can transfer</span>
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
            Sign up
          </button>
        </div>
      </div>

      <LoginModal 
        isLoginOpen={isLoginOpen} 
        isSignupOpen={isSignupOpen} 
        onClose={closeAll}
      />
    </div>
  )
}

export default Header
