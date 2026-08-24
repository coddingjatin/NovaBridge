import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Building2, Search, KeyRound, CheckCircle2 } from 'lucide-react';
import { authenticateUser, DEMO_CREDENTIALS, AuthSession } from '../../services/authService';

interface RecruiterLoginPageProps {
  onLoginSuccess: (session: AuthSession) => void;
  onNavigate: (route: string) => void;
}

export const RecruiterLoginPage: React.FC<RecruiterLoginPageProps> = ({
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
      const res = authenticateUser(email, password, 'recruiter');
      setLoading(false);
      if (res.success && res.session) {
        onLoginSuccess(res.session);
        onNavigate('/recruiter/dashboard');
      } else {
        setError(res.message || 'Invalid recruiter credentials.');
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setEmail(DEMO_CREDENTIALS.recruiter.email);
    setPassword(DEMO_CREDENTIALS.recruiter.password);
    const res = authenticateUser(DEMO_CREDENTIALS.recruiter.email, DEMO_CREDENTIALS.recruiter.password, 'recruiter');
    if (res.success && res.session) {
      onLoginSuccess(res.session);
      onNavigate('/recruiter/dashboard');
    }
  };

  return (
    <div className="auth-hero-container">
      <div className="auth-split-wrapper">
        {/* Left Feature Showcase Banner */}
        <div className="auth-feature-panel recruiter-panel-bg">
          <div className="brand-badge-top">
            <div className="logo-icon-orange">NB</div>
            <span className="brand-text">NovaBridge Recruiter Portal</span>
          </div>

          <div className="feature-headline-group">
            <h1 className="feature-main-title">Find Skilled Talent Based On What They Actually Build</h1>
            <p className="feature-sub-title">Cut through unverified resume noise. Evaluate candidates based on real GitHub repos, Codeforces ratings, and peer-reviewed project case studies.</p>
          </div>

          <div className="feature-perks-list">
            <div className="perk-item">
              <Search size={20} className="perk-icon-blue" />
              <div>
                <div className="perk-title">Multi-Parametric Candidate Discovery</div>
                <div className="perk-desc">Filter candidates by verified skills, Codeforces rating, and college.</div>
              </div>
            </div>
            <div className="perk-item">
              <Building2 size={20} className="perk-icon-blue" />
              <div>
                <div className="perk-title">Direct Outreach & Interview Invites</div>
                <div className="perk-desc">Send targeted calendar invitations to top 1% candidates instantly.</div>
              </div>
            </div>
          </div>

          <div className="demo-credentials-card">
            <div className="demo-card-header">
              <KeyRound size={15} style={{ color: '#3B82F6' }} />
              <span>Demo Recruiter Login Credentials</span>
            </div>
            <div className="demo-credential-row">
              <span>Email:</span> <code>recruiter@novabridge.demo</code>
            </div>
            <div className="demo-credential-row">
              <span>Password:</span> <code>recruiter123</code>
            </div>
            <button type="button" onClick={handleQuickDemoLogin} className="btn-quick-demo-blue">
              Fill & Login as Recruiter
            </button>
          </div>
        </div>

        {/* Right Form Box */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <div className="form-header-text">
              <h2 className="form-title">Find the right talent with NovaBridge</h2>
              <p className="form-subtitle">Discover students through skills, projects and proven achievements.</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <span>{error}</span>
              </div>
            )}

            {/* Recruiter Email Sign In Form */}
            <form onSubmit={handleSignIn} className="auth-form-elements">
              <div className="input-group-field">
                <label className="field-label">Recruiter / Enterprise Email</label>
                <div className="input-inner-wrap">
                  <Mail size={16} className="input-icon-left" />
                  <input 
                    type="email" 
                    placeholder="recruiter@novabridge.demo" 
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
                  <a href="#" onClick={e => { e.preventDefault(); alert('Password reset link sent to recruiter email.'); }} className="forgot-pass-link-blue">Forgot Password</a>
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

              <button type="submit" disabled={loading} className="btn-primary-auth-blue">
                <span>{loading ? 'Signing In...' : 'Sign In as Recruiter'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="auth-action-links">
              <button type="button" onClick={() => onNavigate('/recruiter/signup')} className="btn-secondary-link">
                Create Recruiter Account
              </button>
            </div>

            <div className="auth-footer-prompt">
              Are you a student?{' '}
              <button type="button" onClick={() => onNavigate('/student/login')} className="link-switch-auth-blue">
                Sign in here
              </button>
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
        .recruiter-panel-bg {
          background: linear-gradient(145deg, #0B1329 0%, #172554 100%);
        }

        .brand-badge-top { display: flex; align-items: center; gap: 10px; }
        .brand-text { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; color: #FFFFFF; }
        .feature-headline-group { margin-top: 24px; }
        .feature-main-title { font-family: var(--font-heading); font-size: 1.75rem; font-weight: 800; line-height: 1.25; color: #FFFFFF; }
        .feature-sub-title { font-size: 0.88rem; color: #94A3B8; margin-top: 12px; line-height: 1.5; }

        .feature-perks-list { display: flex; flex-direction: column; gap: 18px; margin-top: 24px; }
        .perk-item { display: flex; align-items: flex-start; gap: 14px; }
        .perk-icon-blue { color: #60A5FA; flex-shrink: 0; margin-top: 2px; }
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
          background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 6px; color: #60A5FA; font-weight: 700;
        }
        .btn-quick-demo-blue {
          margin-top: 10px; padding: 8px 12px; border-radius: 8px;
          background: #2563EB; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; border: none; cursor: pointer;
        }
        .btn-quick-demo-blue:hover { background: #1D4ED8; }

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
        .forgot-pass-link-blue { font-size: 0.78rem; font-weight: 700; color: #2563EB; text-decoration: none; }
        .input-inner-wrap { position: relative; display: flex; align-items: center; }
        .input-icon-left { position: absolute; left: 14px; color: var(--slate-400); }
        .styled-auth-input {
          width: 100%; padding: 11px 14px 11px 40px; border: 1.5px solid var(--slate-200);
          border-radius: 10px; font-size: 0.88rem; color: var(--navy-900); outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .styled-auth-input:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15); }

        .btn-primary-auth-blue {
          width: 100%; background: #2563EB; color: #FFFFFF;
          font-family: var(--font-heading); font-size: 0.92rem; font-weight: 800;
          padding: 12px 18px; border-radius: 12px; display: flex; align-items: center;
          justify-content: center; gap: 8px; margin-top: 8px; border: none; cursor: pointer;
          transition: background 0.15s ease;
        }
        .btn-primary-auth-blue:hover { background: #1D4ED8; }

        .auth-action-links { display: flex; justify-content: center; margin-top: -4px; }
        .btn-secondary-link {
          background: none; border: none; font-size: 0.82rem; font-weight: 700; color: var(--navy-900); cursor: pointer;
        }
        .btn-secondary-link:hover { text-decoration: underline; color: #2563EB; }

        .auth-footer-prompt { font-size: 0.82rem; color: var(--slate-500); text-align: center; }
        .link-switch-auth-blue { font-weight: 800; color: #2563EB; background: none; border: none; padding: 0; cursor: pointer; }
        .link-switch-auth-blue:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .auth-split-wrapper { grid-template-columns: 1fr; }
          .auth-feature-panel { display: none; }
        }
      `}</style>
    </div>
  );
};
