import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from '@/pages/Login.tsx'
import AuthProvider from '@/Auth.tsx'
import Home from '@/pages/Home.tsx'
import Calendary from '@/pages/Calendary.tsx'
import Relatory from '@/pages/Relatory.tsx'
import Notification from '@/pages/Notification.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>

          <Route path='/' element={<App children={<Home />} />} />
          <Route path='/agenda' element={<App children={<Calendary />} />} />
          <Route path='/login' element={<Login />} />
          <Route path="/relatorio" element={<App children={<Relatory />} />} />
          <Route path="/notificacao" element={<App children={<Notification />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
