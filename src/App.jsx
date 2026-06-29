import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Sessions from './pages/Sessions'
import Shop from './pages/Shop'
import Gallery from './pages/Gallery'
import Social from './pages/Social'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Offers from './pages/Offers'
import Faq from './pages/Faq'
import { AuthProvider } from './contexts/AuthContext'
import CartDrawer from './components/CartDrawer'

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/social" element={<Social />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App
