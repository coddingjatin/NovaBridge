import React, { useState } from 'react';
import { Certification, Achievement, ResearchPublication, ProfileBadge } from '../types/profile';
import { Award, ShieldCheck, ExternalLink, Sparkles, BookOpen, Trophy, FileText, CheckCircle2, Search } from 'lucide-react';

interface CertificatesPageProps {
  certifications: Certification[];
  achievements: Achievement[];
  publications: ResearchPublication[];
  badges: ProfileBadge[];
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({
  certifications,
  achievements,
  publications,
  badges
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'badges' | 'certs' | 'achievements'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cyberpunk Badges styled matching media_1787150520845.png
  const cyberBadges = [
    {
      id: 'cb1',
      title: 'HACKHAZARDS 2025',
      status: 'SUBMITTED',
      themeColor: '#A855F7',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      mascotUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      description: 'Submitted HyperStream Telemetry Engine to HackHazards International Hackathon.',
      category: 'Hackathon'
    },
    {
      id: 'cb2',
      title: 'HACKHAZARDS 2025',
      status: 'REGISTERED',
      themeColor: '#22C55E',
      glowColor: 'rgba(34, 197, 94, 0.4)',
      mascotUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
      description: 'Official verified participant badge for HackHazards 2025.',
      category: 'Hackathon'
    },
    {
      id: 'cb3',
      title: 'CODEFORCES CM',
      status: 'TOP 2.1% WINNER',
      themeColor: '#3B82F6',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      mascotUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
      description: 'Candidate Master (1891 Peak Rating) in global competitive algorithms.',
      category: 'Competitive Programming'
    },
    {
      id: 'cb4',
      title: 'LEETCODE 500 DAYS',
      status: 'LEGENDARY STREAK',
      themeColor: '#F97316',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      mascotUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
      description: '500 consecutive days of algorithmic problem solving.',
      category: 'Platform Badge'
    }
  ];

  return (
    <div className="certs-page-container">
      {/* Top Banner */}
      <div className="color-card color-card-purple" style={{ marginBottom: '24px' }}>
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner banner-flex-row">
          <div>
            <div className="banner-badge-top">
              <Award size={16} style={{ color: '#7C3AED' }} />
              <span>Verified Credentials & Digital Collectibles</span>
            </div>
            <h1 className="banner-main-title">Certificates, Badges & Achievements</h1>
            <p className="banner-sub-title">Explore cryptographically verified technical certifications, hackathon awards, and peer-reviewed research publications.</p>
          </div>

          <div className="search-filter-box">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search certs or badges..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="search-input-field" 
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="certs-tabs-bar">
        <button onClick={() => setActiveTab('all')} className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}>
          All Records ({certifications.length + cyberBadges.length + achievements.length})
        </button>
        <button onClick={() => setActiveTab('badges')} className={`tab-btn ${activeTab === 'badges' ? 'active' : ''}`}>
          <Sparkles size={14} /> Digital Badges ({cyberBadges.length})
        </button>
        <button onClick={() => setActiveTab('certs')} className={`tab-btn ${activeTab === 'certs' ? 'active' : ''}`}>
          <ShieldCheck size={14} /> Professional Certifications ({certifications.length})
        </button>
        <button onClick={() => setActiveTab('achievements')} className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}>
          <Trophy size={14} /> Hackathons & Awards ({achievements.length})
        </button>
      </div>

      {/* SECTION 1: Futuristic Digital NFT-style Badges (matching media_1787150520845.png) */}
      {(activeTab === 'all' || activeTab === 'badges') && (
        <div className="certs-section-block">
          <div className="section-header-flex">
            <h2 className="section-title">
              <Sparkles size={20} style={{ color: '#A855F7' }} /> Verified Hackathon & Platform Badges
            </h2>
            <span className="section-tag-purple">Codolio / NovaBridge Web3 Format</span>
          </div>

          <div className="cyber-badges-grid">
            {cyberBadges.map(badge => (
              <div 
                key={badge.id} 
                className="cyber-badge-card" 
                style={{ 
                  borderColor: badge.themeColor,
                  boxShadow: `0 0 20px ${badge.glowColor}`
                }}
              >
                {/* Outer frame graphics */}
                <div className="cyber-frame-corner top-left" style={{ background: badge.themeColor }}></div>
                <div className="cyber-frame-corner top-right" style={{ background: badge.themeColor }}></div>
                
                {/* Header Logo */}
                <div className="cyber-badge-header">
                  <div className="cyber-logo-ring" style={{ borderColor: badge.themeColor }}>
                    <div className="cyber-logo-text">{badge.title}</div>
                  </div>
                </div>

                {/* Center Mascot Image */}
                <div className="cyber-mascot-wrapper">
                  <img src={badge.mascotUrl} alt={badge.title} className="cyber-mascot-img" />
                  <div className="cyber-smoke-overlay" style={{ background: `radial-gradient(circle, ${badge.glowColor} 0%, transparent 70%)` }}></div>
                </div>

                {/* Bottom Status Banner (SUBMITTED / REGISTERED / WINNER) */}
                <div className="cyber-status-banner" style={{ background: badge.themeColor, textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  <span className="status-banner-text">{badge.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Professional Certifications */}
      {(activeTab === 'all' || activeTab === 'certs') && (
        <div className="certs-section-block">
          <div className="section-header-flex">
            <h2 className="section-title">
              <ShieldCheck size={20} style={{ color: '#059669' }} /> Professional Industry Certifications
            </h2>
          </div>

          <div className="certs-cards-grid">
            {certifications.map(cert => (
              <div key={cert.id} className="color-card color-card-emerald">
                <div className="color-card-ribbon"></div>
                <div className="color-card-inner cert-card-inner">
                  <div className="cert-top-row">
                    <div className="cert-issuer-badge">
                      <ShieldCheck size={16} style={{ color: '#059669' }} />
                      <span>{cert.issuer}</span>
                    </div>
                    <span className="cert-date">{cert.issueDate}</span>
                  </div>

                  <h3 className="cert-title">{cert.title}</h3>
                  <div className="cert-id-row">Credential ID: <code>{cert.credentialId}</code></div>

                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-cert-link"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Hackathons & Research Publications */}
      {(activeTab === 'all' || activeTab === 'achievements') && (
        <div className="certs-section-block">
          <div className="section-header-flex">
            <h2 className="section-title">
              <Trophy size={20} style={{ color: '#D97706' }} /> Hackathon Wins & Research Publications
            </h2>
          </div>

          <div className="achievements-cards-grid">
            {achievements.map(ach => (
              <div key={ach.id} className="color-card color-card-amber">
                <div className="color-card-ribbon"></div>
                <div className="color-card-inner">
                  <div className="ach-top">
                    <span className="ach-cat-pill">{ach.category}</span>
                    <span className="ach-date">{ach.date}</span>
                  </div>
                  <h3 className="ach-title">{ach.title}</h3>
                  <div className="ach-org">{ach.organization}</div>
                  <p className="ach-desc">{ach.description}</p>
                  {ach.rank && <div className="ach-rank-tag">🏆 {ach.rank}</div>}
                </div>
              </div>
            ))}

            {publications.map(pub => (
              <div key={pub.id} className="color-card color-card-royal">
                <div className="color-card-ribbon"></div>
                <div className="color-card-inner">
                  <div className="ach-top">
                    <span className="ach-cat-pill" style={{ background: '#DBEAFE', color: '#1E40AF' }}>IEEE Research</span>
                    <span className="ach-date">{pub.publicationDate}</span>
                  </div>
                  <h3 className="ach-title">{pub.title}</h3>
                  <div className="ach-org">{pub.publisher}</div>
                  <p className="ach-desc">{pub.abstract}</p>
                  {pub.url && (
                    <a href={pub.url} target="_blank" rel="noreferrer" className="btn-cert-link" style={{ marginTop: '12px' }}>
                      <span>Read Publication (DOI)</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .certs-page-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .banner-flex-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .banner-badge-top {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #7C3AED;
          background: #F3E8FF;
          padding: 4px 10px;
          border-radius: 20px;
          width: fit-content;
          margin-bottom: 8px;
        }
        .banner-main-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .banner-sub-title {
          font-size: 0.85rem;
          color: var(--slate-500);
          margin-top: 4px;
        }

        .search-filter-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          color: var(--slate-400);
        }
        .search-input-field {
          padding: 10px 14px 10px 36px;
          border: 1.5px solid var(--slate-200);
          border-radius: 12px;
          font-size: 0.85rem;
          color: var(--navy-900);
          outline: none;
          min-width: 260px;
        }

        .certs-tabs-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .tab-btn {
          padding: 9px 18px;
          border-radius: 10px;
          border: 1.5px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--slate-600);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .tab-btn.active {
          background: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }

        .certs-section-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .section-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .section-tag-purple {
          font-size: 0.75rem;
          font-weight: 800;
          color: #7C3AED;
          background: #F3E8FF;
          padding: 3px 10px;
          border-radius: 12px;
        }

        /* Cyberpunk NFT Badges Grid (matching media_1787150520845.png) */
        .cyber-badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
        .cyber-badge-card {
          background: #0B0F19;
          border: 3px solid;
          border-radius: 20px;
          padding: 20px 16px 14px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cyber-badge-card:hover {
          transform: translateY(-5px) scale(1.03);
        }
        .cyber-frame-corner {
          position: absolute;
          width: 12px;
          height: 12px;
        }
        .top-left { top: 0; left: 0; clip-path: polygon(0 0, 100% 0, 0 100%); }
        .top-right { top: 0; right: 0; clip-path: polygon(0 0, 100% 0, 100% 100%); }

        .cyber-badge-header {
          margin-bottom: 14px;
        }
        .cyber-logo-ring {
          border: 2px dashed;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
        }
        .cyber-logo-text {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: #FFFFFF;
          text-align: center;
        }
        .cyber-mascot-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cyber-mascot-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          z-index: 2;
        }
        .cyber-smoke-overlay {
          position: absolute;
          inset: -10px;
          z-index: 1;
          border-radius: 50%;
        }

        .cyber-status-banner {
          width: calc(100% + 32px);
          margin-bottom: -14px;
          margin-top: 14px;
          padding: 10px;
          text-align: center;
        }
        .status-banner-text {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #FFFFFF;
        }

        /* Certs & Achievements Grid */
        .certs-cards-grid, .achievements-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .cert-card-inner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cert-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cert-issuer-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #065F46;
        }
        .cert-date {
          font-size: 0.75rem;
          color: var(--slate-500);
        }
        .cert-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .cert-id-row {
          font-size: 0.78rem;
          color: var(--slate-600);
        }
        .cert-id-row code {
          background: var(--slate-100);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }
        .btn-cert-link {
          margin-top: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          background: var(--slate-100);
          border: 1px solid var(--slate-200);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--navy-900);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
        }
        .btn-cert-link:hover {
          background: #D1FAE5;
          color: #065F46;
          border-color: #A7F3D0;
        }

        .ach-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .ach-cat-pill {
          font-size: 0.72rem;
          font-weight: 800;
          background: #FEF3C7;
          color: #92400E;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .ach-date { font-size: 0.75rem; color: var(--slate-500); }
        .ach-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .ach-org {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .ach-desc {
          font-size: 0.8125rem;
          color: var(--slate-600);
          margin-top: 8px;
          line-height: 1.4;
        }
        .ach-rank-tag {
          font-size: 0.8125rem;
          font-weight: 800;
          color: #B45309;
          background: #FFFBEB;
          padding: 6px 10px;
          border-radius: 8px;
          margin-top: 10px;
          border: 1px solid #FDE68A;
        }
      `}</style>
    </div>
  );
};
