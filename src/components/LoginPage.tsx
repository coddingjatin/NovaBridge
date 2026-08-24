import React, { useState } from 'react';
import { UserAuthSession } from '../types/profile';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Code2, Trophy } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (session: UserAuthSession) => void;
  onNavigateToSignUp: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToSignUp
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        isAuthenticated: true,
        user: {
          name: 'Jatin Vishwakarma',
          email: email || 'jatin.vishwakarma@iitb.ac.in',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          provider: 'google'
        }
      });
    }, 600);
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        isAuthenticated: true,
        user: {
          name: 'Jatin Vishwakarma',
          email: email || 'jatin.vishwakarma@iitb.ac.in',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          provider: 'email'
        }
      });
    }, 500);
  };

  return (
    <div className="auth-hero-container">
      <div className="auth-split-wrapper">
        {/* Left Feature Showcase Banner */}
        <div className="auth-feature-panel">
          <div className="brand-badge-top">
            <div className="logo-icon-orange">NB</div>
            <span className="brand-text">NovaBridge</span>
          </div>

          <div className="feature-headline-group">
            <h1 className="feature-main-title">Unforgeable Developer Verification & Analytics</h1>
            <p className="feature-sub-title">Connect your GitHub, LeetCode, and Codeforces profiles to showcase verified coding skills to top recruiters.</p>
          </div>

          <div className="feature-perks-list">
            <div className="perk-item">
              <ShieldCheck size={20} className="perk-icon" />
              <div>
                <div className="perk-title">Cryptographically Verified Proofs</div>
                <div className="perk-desc">Live REST sync directly from competitive coding platforms.</div>
              </div>
            </div>
            <div className="perk-item">
              <Code2 size={20} className="perk-icon" />
              <div>
                <div className="perk-title">Interactive Project Case Studies</div>
                <div className="perk-desc">Showcase metrics, architecture diagrams, and GitHub code.</div>
              </div>
            </div>
            <div className="perk-item">
              <Trophy size={20} className="perk-icon" />
              <div>
                <div className="perk-title">Leaderboards & Recruiter Scorecards</div>
                <div className="perk-desc">Get matched directly with top tier tech companies.</div>
              </div>
            </div>
          </div>

          <div className="auth-testimonial-box">
            <div className="testimonial-text">"NovaBridge helped me showcase my 1980 Codeforces rating directly to engineering leads. Got hired at Uber in 2 weeks!"</div>
            <div className="testimonial-author">— Jatin Vishwakarma, IIT Bombay ('26)</div>
          </div>
        </div>

        {/* Right Form Box */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <div className="form-header-text">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Sign in to manage your NovaBridge profile</p>
            </div>

            {/* Google OAuth Button */}
            <button 
              type="button" 
              onClick={handleGoogleSignIn} 
              disabled={loading}
              className="btn-google-oauth"
            >
              <svg className="google-svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.14C3.25 21.27 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.14z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.73 1.27 6.59l4.01 3.14c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="auth-divider-line">
              <span>or sign in with email</span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="auth-form-elements">
              <div className="input-group-field">
                <label className="field-label">Email Address</label>
                <div className="input-inner-wrap">
                  <Mail size={16} className="input-icon-left" />
                  <input 
                    type="email" 
                    placeholder="jatin.vishwakarma@iitb.ac.in" 
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
                  <a href="#" onClick={e => { e.preventDefault(); alert('Password reset link sent!'); }} className="forgot-pass-link">Forgot?</a>
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

              <button type="submit" disabled={loading} className="btn-primary-auth">
                <span>{loading ? 'Signing In...' : 'Sign In to Dashboard'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="auth-footer-prompt">
              Don't have a NovaBridge account?{' '}
              <button type="button" onClick={onNavigateToSignUp} className="link-switch-auth">
                Create Free Account
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

        /* Left Panel */
        .auth-feature-panel {
          background: linear-gradient(145deg, #0F172A 0%, #1E293B 100%);
          color: #FFFFFF;
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .brand-badge-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .brand-text {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: #FFFFFF;
        }
        .feature-headline-group {
          margin-top: 30px;
        }
        .feature-main-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.25;
          color: #FFFFFF;
        }
        .feature-sub-title {
          font-size: 0.92rem;
          color: #94A3B8;
          margin-top: 12px;
          line-height: 1.5;
        }

        .feature-perks-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 30px;
        }
        .perk-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .perk-icon {
          color: var(--codolio-orange);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .perk-title {
          font-weight: 700;
          font-size: 0.92rem;
          color: #F8FAFC;
        }
        .perk-desc {
          font-size: 0.8125rem;
          color: #94A3B8;
          margin-top: 2px;
        }

        .auth-testimonial-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 16px;
          margin-top: 36px;
        }
        .testimonial-text {
          font-size: 0.82rem;
          font-style: italic;
          color: #E2E8F0;
          line-height: 1.4;
        }
        .testimonial-author {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--codolio-orange);
          margin-top: 8px;
        }

        /* Right Form Panel */
        .auth-form-panel {
          padding: 44px 40px;
          display: flex;
          align-items: center;
        }
        .auth-form-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-header-text { text-align: left; }
        .form-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .form-subtitle {
          font-size: 0.85rem;
          color: var(--slate-500);
          margin-top: 4px;
        }

        .btn-google-oauth {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #FFFFFF;
          border: 1.5px solid var(--slate-200);
          border-radius: 12px;
          padding: 11px 16px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--navy-900);
          box-shadow: 0 2px 4px rgba(0,0,0,0.03);
          transition: all 0.15s ease;
        }
        .btn-google-oauth:hover {
          background: var(--slate-50);
          border-color: var(--slate-300);
          transform: translateY(-1px);
        }
        .google-svg { width: 18px; height: 18px; }

        .auth-divider-line {
          display: flex;
          align-items: center;
          text-align: center;
          color: var(--slate-400);
          font-size: 0.78rem;
        }
        .auth-divider-line::before, .auth-divider-line::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--slate-200);
        }
        .auth-divider-line span { padding: 0 12px; }

        .auth-form-elements {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .input-group-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .label-with-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .field-label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .forgot-pass-link {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--codolio-orange);
          text-decoration: none;
        }
        .input-inner-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon-left {
          position: absolute;
          left: 14px;
          color: var(--slate-400);
        }
        .styled-auth-input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.88rem;
          color: var(--navy-900);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .styled-auth-input:focus {
          border-color: var(--codolio-orange);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
        }

        .btn-primary-auth {
          width: 100%;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          padding: 12px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .btn-primary-auth:hover {
          background: var(--codolio-orange-hover);
          transform: translateY(-1px);
        }

        .auth-footer-prompt {
          font-size: 0.82rem;
          color: var(--slate-500);
          text-align: center;
        }
        .link-switch-auth {
          font-weight: 800;
          color: var(--codolio-orange);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .link-switch-auth:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .auth-split-wrapper { grid-template-columns: 1fr; }
          .auth-feature-panel { display: none; }
        }
      `}</style>
    </div>
  );
};
