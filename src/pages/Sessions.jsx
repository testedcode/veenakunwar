import { useCollection } from '../hooks/useFirebase'
import Card from '../components/Card'
import Loader from '../components/Loader'
import Button from '../components/Button'
import './Sessions.css'

function Sessions() {
  const { data: sessions, loading } = useCollection('sessions')

  const handleJoinZoom = (zoomLink) => {
    if (zoomLink) {
      window.open(zoomLink, '_blank')
    } else {
      alert('Zoom link not available. Please contact us for session details.')
    }
  }

  const groupSessionsByDay = (sessions) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const grouped = {}
    
    days.forEach(day => {
      grouped[day] = sessions.filter(session => 
        session.day && session.day.toLowerCase() === day.toLowerCase()
      )
    })
    
    return grouped
  }

  const groupedSessions = sessions ? groupSessionsByDay(sessions) : {}

  return (
    <div className="sessions">
      <section className="sessions-hero">
        <div className="container">
          <h1>Yoga Sessions & Schedule</h1>
          <p className="hero-subtitle">Join us for transformative Hasya Yoga sessions</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : sessions.length > 0 ? (
            <>
              <h2 className="section-title">Weekly Schedule</h2>
              <div className="sessions-calendar">
                {Object.entries(groupedSessions).map(([day, daySessions]) => (
                  daySessions.length > 0 && (
                    <div key={day} className="day-section">
                      <h3 className="day-title">{day}</h3>
                      <div className="sessions-grid">
                        {daySessions.map((session) => (
                          <Card key={session.id} className="session-card">
                            <div className="session-header">
                              <h4>{session.title || 'Hasya Yoga Session'}</h4>
                              <span className="session-time">{session.time || 'TBA'}</span>
                            </div>
                            {session.description && (
                              <p className="session-description">{session.description}</p>
                            )}
                            <div className="session-actions">
                              <Button
                                variant="primary"
                                onClick={() => handleJoinZoom(session.zoomLink)}
                              >
                                Join Zoom Session
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </>
          ) : (
            <div className="no-sessions">
              <p>No sessions scheduled at the moment. Please check back soon!</p>
              <p className="contact-note">For more information, please contact us via WhatsApp or email.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section info-section">
        <div className="container">
          <div className="info-card glossy-card">
            <h3>How to Join</h3>
            <ol>
              <li>Check the schedule above for available sessions</li>
              <li>Click "Join Zoom Session" button at the scheduled time</li>
              <li>Make sure you have Zoom installed or use the web version</li>
              <li>Come with an open mind and ready to laugh!</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sessions

