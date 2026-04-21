'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, CheckCircle, GraduationCap, RefreshCw, CheckCircle2 } from 'lucide-react';
import CategoryList from '@/components/CategoryList';
import { client } from '@/lib/sanity/client';

export default function AdminPost() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sanityStatusMap, setSanityStatusMap] = useState({});
  const [checkingSanity, setCheckingSanity] = useState(false);

  const fetchData = async (refresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const url = refresh ? '/api/scrape?type=sitemap&refresh=true' : '/api/scrape?type=sitemap';
      const res = await fetch(url, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setError(json.error || 'Failed to fetch data');
      }
    } catch (err) {
      console.error("Failed to fetch scraped data", err);
      setError("Error connecting to the scraper API");
    } finally {
      setLoading(false);
    }
  };

  const totalLinks = data.reduce((acc, cat) => acc + cat.items.length, 0);
  const liveInSanityCount = Object.keys(sanityStatusMap).length;
  const pendingCount = totalLinks - liveInSanityCount;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      checkSanityBatch();
    }
  }, [data]);

  const checkSanityBatch = async () => {
    setCheckingSanity(true);
    const slugs = [];
    data.forEach(cat => {
      cat.items.forEach(item => {
        let slug = item.link;
        if (slug.startsWith('/')) slug = slug.slice(1);
        if (slug && slugs.length < 1000) slugs.push(slug);
      });
    });

    if (slugs.length === 0) {
      setCheckingSanity(false);
      return;
    }

    try {
      const query = `*[_type == "post" && slug.current in $slugs].slug.current`;
      const existingSlugs = await client.fetch(query, { slugs });
      
      const map = {};
      existingSlugs.forEach(slug => {
        map[slug] = true;
      });
      setSanityStatusMap(map);
    } catch (err) {
      console.error("Batch sanity check failed", err);
    } finally {
      setCheckingSanity(false);
    }
  };

  const getIconForCategory = (title) => {
    const t = title.toLowerCase();
    if (t.includes('job') || t.includes('latest')) return <FileText size={18} />;
    if (t.includes('admit card')) return <CheckCircle size={18} />;
    if (t.includes('result')) return <GraduationCap size={18} />;
    if (t.includes('answer key')) return <FileText size={18} />;
    return <Sparkles size={18} />;
  };

  const getColorForCategory = (title) => {
    const t = title.toLowerCase();
    if (t.includes('result')) return 'success';
    if (t.includes('admit card')) return 'warning';
    if (t.includes('answer key')) return 'info';
    if (t.includes('admission')) return 'primary';
    return 'primary';
  };

  const getLinkForCategory = (title) => {
    const t = title.toLowerCase().trim();
    if (t === 'latest jobs') return '/latest-jobs';
    if (t === 'result' || t === 'results') return '/result';
    if (t === 'admit card' || t === 'admit cards') return '/admit-cards';
    if (t === 'answer key') return '/answer-key';
    if (t === 'admission') return '/admission';
    return "/" + t.replace(/\s+/g, '-');
  };

  return (
    <div className="home-container">
      <div className="content">
        <div className="hero-section glass-card">
          <h1 className="title">
            Admin Post <span className="text-gradient">Manager</span>
          </h1>
          <p className="description">
            Managing latest updates from sitemap2.xml
          </p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{totalLinks}</span>
              <span className="stat-label">Sitemap Links</span>
            </div>
            <div className="stat-card success">
              <span className="stat-value">{liveInSanityCount}</span>
              <span className="stat-label">In Sanity</span>
            </div>
            <div className="stat-card warning">
              <span className="stat-value">{pendingCount}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>

          <button 
            className="sync-btn" 
            onClick={() => fetchData(true)}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading || checkingSanity ? 'spin' : ''} />
            {loading ? 'Syncing...' : checkingSanity ? 'Checking Sanity...' : 'Sync Latest Data'}
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <Sparkles size={32} className="icon-pulse" style={{ color: '#3b82f6' }} />
            <p>Syncing latest updates for you...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Oops, something went wrong:</p>
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <div className="dashboard-grid sitemap-mode">
            {data.map((category, index) => (
              <CategoryList
                key={index}
                title={category.title}
                icon={getIconForCategory(category.title)}
                items={category.items.map(item => {
                  const slug = item.link.startsWith('/') ? item.link.slice(1) : item.link;
                  return {
                    ...item,
                    // Redirect links to the admin detail view
                    link: item.link.startsWith('/') 
                      ? `/adminpost${item.link}` 
                      : item.link,
                    sanityExists: !!sanityStatusMap[slug]
                  };
                })}
                viewMoreLink={getLinkForCategory(category.title)}
                color={getColorForCategory(category.title)}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', sans-serif;
          color: white;
        }

        .content {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-section {
          padding: 3rem 2rem;
          border-radius: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.2;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .text-gradient {
          background: linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .description {
          font-size: 1.125rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 1.5rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto 2rem;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .stat-card .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
        }
        
        .stat-card .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .stat-card.success {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }
        .stat-card.success .stat-value { color: #10b981; }
        
        .stat-card.warning {
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.05);
        }
        .stat-card.warning .stat-value { color: #f59e0b; }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: start;
        }

        .loading-state, .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          gap: 1rem;
          color: #94a3b8;
          font-size: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .error-message {
          color: #ef4444;
          font-weight: bold;
        }

        .icon-pulse { animation: pulse 2s infinite; }

        .sync-btn {
          margin-top: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sync-btn:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .sync-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spin { animation: spin 1s linear infinite; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        .dashboard-grid.sitemap-mode {
          grid-template-columns: 1fr;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .hero-section {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
