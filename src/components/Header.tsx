import React, { useState } from 'react';
import { UserAuthSession } from '../types/profile';
import { 
  Sun, 
  Search, 
  Share2, 
  RefreshCw, 
  Edit3, 
  Check, 
  User, 
  LogOut, 
  LogIn, 
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'portfolio' | 'contests' | 'certificates' | 'courses' | 'login' | 'signup' | 'recruiter';
  setCurrentPage: (page: 'home' | 'portfolio' | 'contests' | 'certificates' | 'courses' | 'login' | 'signup' | 'recruiter') => void;
  authSession: UserAuthSession;
  onOpenEdit: () => void;
  onOpenUpdateLinks: () => void;
  onSyncAPIs: () => void;
  isSyncing: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  authSession,
  onOpenEdit,
  onOpenUpdateLinks,
  onSyncAPIs,
  isSyncing,
  onLogout
}) => {
  const [copied, setCopied] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="top-global-header">
      <div className="header-inner-flex">
        {/* Left: Quick Kit & Search */}
        <div className="header-left-group">
          <button 
            onClick={() => setCurrentPage('contests')} 
            className="btn-company-kit-banner"
          >
            <Sun size={15} className="sun-icon-spin" />
            <span>Company Wise Kit</span>
            <span className="arrow-chip">&gt;</span>
          </button>

          <div className="header-search-bar">
            <Search size={14} className="search-icon-muted" />
            <input 
              type="text" 
              placeholder="Search problems, topics, sheets..." 
              className="header-search-input"
            />
          </div>
        </div>

        {/* Right: Quick Action Buttons & Auth */}
        <div className="header-right-group">
          <button onClick={onSyncAPIs} disabled={isSyncing} className="btn-header-action" title="Sync live API data">
            <RefreshCw size={13} className={isSyncing ? 'spin-icon' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync APIs'}</span>
          </button>

          <button onClick={handleShare} className="btn-header-action" title="Share profile link">
            {copied ? <Check size={13} style={{ color: '#10B981' }} /> : <Share2 size={13} />}
            <span>{copied ? 'Copied Link' : 'Share Profile'}</span>
          </button>

          {authSession.isAuthenticated && authSession.user ? (
            <>
              <button onClick={onOpenEdit} className="btn-header-primary">
                <Edit3 size={13} />
                <span>Edit Profile</span>
              </button>

              {/* User Dropdown */}
              <div className="user-profile-menu-container">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)} 
                  className="user-menu-avatar-btn"
                >
                  <img src={authSession.user.avatarUrl} alt={authSession.user.name} className="header-user-avatar" />
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="header-user-dropdown-menu" onClick={e => e.stopPropagation()}>
                    <div className="user-dropdown-info">
                      <div className="user-menu-name">{authSession.user.name}</div>
                      <div className="user-menu-email">{authSession.user.email}</div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button onClick={() => { setCurrentPage('portfolio'); setUserDropdownOpen(false); }} className="dropdown-item-btn">
                      <User size={14} /> My Profile
                    </button>
                    <button onClick={() => { onOpenUpdateLinks(); setUserDropdownOpen(false); }} className="dropdown-item-btn">
                      <ExternalLink size={14} /> Update Profile Links
                    </button>
                    <div className="dropdown-divider"></div>
                    <button onClick={() => { onLogout(); setUserDropdownOpen(false); }} className="dropdown-item-btn text-danger">
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button onClick={() => setCurrentPage('login')} className="btn-header-navy">
              <LogIn size={13} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .top-global-header {
          background: #FFFFFF;
          border-bottom: 1px solid var(--slate-200);
          padding: 10px 24px;
          position: sticky;
          top: 0;
          z-index: 800;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
        }
        .header-inner-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .header-left-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
        }
        .btn-company-kit-banner {
          display: flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%);
          border: 1px solid #FED7AA;
          border-radius: 10px;
          padding: 6px 12px;
          font-size: 0.8125rem;
          font-weight: 800;
          color: #C2410C;
          white-space: nowrap;
          cursor: pointer;
        }
        .btn-company-kit-banner:hover {
          background: #FFEDD5;
        }
        .sun-icon-spin {
          color: #F97316;
        }
        .arrow-chip {
          font-weight: 900;
          color: #EA580C;
        }

        .header-search-bar {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 320px;
          width: 100%;
        }
        .search-icon-muted {
          position: absolute;
          left: 12px;
          color: var(--slate-400);
        }
        .header-search-input {
          width: 100%;
          padding: 7px 12px 7px 34px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.8125rem;
          color: var(--navy-900);
          outline: none;
          background: var(--slate-50);
          transition: border-color 0.15s ease;
        }
        .header-search-input:focus {
          border-color: var(--codolio-orange);
          background: #FFFFFF;
        }

        .header-right-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn-header-action {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
        }
        .btn-header-action:hover {
          background: var(--slate-100);
          color: var(--navy-900);
        }

        .btn-header-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 8px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .btn-header-primary:hover {
          background: var(--codolio-orange-hover);
        }

        .btn-header-navy {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 8px;
          background: var(--navy-900);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        /* User Dropdown */
        .user-profile-menu-container {
          position: relative;
        }
        .user-menu-avatar-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          padding: 2px;
          cursor: pointer;
        }
        .header-user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid var(--slate-200);
        }

        .header-user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 220px;
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(15,23,42,0.12);
          padding: 8px;
          display: flex;
          flex-direction: column;
          z-index: 999;
        }
        .user-dropdown-info {
          padding: 8px;
        }
        .user-menu-name {
          font-weight: 800;
          font-size: 0.85rem;
          color: var(--navy-900);
        }
        .user-menu-email {
          font-size: 0.72rem;
          color: var(--slate-500);
        }
        .dropdown-divider {
          height: 1px;
          background: var(--slate-100);
          margin: 4px 0;
        }
        .dropdown-item-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
          text-align: left;
          cursor: pointer;
        }
        .dropdown-item-btn:hover {
          background: var(--slate-100);
          color: var(--navy-900);
        }
        .text-danger { color: #EF4444 !important; }

        @media (max-width: 768px) {
          .header-search-bar { display: none; }
        }
      `}</style>
    </header>
  );
};
