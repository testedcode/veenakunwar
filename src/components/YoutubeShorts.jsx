import { useState, useEffect, useRef } from 'react'
import { YOUTUBE_URL } from '../utils/constants'
import './YoutubeShorts.css'

const CHANNEL_ID     = 'UCSGbG3ruFJEb24RiDPJjCow'
const CHANNEL_HANDLE = '@veenakunwar8141'
const CHANNEL_NAME   = 'Veena Kunwar'
const RSS_URL        = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const PROXY          = 'https://api.allorigins.win/raw?url='

/* ── helpers ── */
function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60)      return `${diff}s ago`
  if (diff < 3600)    return `${Math.floor(diff/60)}m ago`
  if (diff < 86400)   return `${Math.floor(diff/3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff/86400)}d ago`
  if (diff < 31536000) return `${Math.floor(diff/2592000)}mo ago`
  return `${Math.floor(diff/31536000)}y ago`
}

function fmtViews(n) {
  const v = parseInt(n) || 0
  if (v >= 1000000) return `${(v/1000000).toFixed(1)}M`
  if (v >= 1000)    return `${(v/1000).toFixed(1)}K`
  return v.toString()
}

function parseRSS(xmlText) {
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlText, 'application/xml')
  return Array.from(xml.querySelectorAll('entry')).map(entry => {
    const videoId   = entry.querySelector('videoId')?.textContent ||
                      entry.querySelector('id')?.textContent?.split(':').pop() || ''
    const title     = entry.querySelector('title')?.textContent || ''
    const published = entry.querySelector('published')?.textContent || ''
    // Use hqdefault as fallback for shorts usually
    const thumb     = entry.querySelector('thumbnail')?.getAttribute('url') ||
                      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    const views     = entry.querySelector('statistics')?.getAttribute('viewCount') || '0'
    return { videoId, title, published, thumb, views }
  }).filter(v => v.videoId)
}

/* ── YouTube SVG icon ── */
const YTIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)

/* ── Skeleton card ── */
function Skeleton() {
  return (
    <div className="yt-short-card skeleton">
      <div className="yt-skel-bg"></div>
    </div>
  )
}

/* ── Promo Banner ── */
function PromoBanner() {
  return (
    <div className="yt-promo-banner">
      <div className="yt-promo-inner">
        <div className="yt-promo-logo-wrap">
          <img src="/logo.png" alt="Veena Kunwar" className="yt-promo-logo" />
          <div className="yt-promo-pulse" />
        </div>
        <div className="yt-promo-text">
          <h3>{CHANNEL_NAME}</h3>
          <p>Hasya Yoga · Heritage Recipes · Wellness Tips</p>
        </div>
        <div className="yt-promo-actions">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="yt-sub-btn">
            <YTIcon size={18} />
            Subscribe
          </a>
          <a
            href={`https://www.youtube.com/@${CHANNEL_HANDLE.replace('@', '')}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="yt-like-btn"
            aria-label="Like our videos"
          >
            👍 Like
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Watch Veena Kunwar on YouTube 🧘‍♀️ ${YOUTUBE_URL}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="yt-share-btn"
            aria-label="Share on WhatsApp"
          >
            📤 Share
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function YoutubeShorts({ limit = 10, title = 'Recent Shorts' }) {
  const [videos,  setVideos]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [playingId, setPlayingId] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        const res  = await fetch(`${PROXY}${encodeURIComponent(RSS_URL)}`, { signal: controller.signal })
        if (!res.ok) throw new Error()
        const text = await res.text()
        setVideos(parseRSS(text).slice(0, limit))
      } catch(e) {
        if (e.name !== 'AbortError') setError(true)
      } finally { setLoading(false) }
    })()
    return () => controller.abort()
  }, [limit])

  /* arrow scroll for carousel */
  const scroll = (dir) => {
    if (!scrollRef.current) return
    // Scroll by roughly 2 cards width
    scrollRef.current.scrollBy({ left: dir * 500, behavior: 'smooth' })
  }

  return (
    <section className="yt-section" aria-label="YouTube Shorts from Veena Kunwar">

      {/* ── Header ── */}
      <div className="yt-header">
        <div className="yt-header-left">
          <span className="yt-eyebrow">
            <YTIcon size={14} />
            On YouTube Shorts
          </span>
          <h2 className="yt-title">{title}</h2>
        </div>
        <div className="yt-header-actions">
          <button className="yt-arrow" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
          <button className="yt-arrow" onClick={() => scroll(1)}  aria-label="Next">›</button>
        </div>
      </div>

      {/* ── Promo banner ── */}
      <PromoBanner />

      {/* ── Shorts Carousel ── */}
      <div className="yt-shorts-carousel" ref={scrollRef}>
        {loading && (
           <>
             {[...Array(6)].map((_, i) => <Skeleton key={i} />)}
           </>
        )}

        {error && (
          <div className="yt-error-state">
            <span>😔</span>
            <p>Couldn't load shorts. <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Visit our YouTube channel →</a></p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && videos.map((v) => (
          <div key={v.videoId} className="yt-short-card">
            {playingId === v.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={v.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="yt-short-iframe"
              />
            ) : (
              <div className="yt-short-thumb-wrap" onClick={() => setPlayingId(v.videoId)}>
                {/* Fallback to high res thumbnail if maxres fails */}
                <img
                  src={`https://i.ytimg.com/vi/${v.videoId}/maxresdefault.jpg`}
                  alt={v.title}
                  className="yt-short-thumb"
                  onError={e => { e.target.src = `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg` }}
                  loading="lazy"
                />
                
                {/* Gradient overlay for readability */}
                <div className="yt-short-overlay">
                   <div className="yt-short-play-btn">
                     <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
                       <polygon points="5 3 19 12 5 21 5 3"/>
                     </svg>
                   </div>
                   
                   <div className="yt-short-info">
                     <h3 className="yt-short-title">{v.title}</h3>
                     <div className="yt-short-meta">
                       {parseInt(v.views) > 0 && <span>👁 {fmtViews(v.views)}</span>}
                       {v.published && <span>{timeAgo(v.published)}</span>}
                     </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      {!loading && !error && (
        <div className="yt-cta-strip">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="yt-cta-btn">
            <YTIcon size={18} />
            View all Shorts — {CHANNEL_HANDLE}
          </a>
        </div>
      )}
    </section>
  )
}
