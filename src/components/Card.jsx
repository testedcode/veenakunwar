import './Card.css'

function Card({ children, className = '', onClick }) {
  return (
    <div className={`glossy-card ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card

