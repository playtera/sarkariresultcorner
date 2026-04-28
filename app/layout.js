import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'SarkariResultCorner.com - Official Website for Latest Jobs, Results, Admit Cards',
  description: 'SarkariResultCorner 2026 – Official Website for latest government jobs, online forms, admit cards, results, and recruitment updates for SSC, Railway, Bank, Police, UPPSC, UPSSSC & more.',
  keywords: 'Sarkari Result, Sarkari Exam, Government Jobs, Admit Card, Latest Results, Online Form, 2026 jobs, India recruitment',
  authors: [{ name: 'SarkariResultCorner Team' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  alternates: {
    canonical: 'https://sarkariresultcorner.com',
  },
  openGraph: {
    title: 'SarkariResultCorner.com - Government Jobs Portal',
    description: 'Get latest updates on Sarkari Results, Admit Cards, and Latest Jobs.',
    url: 'https://sarkariresultcorner.com',
    siteName: 'SarkariResultCorner',
    images: [
      {
        url: 'https://sarkariresultcorner.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SarkariResultCorner - India\'s Government Jobs Portal',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SarkariResultCorner.com - Government Jobs Portal',
    description: 'Get latest updates on Sarkari Results, Admit Cards, and Latest Jobs.',
    images: ['https://sarkariresultcorner.com/twitter-image.jpg'],
    site: '@SarkariResultCorner',
    creator: '@SarkariResultCorner',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  // WebSite schema with SearchAction — helps AI engines understand site search
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SarkariResultCorner",
    "alternateName": ["Sarkari Result Corner", "SRC", "SarkariResultCorner.com"],
    "url": "https://sarkariresultcorner.com/",
    "description": "India's trusted portal for government job notifications, sarkari results, admit cards, and recruitment updates.",
    "inLanguage": "en-IN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sarkariresultcorner.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Organization schema with social signals — critical for E-E-A-T and GEO citation
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SarkariResultCorner",
    "legalName": "Sarkari Result Corner",
    "url": "https://sarkariresultcorner.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sarkariresultcorner.com/og-image.jpg",
      "width": 1200,
      "height": 630
    },
    "description": "India's leading portal for government job notifications, sarkari results, admit cards, and recruitment updates for SSC, Railway, Bank, Police and state PSC exams.",
    "foundingDate": "2024",
    "areaServed": "IN",
    "knowsAbout": ["Sarkari Result", "Government Jobs India", "SSC Recruitment", "Railway Jobs", "Bank PO", "UPSC", "State PSC Exams"],
    "sameAs": [
      "https://t.me/sarkariresult"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://sarkariresultcorner.com/contact",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 day" />
        <link rel="me" href="https://t.me/sarkariresult" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
