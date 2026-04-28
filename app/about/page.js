import React from 'react';
import { ArrowLeft, User, Target, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - SarkariResultCorner | India\'s Trusted Job Portal',
  description: 'Learn about SarkariResultCorner.com, India\'s leading government job portal. We provide verified Sarkari Results, Admit Cards, and Jobs updates.',
  keywords: 'About SarkariResultCorner, Sarkari Result Team, Government Job Portal India, Verified Job Portal',
  openGraph: {
    title: 'About Us - SarkariResultCorner | India\'s Trusted Job Portal',
    description: 'Learn about SarkariResultCorner.com, India\'s leading government job portal.',
    url: 'https://sarkariresultcorner.com/about',
    type: 'website',
    images: [{ url: 'https://sarkariresultcorner.com/og-image.jpg', width: 1200, height: 630 }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "SarkariResultCorner",
    "url": "https://sarkariresultcorner.com",
    "logo": "https://sarkariresultcorner.com/og-image.jpg",
    "description": "India's leading portal for government job notifications, results, and career guidance."
  }
};

export default function AboutPage() {
  return (
    <div className="legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="wrapper">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back Home</Link>
        
        <div className="glass-card">
          <div className="hero">
            <h1 className="title">About SarkariResultCorner</h1>
            <p className="subtitle">Empowering India's Youth with Expert-Verified Career Insights since 2026.</p>
          </div>

          <div className="grid">
            <div className="feature">
              <div className="icon"><User /></div>
              <h3>Who We Are</h3>
              <p>SarkariResultCorner.com is a premier digital destination for job seekers in India. We leverage a dedicated team of recruitment analysts to rewrite and simplify complex government notifications into easy-to-read, professional, and unique articles.</p>
            </div>

            <div className="feature">
              <div className="icon"><Target /></div>
              <h3>Our Mission</h3>
              <p>Our mission is to eliminate the confusion surrounding government recruitments. We provide fast, accurate, and 100% human-verified results, admit cards, and latest job updates with a focus on user experience and clarity.</p>
            </div>

            <div className="feature">
              <div className="icon"><ShieldCheck /></div>
              <h3>Why Choose Us?</h3>
              <p>Unlike traditional job portals, we offer unique, plagiarism-free content that explains the eligibility, recruitment process, and FAQs in depth. Our smart graphical banners give you the key dates at a single glance.</p>
            </div>
          </div>

          <div className="content-text">
            <h2>Our Story</h2>
            <p>Founded on the principles of transparency and speed, SarkariResultCorner was built to bridge the gap between complex government official websites and the common job seeker. We understand that every second counts when applying for a dream career, which is why we've streamlined the data extraction and delivery process while maintaining 100% accuracy.</p>
            
            <h2>Contact Our Team</h2>
            <p>We are a dedicated team of developers, SEO experts, and recruitment analysts working 24/7 to keep you ahead of the competition. If you have any suggestions or feedback, please visit our Contact Us page.</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .legal-page { color: var(--foreground); background: var(--background); min-height: 100vh; font-family: 'Outfit', sans-serif; padding: 4rem 1rem; }
        .wrapper { max-width: 1000px; margin: 0 auto; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--foreground-muted); text-decoration: none; margin-bottom: 2rem; transition: color 0.2s; }
        .back-link:hover { color: var(--primary); }
        .glass-card { background: var(--card); border: 1px solid var(--border); border-radius: 2rem; padding: 4rem; backdrop-filter: blur(var(--glass-blur)); }
        .hero { text-align: center; margin-bottom: 5rem; }
        .title { font-size: 3.5rem; font-weight: 950; margin-bottom: 1rem; color: var(--foreground); }
        .subtitle { font-size: 1.25rem; color: var(--foreground-muted); }
        
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem; margin-bottom: 5rem; }
        .feature { background: var(--border-light); border: 1px solid var(--border); padding: 2.5rem; border-radius: 1.5rem; transition: all 0.3s; }
        .feature:hover { transform: translateY(-10px); background: var(--card); border-color: var(--primary); box-shadow: var(--shadow-md); }
        .icon { width: 50px; height: 50px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin-bottom: 1.5rem; }
        .feature h3 { font-size: 1.5rem; color: var(--primary); margin-bottom: 1rem; font-weight: 800; }
        .feature p { color: var(--foreground-muted); line-height: 1.6; font-size: 1rem; }

        .content-text h2 { color: var(--primary); font-size: 2rem; margin: 4rem 0 1.5rem 0; font-weight: 900; }
        .content-text p { line-height: 2; color: var(--foreground-muted); font-size: 1.15rem; margin-bottom: 2rem; }
      `}} />
    </div>
  );
}
