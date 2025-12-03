import { openWhatsApp } from '../utils/whatsapp'
import './WhatsAppButton.css'

function WhatsAppButton() {
  const handleClick = () => {
    openWhatsApp('Hello! I would like to know more about Hasya Yoga sessions.')
  }

  return (
    <button className="whatsapp-button" onClick={handleClick} aria-label="Contact via WhatsApp">
      <span className="whatsapp-icon">💬</span>
    </button>
  )
}

export default WhatsAppButton

