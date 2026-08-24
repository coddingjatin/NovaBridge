import React, { useState } from 'react';
import { UserProfile } from '../types/profile';
import { 
  MapPin, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Globe, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  ExternalLink,
  Plus,
  RefreshCw,
  Camera,
  Pencil,
  Code2
} from 'lucide-react';

interface LeftProfileCardProps {
  profile: UserProfile;
  onOpenUpdateLinks: () => void;
  onSyncAPIs: () => void;
  isSyncing: boolean;
  publicProfileEnabled: boolean;
  setPublicProfileEnabled: (val: boolean) => void;
}

export const LeftProfileCard: React.FC<LeftProfileCardProps> = ({
  profile,
  onOpenUpdateLinks,
  onSyncAPIs,
  isSyncing,
  publicProfileEnabled,
  setPublicProfileEnabled
}) => {
  const [statsOpen, setStatsOpen] = useState(true);

  const getFullUrl = (url?: string, defaultPrefix?: string) => {
    if (!url || !url.trim()) return '#';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) return trimmed;
    return defaultPrefix ? `${defaultPrefix}${trimmed}` : `https://${trimmed}`;
  };

  return (
    <div className="left-profile-wrapper">
      {/* 1. Header controls */}
      <div className="profile-header-controls">
        <div className="toggle-row">
          <span>Public Profile</span>
          <label className="switch-toggle">
            <input 
              type="checkbox" 
              checked={publicProfileEnabled} 
              onChange={e => setPublicProfileEnabled(e.target.checked)} 
            />
            <span className="slider-round"></span>
          </label>
        </div>

        <button 
          onClick={onSyncAPIs} 
          disabled={isSyncing}
          className="btn-refresh-now"
        >
          <span>Refresh Now</span>
          <RefreshCw size={12} className={isSyncing ? 'spin-icon' : ''} />
        </button>
      </div>

      {/* 2. Main Profile Card */}
      <div className="nb-card left-card-root">
        {/* Edit Links Quick Action Header */}
        <div className="card-top-action-bar">
          <button className="edit-all-links-btn" onClick={onOpenUpdateLinks} title="Edit Social & Coding Profiles">
            <Pencil size={12} /> Edit Profiles & Links
          </button>
        </div>

        {/* Avatar Image with Camera/Edit Button */}
        <div className="avatar-wrapper">
          <img src={profile.photoUrl} alt={profile.fullName} className="card-avatar" />
          <button className="edit-avatar-btn" onClick={onOpenUpdateLinks} title="Edit Photo & Profile Links">
            <Camera size={13} />
          </button>
        </div>

        {/* Identity Details */}
        <div className="card-identity">
          <h2 className="card-name-text">{profile.fullName}</h2>
          <div className="card-handle-text">@{profile.handles.github || 'username'}</div>

          {/* Orange Get NovaBridge Card Button */}
          <button className="btn-get-codolio" onClick={() => alert('NovaBridge Card generated!')}>
            <span>Get your NovaBridge Card</span>
            <span className="lock-icon">🔒</span>
          </button>
        </div>

        {/* Social Link Row with Edit Trigger & Direct Links */}
        <div className="social-icons-container">
          <div className="social-icons-row">
            <a 
              href={getFullUrl(profile.email, 'mailto:')} 
              target={profile.email ? undefined : '_self'}
              className="social-icon-btn" 
              title={profile.email ? `Email: ${profile.email}` : 'Add Email'}
            >
              <Mail size={16} />
            </a>
            <a 
              href={getFullUrl(profile.handles.linkedin || profile.linkedInStats.url, 'https://linkedin.com/in/')} 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-btn" 
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href={getFullUrl(profile.handles.devfolio, 'https://devfolio.co/@')} 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-btn" 
              title="Devfolio / Developer Profile"
            >
              <Code2 size={16} />
            </a>
            <a 
              href={getFullUrl(profile.handles.portfolio)} 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-btn" 
              title="Portfolio Website"
            >
              <Globe size={16} />
            </a>
            <a 
              href="#" 
              onClick={e => { e.preventDefault(); alert(`Resume: ${profile.resumeFileName}`); }} 
              className="social-icon-btn" 
              title="View Resume"
            >
              <FileText size={16} />
            </a>
            <button onClick={onOpenUpdateLinks} className="social-icon-edit-btn" title="Edit All Links">
              <Pencil size={12} />
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="profile-metadata-section">
          <div className="meta-row">
            <MapPin size={15} className="text-slate-400" />
            <span>{profile.location}</span>
          </div>
          <div className="meta-row">
            <GraduationCap size={15} className="text-slate-400" />
            <span>{profile.institution}</span>
          </div>
        </div>

        <div className="about-accordion-title">About</div>

        {/* Problem Solving Accordion */}
        <div className="accordion-box">
          <button 
            onClick={() => setStatsOpen(!statsOpen)} 
            className="accordion-header-btn"
          >
            <span>Problem Solving Stats</span>
            {statsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {statsOpen && (
            <div className="accordion-content-list">
              {/* GitHub */}
              <div className="profile-list-row">
                <div className="profile-brand-group">
                  <span className="platform-icon-circle bg-gray-100">GH</span>
                  <div>
                    <div className="brand-name">GitHub</div>
                    <div className="brand-handle">@{profile.handles.github || 'Not set'}</div>
                  </div>
                </div>
                <div className="profile-row-right">
                  <a href={getFullUrl(profile.handles.github, 'https://github.com/')} target="_blank" rel="noreferrer" className="row-link">
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* LeetCode */}
              <div className="profile-list-row">
                <div className="profile-brand-group">
                  <span className="platform-icon-circle bg-amber-50">LC</span>
                  <div>
                    <div className="brand-name">LeetCode</div>
                    <div className="brand-handle">@{profile.handles.leetcode || 'Not set'}</div>
                  </div>
                </div>
                <div className="profile-row-right">
                  <a href={getFullUrl(profile.handles.leetcode, 'https://leetcode.com/u/')} target="_blank" rel="noreferrer" className="row-link">
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* CodeChef */}
              <div className="profile-list-row">
                <div className="profile-brand-group">
                  <span className="platform-icon-circle bg-purple-50">Chef</span>
                  <div>
                    <div className="brand-name">CodeChef</div>
                    <div className="brand-handle">@{profile.handles.codechef || 'Not set'}</div>
                  </div>
                </div>
                <div className="profile-row-right">
                  <a href={getFullUrl(profile.handles.codechef, 'https://codechef.com/users/')} target="_blank" rel="noreferrer" className="row-link">
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Codeforces */}
              <div className="profile-list-row">
                <div className="profile-brand-group">
                  <span className="platform-icon-circle bg-blue-50">CF</span>
                  <div>
                    <div className="brand-name">CodeForces</div>
                    <div className="brand-handle">@{profile.handles.codeforces || 'Not set'}</div>
                  </div>
                </div>
                <div className="profile-row-right">
                  <a href={getFullUrl(profile.handles.codeforces, 'https://codeforces.com/profile/')} target="_blank" rel="noreferrer" className="row-link">
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* HackerRank */}
              {profile.handles.hackerrank && (
                <div className="profile-list-row">
                  <div className="profile-brand-group">
                    <span className="platform-icon-circle bg-emerald-50">HR</span>
                    <div>
                      <div className="brand-name">HackerRank</div>
                      <div className="brand-handle">@{profile.handles.hackerrank}</div>
                    </div>
                  </div>
                  <div className="profile-row-right">
                    <a href={getFullUrl(profile.handles.hackerrank, 'https://hackerrank.com/profile/')} target="_blank" rel="noreferrer" className="row-link">
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              )}

              {/* Add Platform Button */}
              <button 
                onClick={onOpenUpdateLinks}
                className="btn btn-orange-outline btn-sm add-platform-btn-outline"
              >
                <Plus size={13} /> Update / Add Profiles & Links
              </button>
            </div>
          )}
        </div>

        {/* Development Stats Section */}
        <div className="dev-stats-header">Development Stats</div>
      </div>

      <style>{`
        .left-profile-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .profile-header-controls {
          background-color: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .switch-toggle {
          position: relative;
          display: inline-block;
          width: 34px;
          height: 20px;
        }
        .switch-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider-round {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: var(--slate-300);
          transition: .4s;
          border-radius: 20px;
        }
        .slider-round:before {
          position: absolute;
          content: "";
          height: 14px; width: 14px;
          left: 3px; bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider-round {
          background-color: var(--codolio-orange);
        }
        input:checked + .slider-round:before {
          transform: translateX(14px);
        }
        .btn-refresh-now {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .btn-refresh-now:hover {
          color: var(--codolio-orange);
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .left-card-root {
          background-color: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .card-top-action-bar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 4px;
        }
        .edit-all-links-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--codolio-orange);
          background: #FFF7ED;
          border: 1px solid #FFEDD5;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        .edit-all-links-btn:hover {
          background: #FFEDD5;
        }
        .avatar-wrapper {
          position: relative;
          width: 110px;
          height: 110px;
          margin: 0 auto 14px auto;
        }
        .card-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--slate-200);
        }
        .edit-avatar-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 1px solid var(--slate-300);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          color: var(--navy-900);
        }
        .edit-avatar-btn:hover {
          background-color: var(--slate-100);
          color: var(--codolio-orange);
        }
        .card-name-text {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--navy-900);
          text-align: center;
        }
        .card-handle-text {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--royal-600);
          text-align: center;
          margin-top: 2px;
        }
        .btn-get-codolio {
          width: 100%;
          background-color: var(--codolio-orange);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.82rem;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-get-codolio:hover {
          background-color: var(--codolio-orange-hover);
        }
        .social-icons-container {
          margin-top: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--slate-100);
        }
        .social-icons-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .social-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate-600);
          transition: all var(--transition-fast);
        }
        .social-icon-btn:hover {
          color: var(--codolio-orange);
          border-color: var(--codolio-orange);
          background: #FFF7ED;
          transform: translateY(-1px);
        }
        .social-icon-edit-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #FFF7ED;
          border: 1px dashed var(--codolio-orange);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--codolio-orange);
          cursor: pointer;
        }
        .social-icon-edit-btn:hover {
          background: var(--codolio-orange);
          color: #FFFFFF;
        }
        .profile-metadata-section {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.8125rem;
          color: var(--slate-600);
          padding-bottom: 14px;
          border-bottom: 1px solid var(--slate-100);
        }
        .meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .about-accordion-title {
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--slate-500);
          text-transform: uppercase;
          margin-top: 14px;
        }
        .accordion-box {
          margin-top: 10px;
        }
        .accordion-header-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 800;
          font-size: 0.82rem;
          color: var(--navy-900);
          background-color: var(--slate-100);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
        }
        .accordion-content-list {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .profile-list-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          background-color: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-sm);
        }
        .profile-brand-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .platform-icon-circle {
          font-size: 0.65rem;
          font-weight: 800;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-gray-100 { background-color: #F3F4F6; color: #1F2937; }
        .bg-amber-50 { background-color: #FEF3C7; color: #D97706; }
        .bg-purple-50 { background-color: var(--purple-50); color: var(--purple-600); }
        .bg-blue-50 { background-color: var(--royal-50); color: var(--royal-600); }
        .bg-emerald-50 { background-color: #D1FAE5; color: #065F46; }
        .brand-name {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .brand-handle {
          font-size: 0.72rem;
          color: var(--slate-500);
        }
        .profile-row-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .row-link {
          color: var(--slate-400);
        }
        .row-link:hover {
          color: var(--codolio-orange);
        }
        .add-platform-btn-outline {
          width: 100%;
          margin-top: 8px;
        }
        .dev-stats-header {
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--slate-500);
          text-transform: uppercase;
          margin-top: 18px;
        }
      `}</style>
    </div>
  );
};
