import './About.css'

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>About Hasya Yoga</h1>
          <p className="hero-subtitle">A Journey of Joy and Wellness</p>
        </div>
      </section>

      <section className="section story-section">
        <div className="container">
          <div className="content-wrapper">
            <div className="content-text">
              <h2>My Story</h2>
              <p>
                Welcome! I'm a passionate Hasya Yoga teacher with over 15 years of experience in bringing
                laughter and wellness into people's lives. My journey began when I discovered the transformative
                power of combining traditional yoga practices with the healing energy of laughter.
              </p>
              <p>
                At 60 years young, I've learned that age is just a number, and joy is the secret to a vibrant life.
                Through Hasya Yoga, I've helped hundreds of students find balance, reduce stress, and rediscover
                the simple pleasure of genuine laughter.
              </p>
            </div>
            <div className="content-image">
              <div className="placeholder-image">🧘‍♀️</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section experience-section">
        <div className="container">
          <h2 className="section-title">My Experience</h2>
          <div className="experience-grid">
            <div className="glossy-card experience-card">
              <h3>15+ Years</h3>
              <p>Teaching Hasya Yoga</p>
            </div>
            <div className="glossy-card experience-card">
              <h3>500+ Students</h3>
              <p>Transformed Lives</p>
            </div>
            <div className="glossy-card experience-card">
              <h3>1000+ Sessions</h3>
              <p>Conducted Successfully</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section mission-section">
        <div className="container">
          <div className="content-wrapper reverse">
            <div className="content-image">
              <div className="placeholder-image">🌟</div>
            </div>
            <div className="content-text">
              <h2>My Mission</h2>
              <p>
                My mission is simple: to spread joy, wellness, and laughter to as many people as possible.
                I believe that everyone deserves to experience the healing power of Hasya Yoga, regardless of
                age, fitness level, or background.
              </p>
              <p>
                Through my online sessions, I aim to create a welcoming community where people can come together,
                laugh freely, and support each other on their wellness journey. Every session is designed to be
                accessible, enjoyable, and transformative.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <h2 className="section-title">Why Hasya Yoga?</h2>
          <div className="why-grid">
            <div className="glossy-card why-card">
              <div className="why-icon">😊</div>
              <h3>Reduces Stress</h3>
              <p>Laughter releases endorphins and reduces cortisol levels, naturally lowering stress.</p>
            </div>
            <div className="glossy-card why-card">
              <div className="why-icon">💪</div>
              <h3>Boosts Immunity</h3>
              <p>Regular practice strengthens your immune system and improves overall health.</p>
            </div>
            <div className="glossy-card why-card">
              <div className="why-icon">❤️</div>
              <h3>Improves Mood</h3>
              <p>Laughter is a natural mood enhancer that brings joy and positivity into your life.</p>
            </div>
            <div className="glossy-card why-card">
              <div className="why-icon">🤝</div>
              <h3>Builds Community</h3>
              <p>Join a supportive community of like-minded individuals on a wellness journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section products-story-section">
        <div className="container">
          <div className="content-wrapper">
            <div className="content-text">
              <h2>Our Wellness Products</h2>
              <p>
                Over the years, I've curated a selection of wellness products that complement the Hasya Yoga practice.
                These products are carefully chosen to support your journey toward better health and happiness.
              </p>
              <p>
                From natural supplements to wellness accessories, each product has been tested and recommended
                based on my personal experience and the positive feedback from our community.
              </p>
              <a href="/shop">
                <button className="btn btn-primary">Explore Products</button>
              </a>
            </div>
            <div className="content-image">
              <div className="placeholder-image">🛍️</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

