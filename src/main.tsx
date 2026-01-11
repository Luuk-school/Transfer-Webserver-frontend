import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Startpage from './Startpage.tsx'
import Header from './header.tsx'
import Home from './Home.tsx'
import NotFound from './NotFound.tsx'
import About from './about.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header /><Startpage /></>} />
        <Route path="/home" element={<Home />} />
        <Route path="/sessie/:sessionId" element={<Home />} />
        <Route path="/about" element={<><Header /><About /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
