import './Button.css'

function Button({ children, variant = 'primary', className = '', onClick, ...props }) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

