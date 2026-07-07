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
    <div className="yt-skeleton">
      <div className="yt-skel-thumb" />
      <div className="yt-skel-body">
        <div className="yt-skel-line w90" />
        <div className="yt-skel-line w60" />
        <div className="yt-skel-line w40" />
      </div>
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
export default function YoutubeShorts({ limit = 10, title = 'Recent Videos' }) {
  const [videos,  setVideos]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [active,  setActive]  = useState(0)   // featured video index
  const [playing, setPlaying] = useState(false)
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

  const featuredVideo = videos[active] || null

  /* arrow scroll for mobile carousel */
  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 260, behavior: 'smooth' })
  }

  /* jump to a video in the carousel */
  const selectVideo = (idx) => {
    setActive(idx)
    setPlaying(false)
    // scroll the row item into view
    const row = scrollRef.current
    if (row) {
      const card = row.children[idx]
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  return (
    <section className="yt-section" aria-label="YouTube Videos from Veena Kunwar">

      {/* ── Header ── */}
      <div className="yt-header">
        <div className="yt-header-left">
          <span className="yt-eyebrow">
            <YTIcon size={14} />
            On YouTube
          </span>
          <h2 className="yt-title">{title}</h2>
        </div>
        <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="yt-btn-red">
          <YTIcon size={16} />
          View Channel
        </a>
      </div>

      {/* ── Promo banner ── */}
      <PromoBanner />

      {/* ── Loading ── */}
      {loading && (
        <div className="yt-skeleton-row">
          {[...Array(4)].map((_, i) => <Skeleton key={i} />)}
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="yt-error-state">
          <span>😔</span>
          <p>Couldn't load videos. <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Visit our YouTube channel →</a></p>
        </div>
      )}

      {/* ── Videos: Featured + List ── */}
      {!loading && !error && videos.length > 0 && (
        <div className="yt-layout">

          {/* Featured player */}
          <div className="yt-featured">
            <div className="yt-featured-player" onClick={() => setPlaying(true)}>
              {playing ? (
                <iframe
                  key={featuredVideo.videoId}
                  src={`https://www.youtube.com/embed/${featuredVideo.videoId}?autoplay=1&rel=0`}
                  title={featuredVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="yt-player-iframe"
                />
              ) : (
                <>
                  <img
                    src={`https://i.ytimg.com/vi/${featuredVideo.videoId}/maxresdefault.jpg`}
                    alt={featuredVideo.title}
                    className="yt-featured-thumb"
                    onError={e => { e.target.src = `https://i.ytimg.com/vi/${featuredVideo.videoId}/hqdefault.jpg` }}
                  />
                  <div className="yt-featured-overlay">
                    <div className="yt-big-play">
                      <svg viewBox="0 0 24 24" fill="white" width="38" height="38">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                  </div>
                  <div className="yt-new-badge">LATEST</div>
                </>
              )}
            </div>
            <div className="yt-featured-info">
              <h3 className="yt-featured-title">{featuredVideo.title}</h3>
              <div className="yt-featured-meta">
                {parseInt(featuredVideo.views) > 0 && (
                  <span className="yt-meta-chip views-chip">
                    👁 {fmtViews(featuredVideo.views)} views
                  </span>
                )}
                {featuredVideo.published && (
                  <span className="yt-meta-chip time-chip">
                    🕐 {timeAgo(featuredVideo.published)}
                  </span>
                )}
              </div>
              <div className="yt-featured-actions">
                <a
                  href={`https://www.youtube.com/watch?v=${featuredVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-watch-link"
                >
                  <YTIcon size={16} />
                  Watch on YouTube
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this video by Veena Kunwar 🧘‍♀️\nhttps://www.youtube.com/watch?v=${featuredVideo.videoId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-share-inline"
                  aria-label="Share on WhatsApp"
                >
                  📤 Share
                </a>
              </div>
            </div>
          </div>

          {/* Playlist / scroll rail */}
          <div className="yt-playlist-col">
            <div className="yt-playlist-head">
              <span>All Videos</span>
              <span className="yt-count">{videos.length} videos</span>
            </div>

            <div className="yt-playlist-scroll">
              {videos.map((v, i) => (
                <button
                  key={v.videoId}
                  className={`yt-pl-item ${i === active ? 'active' : ''}`}
                  onClick={() => selectVideo(i)}
                  aria-label={`Play: ${v.title}`}
                >
                  <div className="yt-pl-thumb-wrap">
                    <img
                      src={`https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`}
                      alt={v.title}
                      className="yt-pl-thumb"
                      loading="lazy"
                    />
                    {i === active && (
                      <div className="yt-pl-now-playing">
                        <span /><span /><span />
                      </div>
                    )}
                  </div>
                  <div className="yt-pl-info">
                    <p className="yt-pl-title">{v.title}</p>
                    <div className="yt-pl-meta">
                      {parseInt(v.views) > 0 && <span>👁 {fmtViews(v.views)}</span>}
                      {v.published && <span>{timeAgo(v.published)}</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile horizontal scroll strip ── */}
      {!loading && !error && videos.length > 0 && (
        <div className="yt-mobile-strip">
          <div className="yt-strip-header">
            <span className="yt-strip-label">Swipe to browse</span>
            <div className="yt-strip-arrows">
              <button className="yt-arrow" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
              <button className="yt-arrow" onClick={() => scroll(1)}  aria-label="Next">›</button>
            </div>
          </div>

          <div className="yt-scroll-rail" ref={scrollRef}>
            {videos.map((v, i) => (
              <div
                key={v.videoId}
                className={`yt-scroll-card ${i === active ? 'active' : ''}`}
                onClick={() => selectVideo(i)}
              >
                <div className="yt-scroll-thumb-wrap">
                  <img
                    src={`https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="yt-scroll-thumb"
                  />
                  <div className="yt-scroll-play">▶</div>
                  {i === active && <div className="yt-scroll-active-badge">▶ Playing</div>}
                </div>
                <p className="yt-scroll-title">{v.title}</p>
                {parseInt(v.views) > 0 && (
                  <span className="yt-scroll-views">👁 {fmtViews(v.views)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Footer CTA ── */}
      {!loading && !error && (
        <div className="yt-cta-strip">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="yt-cta-btn">
            <YTIcon size={18} />
            More Videos — {CHANNEL_HANDLE}
          </a>
        </div>
      )}
    </section>
  )
}
