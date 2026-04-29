'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Search, Briefcase, GraduationCap, FileText, CheckCircle, Home, Send, Bell } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Jobs', href: '/latest-jobs', icon: <Briefcase size={18} /> },
    { name: 'Results', href: '/result', icon: <CheckCircle size={18} /> },
    { name: 'Admit Card', href: '/admit-cards', icon: <FileText size={18} /> },
    { name: 'Answer Key', href: '/answer-key', icon: <GraduationCap size={18} /> },
  ];

  return (
    <header className="header-main">
      <div className="container header-content">
        <Link href="/" className="logo-area">
          <div className="logo-container" style={{ position: 'relative', width: '176px', height: '60px' }}>
            <Image 
              src="/srcheader_darkmode.png" 
              alt="SarkariResultCorner.com Logo" 
              className="site-logo logo-light" 
              width={176} 
              height={60} 
              priority
              style={{ objectFit: 'contain' }}
            />
            <Image 
              src="/srcheader_darkmode.png" 
              alt="SarkariResultCorner.com Logo" 
              className="site-logo logo-dark" 
              width={176} 
              height={60} 
              priority
              style={{ objectFit: 'contain' }}
            />
            <div className="logo-glow"></div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-navigation">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-li">
                <Link href={link.href} className="nav-link-modern">
                  <span className="nav-text">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button className="icon-action-btn search-trigger" aria-label="Search">
            <Search size={20} />
          </button>

          <button className="icon-action-btn notify-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="notify-badge"></span>
          </button>

          <a href="https://t.me/sarkariresult_corner" target="_blank" rel="noopener noreferrer" className="premium-cta-btn">
            <Send size={16} className="cta-icon" />
            <span>Join Telegram</span>
          </a>

          <button className="mobile-menu-trigger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}>
        <nav className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <div className="mobile-logo-container" style={{ position: 'relative', width: '140px', height: '48px' }}>
              <Image src="/srcheader_darkmode.png" alt="SarkariResultCorner.com Mobile Logo" className="drawer-logo logo-light" width={140} height={48} style={{ objectFit: 'contain' }} />
              <Image src="/srcheader_darkmode.png" alt="SarkariResultCorner.com Mobile Logo" className="drawer-logo logo-dark" width={140} height={48} style={{ objectFit: 'contain' }} />
            </div>
            <button className="icon-action-btn" onClick={() => setIsOpen(false)} aria-label="Close Menu">
              <X size={24} />
            </button>
          </div>

          <div className="drawer-scroll-area">
            <ul className="drawer-menu">
              {navLinks.map((link, idx) => (
                <li key={link.name} className={isOpen ? 'animate-in' : ''} style={{ animationDelay: `${0.1 + idx * 0.05}s` }}>
                  <Link href={link.href} className="drawer-item" onClick={() => setIsOpen(false)}>
                    <span className="item-icon">{link.icon}</span>
                    <span className="item-name">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="drawer-footer">
            <p className="drawer-caption">Get instant updates on Telegram</p>
            <a href="https://t.me/sarkariresult_corner" className="drawer-cta" target="_blank" rel="noopener noreferrer">
              <Send size={18} /> Join Now
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
};

export default Header;
