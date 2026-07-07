import { useState, useEffect } from 'react'
import { YOUTUBE_URL } from '../utils/constants'
import './YoutubeShorts.css'

const CHANNEL_ID = 'UCSGbG3ruFJEb24RiDPJjCow'
const CHANNEL_HANDLE = '@veenakunwar8141'
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
// We use allorigins as a CORS proxy to fetch YouTube RSS
const PROXY = 'https://api.allorigins.win/raw?url='

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60)   return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff/86400)}d ago`
  if (diff < 31536000) return `${Math.floor(diff/2592000)}mo ago`
  return `${Math.floor(diff/31536000)}y ago`
}

function parseRSS(xmlText) {
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlText, 'application/xml')
  const entries = Array.from(xml.querySelectorAll('entry'))
  return entries.map(entry => {
    const videoId = entry.querySelector('videoId')?.textContent ||
                    entry.querySelector('id')?.textContent?.split(':').pop() || ''
    const title   = entry.querySelector('title')?.textContent || ''
    const published = entry.querySelector('published')?.textContent || ''
    const thumb   = entry.querySelector('thumbnail')?.getAttribute('url') ||
                    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    const views   = entry.querySelector('statistics')?.getAttribute('viewCount') || '0'
    return { videoId, title, published, thumb, views }
  }).filter(v => v.videoId)
}

export default function YoutubeShorts({ limit = 10, title = 'Recent Videos', compact = false }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [playing, setPlaying] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchVideos = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${PROXY}${encodeURIComponent(RSS_URL)}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        const parsed = parseRSS(text)
        setVideos(parsed.slice(0, limit))
      } catch (e) {
        if (e.name !== 'AbortError') setError('Could not load videos.')
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
    return () => controller.abort()
  }, [limit])

  return (
    <section className={`yt-shorts-section ${compact ? 'yt-compact' : ''}`} aria-label="YouTube Videos">
      <div className="yt-header">
        <div className="yt-header-left">
          <span className="yt-eyebrow">On YouTube</span>
          <h2 className="yt-title">{title}</h2>
        </div>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="yt-see-more"
          aria-label="View all videos on YouTube"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
          </svg>
          View All on YouTube
        </a>
      </div>

      {loading && (
        <div className="yt-loading">
          {Array.from({ length: Math.min(limit, 6) }).map((_, i) => (
            <div key={i} className="yt-skeleton">
              <div className="yt-skel-thumb" />
              <div className="yt-skel-line w80" />
              <div className="yt-skel-line w50" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="yt-error">
          <p>😔 Videos couldn't be loaded right now.</p>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="yt-channel-link">
            Visit our YouTube channel →
          </a>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <div className={`yt-grid ${compact ? 'yt-grid-compact' : ''}`}>
          {videos.map((v) => (
            <div key={v.videoId} className="yt-card" onClick={() => setPlaying(v.videoId)}>
              <div className="yt-thumb-wrap">
                {playing === v.videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="yt-iframe"
                  />
                ) : (
                  <>
                    <img
                      src={v.thumb || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
                      alt={v.title}
                      className="yt-thumb"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`
                      }}
                    />
                    <div className="yt-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                    <div className="yt-duration-badge">▶ Watch</div>
                  </>
                )}
              </div>
              <div className="yt-card-info">
                <p className="yt-card-title">{v.title}</p>
                <div className="yt-card-meta">
                  {v.views && parseInt(v.views) > 0 && (
                    <span>{parseInt(v.views).toLocaleString('en-IN')} views</span>
                  )}
                  {v.published && <span>{timeAgo(v.published)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <div className="yt-footer-link">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="yt-more-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
            </svg>
            More Videos on YouTube — {CHANNEL_HANDLE}
          </a>
        </div>
      )}
    </section>
  )
}
