import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, KeyRound, Server } from 'lucide-react';
import { authenticateUser, DEMO_CREDENTIALS, AuthSession } from '../../services/authService';

interface AdminLoginPageProps {
  onLoginSuccess: (session: AuthSession) => void;
  onNavigate: (route: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = authenticateUser(email, password, 'admin');
      setLoading(false);
      if (res.success && res.session) {
        onLoginSuccess(res.session);
        onNavigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid admin credentials.');
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setEmail(DEMO_CREDENTIALS.admin.email);
    setPassword(DEMO_CREDENTIALS.admin.password);
    const res = authenticateUser(DEMO_CREDENTIALS.admin.email, DEMO_CREDENTIALS.admin.password, 'admin');
    if (res.success && res.session) {
      onLoginSuccess(res.session);
      onNavigate('/admin/dashboard');
    }
  };

  return (
    <div className="auth-hero-container">
      <div className="auth-split-wrapper">
        {/* Left Feature Showcase Banner */}
        <div className="auth-feature-panel admin-panel-bg">
          <div className="brand-badge-top">
            <div className="logo-icon-navy">NB</div>
            <span className="brand-text">NovaBridge Systems Administration</span>
          </div>

          <div className="feature-headline-group">
            <h1 className="feature-main-title">Platform Verification & Operations Portal</h1>
            <p className="feature-sub-title">Review cryptographic proof submissions, manage institutional recruiters, audit user accounts, and oversee platform activity.</p>
          </div>

          <div className="feature-perks-list">
            <div className="perk-item">
              <ShieldCheck size={20} className="perk-icon-emerald" />
              <div>
                <div className="perk-title">Verification Operations Queue</div>
                <div className="perk-desc">Approve or reject candidate proof submissions and certifications.</div>
              </div>
            </div>
            <div className="perk-item">
              <Server size={20} className="perk-icon-emerald" />
              <div>
                <div className="perk-title">System Metrics & User Management</div>
                <div className="perk-desc">Monitor student and recruiter metrics with real-time audit logs.</div>
              </div>
            </div>
          </div>

          <div className="demo-credentials-card">
            <div className="demo-card-header">
              <KeyRound size={15} style={{ color: '#10B981' }} />
              <span>Demo Admin Login Credentials</span>
            </div>
            <div className="demo-credential-row">
              <span>Admin Email:</span> <code>admin@novabridge.demo</code>
            </div>
            <div className="demo-credential-row">
              <span>Password:</span> <code>admin123</code>
            </div>
            <button type="button" onClick={handleQuickDemoLogin} className="btn-quick-demo-emerald">
              Fill & Login as Admin
            </button>
          </div>
        </div>

        {/* Right Form Box */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <div className="form-header-text">
              <h2 className="form-title">NovaBridge Administration</h2>
              <p className="form-subtitle">Manage users, opportunities, verification and platform activity.</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <span>{error}</span>
              </div>
            )}

            {/* Admin Email Sign In Form */}
            <form onSubmit={handleSignIn} className="auth-form-elements">
              <div className="input-group-field">
                <label className="field-label">Admin Email Address</label>
                <div className="input-inner-wrap">
                  <Mail size={16} className="input-icon-left" />
                  <input 
                    type="email" 
                    placeholder="admin@novabridge.demo" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    className="styled-auth-input"
                  />
                </div>
              </div>

              <div className="input-group-field">
                <div className="label-with-link">
                  <label className="field-label">Password</label>
                </div>
                <div className="input-inner-wrap">
                  <Lock size={16} className="input-icon-left" />
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    className="styled-auth-input"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary-auth-navy">
                <span>{loading ? 'Authenticating System...' : 'Sign In to Admin Console'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="admin-security-note">
              <span>🔒 Restricted System. Authorized administrator access only. Public registration is disabled.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-hero-container {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
        }
        .auth-split-wrapper {
          display: grid;
          grid-template-columns: 1fr 480px;
          max-width: 1040px;
          width: 100%;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid var(--slate-200);
          box-shadow: 0 20px 50px rgba(15,23,42,0.08);
          overflow: hidden;
        }

        .auth-feature-panel {
          background: linear-gradient(145deg, #0F172A 0%, #1E293B 100%);
          color: #FFFFFF;
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .admin-panel-bg {
          background: linear-gradient(145deg, #022C22 0%, #0F172A 100%);
        }
        .logo-icon-navy {
          width: 32px; height: 32px; border-radius: 8px; background: #059669; color: #FFF;
          display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;
        }

        .brand-badge-top { display: flex; align-items: center; gap: 10px; }
        .brand-text { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; color: #FFFFFF; }
        .feature-headline-group { margin-top: 24px; }
        .feature-main-title { font-family: var(--font-heading); font-size: 1.75rem; font-weight: 800; line-height: 1.25; color: #FFFFFF; }
        .feature-sub-title { font-size: 0.88rem; color: #94A3B8; margin-top: 12px; line-height: 1.5; }

        .feature-perks-list { display: flex; flex-direction: column; gap: 18px; margin-top: 24px; }
        .perk-item { display: flex; align-items: flex-start; gap: 14px; }
        .perk-icon-emerald { color: #34D399; flex-shrink: 0; margin-top: 2px; }
        .perk-title { font-weight: 700; font-size: 0.9rem; color: #F8FAFC; }
        .perk-desc { font-size: 0.8125rem; color: #94A3B8; margin-top: 2px; }

        .demo-credentials-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 14px;
          padding: 16px;
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .demo-card-header {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 800; color: #F8FAFC; margin-bottom: 4px;
        }
        .demo-credential-row {
          font-size: 0.78rem; color: #CBD5E1; display: flex; justify-content: space-between; align-items: center;
        }
        .demo-credential-row code {
          background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 6px; color: #34D399; font-weight: 700;
        }
        .btn-quick-demo-emerald {
          margin-top: 10px; padding: 8px 12px; border-radius: 8px;
          background: #059669; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; border: none; cursor: pointer;
        }
        .btn-quick-demo-emerald:hover { background: #047857; }

        .auth-form-panel { padding: 44px 40px; display: flex; align-items: center; }
        .auth-form-card { width: 100%; display: flex; flex-direction: column; gap: 20px; }
        .form-header-text { text-align: left; }
        .form-title { font-family: var(--font-heading); font-size: 1.55rem; font-weight: 800; color: var(--navy-900); }
        .form-subtitle { font-size: 0.85rem; color: var(--slate-500); margin-top: 4px; }

        .auth-error-banner {
          background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B;
          padding: 10px 14px; border-radius: 10px; font-size: 0.8125rem; font-weight: 700;
        }

        .auth-form-elements { display: flex; flex-direction: column; gap: 16px; }
        .input-group-field { display: flex; flex-direction: column; gap: 6px; }
        .label-with-link { display: flex; justify-content: space-between; align-items: center; }
        .field-label { font-size: 0.8125rem; font-weight: 700; color: var(--navy-900); }
        .input-inner-wrap { position: relative; display: flex; align-items: center; }
        .input-icon-left { position: absolute; left: 14px; color: var(--slate-400); }
        .styled-auth-input {
          width: 100%; padding: 11px 14px 11px 40px; border: 1.5px solid var(--slate-200);
          border-radius: 10px; font-size: 0.88rem; color: var(--navy-900); outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .styled-auth-input:focus { border-color: #059669; box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15); }

        .btn-primary-auth-navy {
          width: 100%; background: #0F172A; color: #FFFFFF;
          font-family: var(--font-heading); font-size: 0.92rem; font-weight: 800;
          padding: 12px 18px; border-radius: 12px; display: flex; align-items: center;
          justify-content: center; gap: 8px; margin-top: 8px; border: none; cursor: pointer;
          transition: background 0.15s ease;
        }
        .btn-primary-auth-navy:hover { background: #1E293B; }

        .admin-security-note {
          margin-top: 10px; text-align: center; font-size: 0.78rem; color: var(--slate-500);
          background: var(--slate-100); padding: 10px; border-radius: 10px; border: 1px solid var(--slate-200);
        }

        @media (max-width: 900px) {
          .auth-split-wrapper { grid-template-columns: 1fr; }
          .auth-feature-panel { display: none; }
        }
      `}</style>
    </div>
  );
};
