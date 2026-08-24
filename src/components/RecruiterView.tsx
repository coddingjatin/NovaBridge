import React, { useState } from 'react';
import { UserProfile } from '../types/profile';
import { 
  Briefcase, 
  CheckCircle2, 
  Star, 
  Bookmark, 
  Mail, 
  Calendar, 
  Zap, 
  ShieldCheck, 
  Code2, 
  Trophy, 
  MapPin, 
  Building2, 
  GraduationCap,
  X,
  Send,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Award
} from 'lucide-react';

interface RecruiterViewProps {
  profile: UserProfile;
}

export const RecruiterView: React.FC<RecruiterViewProps> = ({ profile }) => {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Modals state
  const [contactOpen, setContactOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact form state
  const [contactSubject, setContactSubject] = useState(`Opportunity for ${profile.fullName} | Senior Systems & Full-Stack Role`);
  const [contactBody, setContactBody] = useState(`Hi ${profile.fullName},\n\nWe were highly impressed by your verified achievements at ${profile.institution} and your Codeforces / GitHub engineering portfolio. We would love to discuss a High-Throughput Systems role on our engineering team.\n\nBest regards,\nTalent Acquisition Lead`);

  // Invite form state
  const [inviteRole, setInviteRole] = useState('Senior Distributed Systems Engineer');
  const [inviteType, setInviteType] = useState('System Design & Live Coding Round');
  const [inviteDate, setInviteDate] = useState('2026-08-25');
  const [inviteTime, setInviteTime] = useState('14:00');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    showToast(`Email copied: ${profile.email}`);
  };

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactOpen(false);
    showToast(`Direct message sent to ${profile.fullName} (${profile.email})`);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteOpen(false);
    showToast(`Interview invite sent for ${inviteDate} at ${inviteTime}! Calendar invite dispatched.`);
  };

  return (
    <div className="recruiter-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={16} style={{ color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Recruiter Action Header Bar */}
      <div className="color-card color-card-navy" style={{ marginBottom: '20px' }}>
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner recruiter-action-bar-inner">
          <div className="recruiter-match-badge">
            <div className="match-score-ring">98%</div>
            <div>
              <div className="match-score-title">Exceptional Candidate Match</div>
              <div className="match-score-sub">Verified Track: Senior Backend & Systems Specialist</div>
            </div>
          </div>

          <div className="recruiter-buttons">
            <button
              onClick={() => {
                setIsShortlisted(!isShortlisted);
                showToast(isShortlisted ? 'Candidate removed from Shortlist' : 'Candidate added to Shortlist!');
              }}
              className={`btn-recruiter-action ${isShortlisted ? 'btn-active-shortlist' : ''}`}
            >
              <Star size={15} fill={isShortlisted ? '#F59E0B' : 'none'} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}</span>
            </button>

            <button
              onClick={() => {
                setIsSaved(!isSaved);
                showToast(isSaved ? 'Candidate unsaved' : 'Candidate saved to Pipeline!');
              }}
              className={`btn-recruiter-action ${isSaved ? 'btn-active-saved' : ''}`}
            >
              <Bookmark size={15} fill={isSaved ? '#3B82F6' : 'none'} />
              <span>{isSaved ? 'Saved to Pipeline' : 'Save Candidate'}</span>
            </button>

            <button onClick={() => setContactOpen(true)} className="btn-recruiter-primary">
              <Mail size={15} />
              <span>Contact Candidate</span>
            </button>

            <button onClick={() => setInviteOpen(true)} className="btn-recruiter-invite">
              <Calendar size={15} />
              <span>Invite for Interview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="recruiter-main-grid">
        {/* Left Column: Candidate Snapshot Card */}
        <div className="color-card color-card-royal">
          <div className="color-card-ribbon"></div>
          <div className="color-card-inner">
            <div className="candidate-profile-top">
              <img src={profile.photoUrl} alt={profile.fullName} className="candidate-avatar-img" />
              <div className="candidate-meta">
                <h3 className="candidate-name">{profile.fullName}</h3>
                <div className="candidate-headline">{profile.headline}</div>
                <div className="candidate-sub-pills">
                  <span><MapPin size={13} /> {profile.location}</span>
                  <span><GraduationCap size={13} /> {profile.institution}</span>
                </div>
              </div>
            </div>

            <div className="candidate-quick-stats-grid">
              <div className="stat-box-item">
                <span className="stat-label">Codeforces</span>
                <span className="stat-val text-royal">{profile.codeforcesStats.rating} ({profile.codeforcesStats.rank})</span>
              </div>
              <div className="stat-box-item">
                <span className="stat-label">LeetCode</span>
                <span className="stat-val text-amber">{profile.leetcodeStats.totalSolved} Solved</span>
              </div>
              <div className="stat-box-item">
                <span className="stat-label">GitHub Stars</span>
                <span className="stat-val text-slate">{profile.githubStats.stars} Stars</span>
              </div>
              <div className="stat-box-item">
                <span className="stat-label">Academic Grade</span>
                <span className="stat-val text-emerald">{profile.education[0]?.grade || '9.4 CGPA'}</span>
              </div>
            </div>

            <div className="contact-info-row-box">
              <div className="info-email-text">
                <Mail size={14} className="text-slate-400" />
                <span>{profile.email}</span>
              </div>
              <button onClick={handleCopyEmail} className="btn-copy-email">
                {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <button onClick={() => setMetricsOpen(true)} className="btn-full-metrics">
              <Eye size={15} />
              <span>View Verified Recruiter Scorecard</span>
            </button>
          </div>
        </div>

        {/* Right Column: Verification Signals */}
        <div className="color-card color-card-emerald">
          <div className="color-card-ribbon"></div>
          <div className="color-card-inner">
            <h3 className="recruiter-sec-title">
              <ShieldCheck size={18} style={{ color: '#059669' }} /> Verified Engineering Signals
            </h3>

            <div className="signals-list">
              <div className="signal-row">
                <div className="signal-badge-icon"><Trophy size={16} style={{ color: '#D97706' }} /></div>
                <div className="signal-body">
                  <div className="signal-title">Codeforces Candidate Master (Rating: 1891)</div>
                  <div className="signal-desc">Top 2.1% globally in algorithmic problem solving and time-constrained competitive coding.</div>
                </div>
                <span className="signal-verified-pill"><ShieldCheck size={12} /> Verified</span>
              </div>

              <div className="signal-row">
                <div className="signal-badge-icon"><Code2 size={16} style={{ color: '#2563EB' }} /></div>
                <div className="signal-body">
                  <div className="signal-title">High-Throughput Systems Experience</div>
                  <div className="signal-desc">Built HyperStream gRPC engine handling 100,000 req/sec at sub-5ms p99 latency.</div>
                </div>
                <span className="signal-verified-pill"><ShieldCheck size={12} /> Verified</span>
              </div>

              <div className="signal-row">
                <div className="signal-badge-icon"><Building2 size={16} style={{ color: '#7C3AED' }} /></div>
                <div className="signal-body">
                  <div className="signal-title">Uber Core Infrastructure Internship</div>
                  <div className="signal-desc">Built distributed cache invalidation daemon in Go reducing stale DB queries by 82%.</div>
                </div>
                <span className="signal-verified-pill"><ShieldCheck size={12} /> Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Contact Candidate */}
      {contactOpen && (
        <div className="modal-overlay-bg" onClick={() => setContactOpen(false)}>
          <div className="recruiter-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-top-header">
              <div>
                <h3 className="modal-h3">Contact {profile.fullName}</h3>
                <p className="modal-subtext">Send a direct opportunity outreach to {profile.email}</p>
              </div>
              <button onClick={() => setContactOpen(false)} className="modal-close-btn"><X size={18} /></button>
            </div>

            <form onSubmit={handleSendContact} className="modal-form-body">
              <div className="form-group-item">
                <label className="modal-label">Email Subject</label>
                <input 
                  type="text" 
                  value={contactSubject} 
                  onChange={e => setContactSubject(e.target.value)} 
                  required 
                  className="modal-text-input" 
                />
              </div>

              <div className="form-group-item">
                <label className="modal-label">Outreach Message Body</label>
                <textarea 
                  rows={6} 
                  value={contactBody} 
                  onChange={e => setContactBody(e.target.value)} 
                  required 
                  className="modal-textarea" 
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" onClick={() => setContactOpen(false)} className="btn-modal-cancel">Cancel</button>
                <button type="submit" className="btn-modal-submit-orange">
                  <Send size={15} /> Send Direct Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Invite for Interview */}
      {inviteOpen && (
        <div className="modal-overlay-bg" onClick={() => setInviteOpen(false)}>
          <div className="recruiter-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-top-header">
              <div>
                <h3 className="modal-h3">Schedule Interview Invitation</h3>
                <p className="modal-subtext">Dispatch a calendar invitation and technical assessment link</p>
              </div>
              <button onClick={() => setInviteOpen(false)} className="modal-close-btn"><X size={18} /></button>
            </div>

            <form onSubmit={handleSendInvite} className="modal-form-body">
              <div className="form-group-item">
                <label className="modal-label">Position / Role Track</label>
                <select 
                  value={inviteRole} 
                  onChange={e => setInviteRole(e.target.value)} 
                  className="modal-select-input"
                >
                  <option>Senior Distributed Systems Engineer</option>
                  <option>Full-Stack Engineer (React & Go)</option>
                  <option>AI / Cloud Systems Engineer</option>
                  <option>Software Engineering Intern ('26)</option>
                </select>
              </div>

              <div className="form-group-item">
                <label className="modal-label">Interview Type</label>
                <select 
                  value={inviteType} 
                  onChange={e => setInviteType(e.target.value)} 
                  className="modal-select-input"
                >
                  <option>System Design & Live Coding Round (60 min)</option>
                  <option>Engineering Manager & Architecture Chat (45 min)</option>
                  <option>Take-Home Systems Case Study Review</option>
                </select>
              </div>

              <div className="form-grid-2">
                <div className="form-group-item">
                  <label className="modal-label">Proposed Date</label>
                  <input 
                    type="date" 
                    value={inviteDate} 
                    onChange={e => setInviteDate(e.target.value)} 
                    required 
                    className="modal-text-input" 
                  />
                </div>
                <div className="form-group-item">
                  <label className="modal-label">Proposed Time</label>
                  <input 
                    type="time" 
                    value={inviteTime} 
                    onChange={e => setInviteTime(e.target.value)} 
                    required 
                    className="modal-text-input" 
                  />
                </div>
              </div>

              <div className="modal-actions-row">
                <button type="button" onClick={() => setInviteOpen(false)} className="btn-modal-cancel">Cancel</button>
                <button type="submit" className="btn-modal-submit-blue">
                  <Calendar size={15} /> Dispatch Calendar Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Recruiter Scorecard Metrics */}
      {metricsOpen && (
        <div className="modal-overlay-bg" onClick={() => setMetricsOpen(false)}>
          <div className="recruiter-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-top-header">
              <div>
                <h3 className="modal-h3">Verified Recruiter Scorecard</h3>
                <p className="modal-subtext">Quantitative breakdown for candidate {profile.fullName}</p>
              </div>
              <button onClick={() => setMetricsOpen(false)} className="modal-close-btn"><X size={18} /></button>
            </div>

            <div className="scorecard-body">
              <div className="scorecard-kpi-row">
                <div className="score-kpi">
                  <span className="score-kpi-val text-royal">9.8 / 10</span>
                  <span className="score-kpi-lbl">Algorithmic Ability</span>
                </div>
                <div className="score-kpi">
                  <span className="score-kpi-val text-emerald">9.6 / 10</span>
                  <span className="score-kpi-lbl">System Architecture</span>
                </div>
                <div className="score-kpi">
                  <span className="score-kpi-val text-amber">9.4 / 10</span>
                  <span className="score-kpi-lbl">Academic Excellence</span>
                </div>
              </div>

              <div className="scorecard-detail-list">
                <div className="score-item">
                  <strong>Codeforces Benchmarks:</strong> Candidate Master (1891 peak rating), placing in the top 2.1% globally out of 250,000+ programmers.
                </div>
                <div className="score-item">
                  <strong>LeetCode Consistency:</strong> 1,829 total questions solved (1,026 Medium, 278 Hard) with a 74.8% acceptance rate.
                </div>
                <div className="score-item">
                  <strong>Production Experience:</strong> Built Uber infrastructure cache daemon in Go & HyperStream high-throughput engine in Rust (100k req/sec).
                </div>
                <div className="score-item">
                  <strong>Publications & Patents:</strong> Peer-reviewed IEEE publication on Adaptive RAG Reranking attention models.
                </div>
              </div>

              <div className="modal-actions-row">
                <button type="button" onClick={() => setMetricsOpen(false)} className="btn-modal-cancel">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .recruiter-root { display: flex; flex-direction: column; gap: 20px; }

        .recruiter-action-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .recruiter-match-badge {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .match-score-ring {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(16,185,129,0.25);
        }
        .match-score-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .match-score-sub {
          font-size: 0.78rem;
          color: var(--slate-500);
        }

        .recruiter-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .btn-recruiter-action {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 10px;
          border: 1px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--navy-900);
          transition: all 0.15s ease;
        }
        .btn-recruiter-action:hover {
          background: var(--slate-100);
        }
        .btn-active-shortlist {
          border-color: #FCD34D;
          background: #FEFCE8;
          color: #92400E;
        }
        .btn-active-saved {
          border-color: #93C5FD;
          background: #EFF6FF;
          color: #1E40AF;
        }

        .btn-recruiter-primary {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 10px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          transition: background 0.15s ease;
        }
        .btn-recruiter-primary:hover {
          background: var(--codolio-orange-hover);
        }

        .btn-recruiter-invite {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 10px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          transition: background 0.15s ease;
        }
        .btn-recruiter-invite:hover {
          background: #1D4ED8;
        }

        .recruiter-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .candidate-profile-top {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .candidate-avatar-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--slate-200);
        }
        .candidate-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .candidate-headline {
          font-size: 0.8125rem;
          color: var(--slate-600);
          margin-top: 2px;
        }
        .candidate-sub-pills {
          display: flex;
          gap: 10px;
          font-size: 0.75rem;
          color: var(--slate-500);
          margin-top: 6px;
        }
        .candidate-sub-pills span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .candidate-quick-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 20px;
        }
        .stat-box-item {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 10px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--slate-500);
        }
        .stat-val {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          margin-top: 2px;
        }
        .text-royal { color: #2563EB; }
        .text-amber { color: #D97706; }
        .text-slate { color: #0F172A; }
        .text-emerald { color: #059669; }

        .contact-info-row-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8FAFC;
          border: 1px solid var(--slate-200);
          border-radius: 10px;
          padding: 10px 14px;
          margin-top: 16px;
        }
        .info-email-text {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .btn-copy-email {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--codolio-orange);
          background: #FFF7ED;
          border: 1px solid #FFEDD5;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .btn-full-metrics {
          width: 100%;
          margin-top: 16px;
          padding: 10px;
          border-radius: 10px;
          background: var(--slate-100);
          border: 1px solid var(--slate-200);
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--navy-900);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-full-metrics:hover {
          background: var(--slate-200);
        }

        .recruiter-sec-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-bottom: 16px;
        }

        .signals-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .signal-row {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .signal-badge-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--slate-100);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .signal-body { flex: 1; }
        .signal-title {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .signal-desc {
          font-size: 0.78rem;
          color: var(--slate-600);
          margin-top: 2px;
        }
        .signal-verified-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 800;
          color: #065F46;
          background: #D1FAE5;
          padding: 3px 8px;
          border-radius: 12px;
        }

        /* Modal Elements */
        .recruiter-modal-box {
          background: #FFFFFF;
          border-radius: 18px;
          width: 100%;
          max-width: 520px;
          padding: 24px;
          box-shadow: 0 20px 50px rgba(15,23,42,0.2);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-top-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--slate-100);
          padding-bottom: 14px;
        }
        .modal-h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .modal-subtext {
          font-size: 0.8125rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .modal-close-btn {
          background: var(--slate-100);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate-600);
        }
        .modal-form-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .form-group-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .modal-text-input, .modal-select-input {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.85rem;
          color: var(--navy-900);
          outline: none;
        }
        .modal-textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.85rem;
          color: var(--navy-900);
          outline: none;
          font-family: inherit;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .modal-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }
        .btn-modal-cancel {
          padding: 9px 18px;
          border-radius: 10px;
          border: 1px solid var(--slate-200);
          background: var(--slate-100);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .btn-modal-submit-orange {
          padding: 9px 18px;
          border-radius: 10px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-modal-submit-blue {
          padding: 9px 18px;
          border-radius: 10px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .scorecard-body { display: flex; flex-direction: column; gap: 16px; }
        .scorecard-kpi-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .score-kpi {
          background: var(--slate-50); padding: 12px; border-radius: 10px; text-align: center;
        }
        .score-kpi-val { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; display: block; }
        .score-kpi-lbl { font-size: 0.72rem; color: var(--slate-500); font-weight: 700; }
        .scorecard-detail-list { display: flex; flex-direction: column; gap: 8px; }
        .score-item { font-size: 0.82rem; color: var(--slate-700); background: var(--slate-50); padding: 10px; border-radius: 8px; line-height: 1.4; }

        @media (max-width: 900px) {
          .recruiter-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
