import React from 'react';
import { Globe, Copy, Check, ArrowLeft } from 'lucide-react';

interface PublicProfileHeaderProps {
  slug: string;
  onCopyLink: () => void;
  copied: boolean;
  onExitPublicView: () => void;
}

export const PublicProfileHeader: React.FC<PublicProfileHeaderProps> = ({
  slug,
  onCopyLink,
  copied,
  onExitPublicView
}) => {
  return (
    <div className="public-banner-card">
      <div className="public-banner-left">
        <div className="public-globe-icon">
          <Globe size={18} className="text-royal" />
        </div>
        <div>
          <div className="public-mode-title">
            Public Live Candidate View
          </div>
          <div className="public-url-pill">
            https://novabridge.dev/student/{slug}
          </div>
        </div>
      </div>

      <div className="public-banner-right">
        <button onClick={onCopyLink} className="btn btn-primary btn-sm">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'URL Copied!' : 'Copy Shareable Link'}</span>
        </button>

        <button onClick={onExitPublicView} className="btn btn-secondary btn-sm">
          <ArrowLeft size={14} />
          <span>Return to Workspace</span>
        </button>
      </div>

      <style>{`
        .public-banner-card {
          margin-top: 20px;
          background-color: var(--royal-50);
          border: 1px solid var(--royal-100);
          border-radius: var(--radius-lg);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .public-banner-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .public-globe-icon {
          width: 36px;
          height: 36px;
          background-color: #FFFFFF;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        .public-mode-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--navy-900);
        }
        .public-url-pill {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--royal-700);
          background: #FFFFFF;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--royal-100);
          margin-top: 2px;
        }
        .public-banner-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};
