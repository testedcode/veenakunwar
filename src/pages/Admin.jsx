import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCollection, useStorage } from '../hooks/useFirebase'
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import Card from '../components/Card'
import Loader from '../components/Loader'
import Button from '../components/Button'
import './Admin.css'

function Admin() {
  const { currentUser, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('sessions')

  const { data: sessions, add: addSession, update: updateSession, remove: removeSession } = useCollection('sessions')
  const { data: products, add: addProduct, update: updateProduct, remove: removeProduct } = useCollection('products')
  const { data: testimonials, add: addTestimonial, update: updateTestimonial, remove: removeTestimonial } = useCollection('testimonials')
  const { urls: galleryUrls, loading: galleryLoading, uploadFile } = useStorage('gallery')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    
    try {
      console.log('Attempting login with:', trimmedEmail)
      const result = await login(trimmedEmail, trimmedPassword)
      console.log('Login successful:', result.user)
      // Login successful - component will re-render with currentUser
    } catch (err) {
      console.error('Login error details:', {
        code: err.code,
        message: err.message,
        email: trimmedEmail,
        fullError: err
      })
      
      // Show more specific error messages
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials. Make sure Email/Password auth is enabled in Firebase.')
      } else if (err.code === 'auth/user-not-found') {
        setError('User not found. Please check your email address or create the user in Firebase Console.')
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again or reset password in Firebase Console.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format. Please check your email.')
      } else if (err.code === 'auth/user-disabled') {
        setError('This account has been disabled. Contact support.')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.')
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled. Please enable it in Firebase Console → Authentication → Sign-in method.')
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.')
      } else {
        setError(`Login failed: ${err.message || err.code || 'Unknown error'}. Check browser console (F12) for details.`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="admin-login">
        <Card className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1>Admin Panel</h1>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          <div className="admin-tabs">
            <button
              className={activeTab === 'sessions' ? 'active' : ''}
              onClick={() => setActiveTab('sessions')}
            >
              Sessions
            </button>
            <button
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              className={activeTab === 'testimonials' ? 'active' : ''}
              onClick={() => setActiveTab('testimonials')}
            >
              Testimonials
            </button>
            <button
              className={activeTab === 'gallery' ? 'active' : ''}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
          </div>

          <div className="admin-panel-content">
            {activeTab === 'sessions' && (
              <SessionsPanel
                sessions={sessions}
                onAdd={addSession}
                onUpdate={updateSession}
                onDelete={removeSession}
              />
            )}
            {activeTab === 'products' && (
              <ProductsPanel
                products={products}
                onAdd={addProduct}
                onUpdate={updateProduct}
                onDelete={removeProduct}
              />
            )}
            {activeTab === 'testimonials' && (
              <TestimonialsPanel
                testimonials={testimonials}
                onAdd={addTestimonial}
                onUpdate={updateTestimonial}
                onDelete={removeTestimonial}
              />
            )}
            {activeTab === 'gallery' && (
              <GalleryPanel uploadFile={uploadFile} urls={galleryUrls} loading={galleryLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SessionsPanel({ sessions, onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    day: '',
    time: '',
    zoomLink: '',
    description: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing) {
      await onUpdate(editing.id, formData)
      setEditing(null)
    } else {
      await onAdd(formData)
    }
    setFormData({ title: '', day: '', time: '', zoomLink: '', description: '' })
  }

  const handleEdit = (session) => {
    setEditing(session)
    setFormData({
      title: session.title || '',
      day: session.day || '',
      time: session.time || '',
      zoomLink: session.zoomLink || '',
      description: session.description || ''
    })
  }

  return (
    <div className="admin-panel">
      <h2>Manage Sessions</h2>
      <Card className="admin-form-card">
        <h3>{editing ? 'Edit Session' : 'Add New Session'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Day</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                placeholder="e.g., 9:00 AM"
              />
            </div>
            <div className="form-group">
              <label>Zoom Link</label>
              <input
                type="url"
                value={formData.zoomLink}
                onChange={(e) => setFormData({ ...formData, zoomLink: e.target.value })}
                placeholder="https://zoom.us/j/..."
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            ></textarea>
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary">
              {editing ? 'Update' : 'Add'} Session
            </Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={() => {
                setEditing(null)
                setFormData({ title: '', day: '', time: '', zoomLink: '', description: '' })
              }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="admin-list">
        <h3>Existing Sessions</h3>
        {sessions.length > 0 ? (
          <div className="list-items">
            {sessions.map((session) => (
              <Card key={session.id} className="list-item">
                <div className="item-content">
                  <h4>{session.title || 'Untitled Session'}</h4>
                  <p><strong>Day:</strong> {session.day}</p>
                  <p><strong>Time:</strong> {session.time}</p>
                  {session.description && <p>{session.description}</p>}
                </div>
                <div className="item-actions">
                  <Button variant="secondary" onClick={() => handleEdit(session)}>
                    Edit
                  </Button>
                  <Button variant="secondary" onClick={() => onDelete(session.id)}>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>No sessions yet. Add your first session above.</p>
        )}
      </div>
    </div>
  )
}

function ProductsPanel({ products, onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageURL: '',
    qrURL: '',
    whatsappMessage: ''
  })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large. Maximum size is 10MB.')
      e.target.value = '' // Reset input
      return
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      e.target.value = '' // Reset input
      return
    }
    
    setUploading(true)
    const imageType = type === 'qr' ? 'QR Code' : 'Product Image'
    
    try {
      console.log(`Uploading ${imageType}:`, file.name)
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const folder = type === 'qr' ? 'qr' : 'product-images'
      const fileRef = ref(storage, `${folder}/${fileName}`)
      
      console.log('Uploading to:', `${folder}/${fileName}`)
      await uploadBytes(fileRef, file)
      console.log('Upload complete, getting URL...')
      
      const url = await getDownloadURL(fileRef)
      console.log('Got URL:', url)
      
      setFormData({ ...formData, [type === 'qr' ? 'qrURL' : 'imageURL']: url })
      alert(`✅ ${imageType} uploaded successfully!`)
    } catch (err) {
      console.error('Upload error details:', {
        code: err.code,
        message: err.message,
        fullError: err
      })
      const errorMsg = err.message || err.code || 'Unknown error'
      alert(`Upload failed: ${errorMsg}\n\nCheck browser console (F12) for details.`)
      e.target.value = '' // Reset input on error
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    }
    if (editing) {
      await onUpdate(editing.id, productData)
      setEditing(null)
    } else {
      await onAdd(productData)
    }
    setFormData({ name: '', price: '', description: '', imageURL: '', qrURL: '', whatsappMessage: '' })
  }

  const handleEdit = (product) => {
    setEditing(product)
    setFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      description: product.description || '',
      imageURL: product.imageURL || '',
      qrURL: product.qrURL || '',
      whatsappMessage: product.whatsappMessage || ''
    })
  }

  return (
    <div className="admin-panel">
      <h2>Manage Products</h2>
      <Card className="admin-form-card">
        <h3>{editing ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'image')}
                disabled={uploading}
              />
              {formData.imageURL && (
                <img src={formData.imageURL} alt="Preview" className="image-preview" />
              )}
            </div>
            <div className="form-group">
              <label>QR Code</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'qr')}
                disabled={uploading}
              />
              {formData.qrURL && (
                <img src={formData.qrURL} alt="QR Preview" className="image-preview" />
              )}
            </div>
          </div>
          <div className="form-group">
            <label>WhatsApp Message (optional)</label>
            <textarea
              value={formData.whatsappMessage}
              onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })}
              rows="2"
              placeholder="Custom message for WhatsApp orders"
            ></textarea>
          </div>
          {uploading && (
            <p style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>
              Uploading image... Please wait.
            </p>
          )}
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={uploading}>
              {editing ? 'Update' : 'Add'} Product
            </Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={() => {
                setEditing(null)
                setFormData({ name: '', price: '', description: '', imageURL: '', qrURL: '', whatsappMessage: '' })
              }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="admin-list">
        <h3>Existing Products</h3>
        {products.length > 0 ? (
          <div className="list-items">
            {products.map((product) => (
              <Card key={product.id} className="list-item">
                <div className="item-content">
                  {product.imageURL && (
                    <img src={product.imageURL} alt={product.name} className="item-image" />
                  )}
                  <div>
                    <h4>{product.name}</h4>
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    {product.description && <p>{product.description}</p>}
                  </div>
                </div>
                <div className="item-actions">
                  <Button variant="secondary" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                  <Button variant="secondary" onClick={() => onDelete(product.id)}>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>No products yet. Add your first product above.</p>
        )}
      </div>
    </div>
  )
}

function TestimonialsPanel({ testimonials, onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    text: '',
    author: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing) {
      await onUpdate(editing.id, formData)
      setEditing(null)
    } else {
      await onAdd(formData)
    }
    setFormData({ text: '', author: '' })
  }

  const handleEdit = (testimonial) => {
    setEditing(testimonial)
    setFormData({
      text: testimonial.text || '',
      author: testimonial.author || ''
    })
  }

  return (
    <div className="admin-panel">
      <h2>Manage Testimonials</h2>
      <Card className="admin-form-card">
        <h3>{editing ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Testimonial Text</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Author Name</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary">
              {editing ? 'Update' : 'Add'} Testimonial
            </Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={() => {
                setEditing(null)
                setFormData({ text: '', author: '' })
              }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="admin-list">
        <h3>Existing Testimonials</h3>
        {testimonials.length > 0 ? (
          <div className="list-items">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="list-item">
                <div className="item-content">
                  <p>"{testimonial.text}"</p>
                  <p><strong>— {testimonial.author}</strong></p>
                </div>
                <div className="item-actions">
                  <Button variant="secondary" onClick={() => handleEdit(testimonial)}>
                    Edit
                  </Button>
                  <Button variant="secondary" onClick={() => onDelete(testimonial.id)}>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>No testimonials yet. Add your first testimonial above.</p>
        )}
      </div>
    </div>
  )
}

function GalleryPanel({ uploadFile, urls: galleryUrls, loading: galleryLoading }) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [uploadedCount, setUploadedCount] = useState(0)

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    setUploading(true)
    setUploadProgress(`Starting upload of ${files.length} image(s)...`)
    setUploadedCount(0)
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setUploadProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}...`)
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 10MB.`)
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image.`)
        }
        
        const fileName = `${Date.now()}_${i}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        console.log(`Uploading file ${i + 1}/${files.length}:`, fileName)
        
        await uploadFile(file, fileName)
        setUploadedCount(i + 1)
        console.log(`Successfully uploaded: ${fileName}`)
      }
      
      setUploadProgress(`Successfully uploaded ${files.length} image(s)!`)
      alert(`✅ Successfully uploaded ${files.length} image(s)! Refreshing page...`)
      e.target.value = '' // Reset input
      
      // Reload page after 2 seconds to show new images
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      console.error('Upload error details:', err)
      const errorMessage = err.message || err.code || 'Unknown error occurred'
      setUploadProgress(`❌ Upload failed: ${errorMessage}`)
      alert(`Upload failed: ${errorMessage}\n\nCheck browser console (F12) for details.`)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(''), 5000)
    }
  }

  const handleDelete = async (imageName) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const imageRef = ref(storage, `gallery/${imageName}`)
        await deleteObject(imageRef)
        alert('Image deleted successfully!')
        window.location.reload()
      } catch (err) {
        console.error('Delete error:', err)
        alert('Failed to delete image. Please try again.')
      }
    }
  }

  return (
    <div className="admin-panel">
      <h2>Manage Gallery</h2>
      <Card className="admin-form-card">
        <h3>Upload Gallery Images</h3>
        <div className="form-group">
          <label>Select Images (You can select multiple)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
          />
          {uploading && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>
                {uploadProgress || 'Uploading images... Please wait.'}
              </p>
              {uploadedCount > 0 && (
                <p style={{ color: 'var(--primary-green)', fontSize: '0.9rem' }}>
                  Progress: {uploadedCount} image(s) uploaded
                </p>
              )}
            </div>
          )}
        </div>
        <p className="upload-note">
          You can select multiple images at once. Images will be uploaded to Firebase Storage in the <code>gallery/</code> folder.
        </p>
      </Card>

      <div className="admin-list" style={{ marginTop: '2rem' }}>
        <h3>Gallery Images ({galleryUrls.length})</h3>
        {galleryLoading ? (
          <p>Loading gallery...</p>
        ) : galleryUrls.length > 0 ? (
          <div className="gallery-grid-admin">
            {galleryUrls.map((item, index) => (
              <Card key={index} className="gallery-item-admin">
                <img src={item.url} alt={`Gallery ${index + 1}`} />
                <div className="gallery-item-actions">
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(item.name)}
                    style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>No images in gallery yet. Upload images above.</p>
        )}
      </div>
    </div>
  )
}

export default Admin

