import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import BottomNav from './BottomNav'

function Layout({ children }) {
  return (
    <div className="app">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <BottomNav />
    </div>
  )
}

export default Layout

