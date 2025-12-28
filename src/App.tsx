import { useState, useEffect } from 'react'
import AdminPanel from './components/AdminPanel'
import PublicView from './components/PublicView'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public')

  // Detectar si está en la ruta /admin
  useEffect(() => {
    const path = window.location.pathname
    if (path.includes('/admin')) {
      setCurrentView('admin')
    } else {
      setCurrentView('public')
    }

    // Listener para cambios en la URL
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentView(path.includes('/admin') ? 'admin' : 'public')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (view: 'public' | 'admin') => {
    const path = view === 'admin' ? '/admin' : '/'
    window.history.pushState({}, '', path)
    setCurrentView(view)
  }

  return (
    <>
      {/* Renderizar vista correspondiente */}
      {currentView === 'admin' ? <AdminPanel /> : <PublicView />}
    </>
  )
}

export default App
