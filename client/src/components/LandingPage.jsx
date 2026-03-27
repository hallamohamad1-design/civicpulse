import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const content = {
    en: {
      heroTitle: 'Empowering Citizens, Improving Infrastructure.',
      heroSubtitle: 'CivicPulse bridges the communication gap between you and your local government. Report issues, track progress, and build a better community together.',
      ctaPrimary: 'Report an Issue Now',
      ctaSecondary: 'View Live Map',
      howItWorksTitle: 'How It Works',
      step1Title: 'Spot an Issue',
      step1Desc: 'See a pothole, leak, or outage? Capture a photo of the problem.',
      step2Title: 'Report & Geo-Tag',
      step2Desc: 'Drop a pin on our interactive map and submit your report in seconds.',
      step3Title: 'Track Progress',
      step3Desc: 'Follow your issue from pending to resolved with real-time updates.'
    },
    ar: {
      heroTitle: 'تمكين المواطنين، تحسين البنية التحتية.',
      heroSubtitle: 'نبض المدينة يسد الفجوة في التواصل بينك وبين حكومتك المحلية. أبلغ عن المشكلات وتتبع التقدم وابنوا مجتمعًا أفضل معًا.',
      ctaPrimary: 'أبلغ عن مشكلة الآن',
      ctaSecondary: 'عرض الخريطة الحية',
      howItWorksTitle: 'كيف يعمل',
      step1Title: 'اكتشف المشكلة',
      step1Desc: 'هل ترى حفرة أو تسرب أو انقطاع؟ التقط صورة للمشكلة.',
      step2Title: 'أبلغ وحدد الموقع',
      step2Desc: 'ضع علامة على خريطتنا التفاعلية وقدم بلاغك في ثوانٍ.',
      step3Title: 'تتبع التقدم',
      step3Desc: 'تابع مشكلتك من الانتظار إلى الحل مع التحديثات المباشرة.'
    }
  };

  const t = content[language];

  return (
    <div className="landing-page">
      <nav className="navbar container">
        <div className="logo">
          <span className="logo-icon">📍</span>
          <span className="logo-text">CivicPulse</span>
        </div>
        <div className="nav-controls">
          <button className="lang-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <button className="btn btn-secondary nav-login" onClick={() => navigate('/citizen/dashboard')}>Login</button>
          <button className="btn btn-secondary" onClick={() => navigate('/official/dashboard')}>Official</button>
        </div>
      </nav>

      <header className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>{t.heroTitle}</h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="cta-group">
              <button className="btn btn-primary" onClick={() => navigate('/map')}>
                {t.ctaPrimary}
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/map')}>
                {t.ctaSecondary}
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mockup-frame">
              <div className="map-placeholder">
                <div className="pulse-dot"></div>
                <div className="pulse-ring"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{t.howItWorksTitle}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>{t.step1Title}</h3>
              <p>{t.step1Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>{t.step2Title}</h3>
              <p>{t.step2Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>{t.step3Title}</h3>
              <p>{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
