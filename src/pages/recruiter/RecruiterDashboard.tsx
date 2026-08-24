import React, { useState } from 'react';
import { UserProfile } from '../../types/profile';
import { AuthUser } from '../../services/authService';
import { 
  Building2, 
  Search, 
  Filter, 
  Users, 
  Briefcase, 
  Star, 
  Bookmark, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  Trophy, 
  ExternalLink,
  Plus,
  Eye,
  X,
  Send,
  MapPin,
  GraduationCap,
  Clock
} from 'lucide-react';

interface RecruiterDashboardProps {
  profile: UserProfile;
  user: AuthUser;
  onLogout: () => void;
  onNavigate: (route: string) => void;
}

export interface CandidateCardData {
  id: string;
  name: string;
  headline: string;
  college: string;
  location: string;
  photoUrl: string;
  skills: string[];
  projectsCount: number;
  codeforcesRating: number;
  leetcodeSolved: number;
  githubStars: number;
  matchPercentage: number;
  shortlisted?: boolean;
  saved?: boolean;
}

const DEMO_CANDIDATES: CandidateCardData[] = [
  {
    id: 'cand_1',
    name: 'Jatin Vishwakarma',
    headline: 'Cloud-Native Backend Engineer | Competitive Programmer (1980 Rating)',
    college: 'IIT Bombay (\'26)',
    location: 'Mumbai, India',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    skills: ['TypeScript', 'Go', 'C++', 'gRPC', 'Distributed Systems'],
    projectsCount: 6,
    codeforcesRating: 1891,
    leetcodeSolved: 1829,
    githubStars: 890,
    matchPercentage: 98
  },
  {
    id: 'cand_2',
    name: 'Aarav Sharma',
    headline: 'AI Systems Researcher & PyTorch Optimization Lead',
    college: 'IIT Delhi (\'25)',
    location: 'Bengaluru, India',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    skills: ['Python', 'PyTorch', 'Transformers', 'CUDA', 'Docker'],
    projectsCount: 4,
    codeforcesRating: 1740,
    leetcodeSolved: 940,
    githubStars: 420,
    matchPercentage: 92
  },
  {
    id: 'cand_3',
    name: 'Ananya Roy',
    headline: 'Full Stack Frontend Architect & WebGL Creator',
    college: 'BITS Pilani (\'26)',
    location: 'Remote, India',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind'],
    projectsCount: 8,
    codeforcesRating: 1620,
    leetcodeSolved: 750,
    githubStars: 610,
    matchPercentage: 89
  }
];

export interface ApplicationRow {
  id: string;
  candidateName: string;
  avatar: string;
  position: string;
  appliedDate: string;
  status: 'New' | 'Review' | 'Shortlisted' | 'Interview' | 'Rejected';
}

const DEMO_APPLICATIONS: ApplicationRow[] = [
  { id: 'app_1', candidateName: 'Jatin Vishwakarma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', position: 'Software Engineer - Distributed Systems', appliedDate: '2 hours ago', status: 'Shortlisted' },
  { id: 'app_2', candidateName: 'Aarav Sharma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', position: 'AI / Backend Engineer Intern', appliedDate: '1 day ago', status: 'Interview' },
  { id: 'app_3', candidateName: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', position: 'Full Stack Engineer', appliedDate: '2 days ago', status: 'New' },
  { id: 'app_4', candidateName: 'Rohan Verma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', position: 'Cloud & Systems Engineer', appliedDate: '3 days ago', status: 'Review' }
];

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  profile,
  user,
  onLogout,
  onNavigate
}) => {
  const [candidates, setCandidates] = useState<CandidateCardData[]>(DEMO_CANDIDATES);
  const [applications, setApplications] = useState<ApplicationRow[]>(DEMO_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals state
  const [contactCand, setContactCand] = useState<CandidateCardData | null>(null);
  const [inviteCand, setInviteCand] = useState<CandidateCardData | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleToggleShortlist = (candId: string) => {
    setCandidates(prev => prev.map(c => c.id === candId ? { ...c, shortlisted: !c.shortlisted } : c));
    showToast('Candidate shortlist status updated!');
  };

  const handleUpdateStatus = (appId: string, newStatus: ApplicationRow['status']) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    showToast(`Application status updated to ${newStatus}`);
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          c.college.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = skillFilter === 'All' || c.skills.includes(skillFilter);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="recruiter-dashboard-root">
      {/* Toast */}
      {toastMsg && (
        <div className="toast-notification-rec">
          <CheckCircle2 size={16} style={{ color: '#10B981' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner welcome-inner-flex">
          <div>
            <div className="welcome-tag-blue">
              <Building2 size={14} style={{ color: '#60A5FA' }} />
              <span>NovaBridge Recruiter Workspace</span>
            </div>
            <h1 className="welcome-greeting">Good morning, {user.name.split(' ')[0]}</h1>
            <p className="welcome-subtitle">Find skilled students based on what they can actually build.</p>
          </div>

          <div className="welcome-action-buttons">
            <button onClick={() => onNavigate('/recruiter/talent')} className="btn-rec-primary">
              <Search size={14} />
              <span>Talent Discovery</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Recruiter Metrics */}
      <div className="recruiter-metrics-grid">
        <div className="metric-box-card border-navy">
          <div className="metric-header">
            <span className="metric-title">Active Jobs</span>
            <Briefcase size={16} className="text-navy" />
          </div>
          <div className="metric-value-huge text-navy">12</div>
          <div className="metric-sub-text">3 Open Engineering Tracks</div>
        </div>

        <div className="metric-box-card border-royal">
          <div className="metric-header">
            <span className="metric-title">Applications</span>
            <Users size={16} className="text-royal" />
          </div>
          <div className="metric-value-huge text-royal">340</div>
          <div className="metric-sub-text">+48 new this week</div>
        </div>

        <div className="metric-box-card border-amber">
          <div className="metric-header">
            <span className="metric-title">Shortlisted Candidates</span>
            <Star size={16} className="text-amber" />
          </div>
          <div className="metric-value-huge text-amber">48</div>
          <div className="metric-sub-text">Ready for technical round</div>
        </div>

        <div className="metric-box-card border-emerald">
          <div className="metric-header">
            <span className="metric-title">Interviews Scheduled</span>
            <Calendar size={16} className="text-emerald" />
          </div>
          <div className="metric-value-huge text-emerald">18</div>
          <div className="metric-sub-text">Calendar invites dispatched</div>
        </div>
      </div>

      {/* Talent Search & Discovery Section */}
      <div className="color-card color-card-royal">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="talent-search-header-flex">
            <div>
              <h3 className="section-main-heading">Talent Discovery & Recommendations</h3>
              <p className="section-sub-heading">Filter students by verified skills, Codeforces rating, and real project builds</p>
            </div>
          </div>

          {/* Search Bar + Filters */}
          <div className="search-filter-controls-row">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon-pos" />
              <input 
                type="text" 
                placeholder="Search students by skill, role, project or college..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="talent-search-input" 
              />
            </div>

            <div className="skill-filter-pills">
              {['All', 'TypeScript', 'Go', 'Python', 'React.js', 'C++'].map(s => (
                <button
                  key={s}
                  onClick={() => setSkillFilter(s)}
                  className={`skill-pill-btn ${skillFilter === s ? 'active' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Cards Grid */}
          <div className="candidates-cards-grid">
            {filteredCandidates.map(cand => (
              <div key={cand.id} className="candidate-card-item">
                <div className="cand-card-top">
                  <img src={cand.photoUrl} alt={cand.name} className="cand-avatar" />
                  <div className="cand-identity">
                    <h4 className="cand-name">{cand.name}</h4>
                    <div className="cand-headline">{cand.headline}</div>
                    <div className="cand-college">
                      <GraduationCap size={13} /> {cand.college} • <MapPin size={13} /> {cand.location}
                    </div>
                  </div>
                  <div className="cand-match-pill">{cand.matchPercentage}% Match</div>
                </div>

                {/* Algorithmic & GitHub Metrics Row */}
                <div className="cand-stats-pills-row">
                  <span className="cand-stat-tag">CF: <strong>{cand.codeforcesRating}</strong></span>
                  <span className="cand-stat-tag">LC: <strong>{cand.leetcodeSolved} Solved</strong></span>
                  <span className="cand-stat-tag">Stars: <strong>{cand.githubStars}★</strong></span>
                  <span className="cand-stat-tag">Projects: <strong>{cand.projectsCount}</strong></span>
                </div>

                {/* Skills Chips */}
                <div className="cand-skills-chips">
                  {cand.skills.map(s => (
                    <span key={s} className="cand-skill-chip">{s}</span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="cand-card-footer">
                  <button 
                    onClick={() => handleToggleShortlist(cand.id)} 
                    className={`btn-cand-shortlist ${cand.shortlisted ? 'shortlisted' : ''}`}
                  >
                    <Star size={14} fill={cand.shortlisted ? '#F59E0B' : 'none'} />
                    <span>{cand.shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                  </button>

                  <button onClick={() => setContactCand(cand)} className="btn-cand-contact">
                    <Mail size={14} /> Contact
                  </button>

                  <button onClick={() => onNavigate('/student/profile')} className="btn-cand-view">
                    <Eye size={14} /> Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="color-card color-card-emerald">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <h3 className="section-main-heading" style={{ marginBottom: '16px' }}>Recent Applications</h3>

          <div className="table-responsive-wrapper">
            <table className="rec-applications-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position Applied</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>
                      <div className="tbl-candidate-cell">
                        <img src={app.avatar} alt={app.candidateName} className="tbl-avatar" />
                        <span className="tbl-cand-name">{app.candidateName}</span>
                      </div>
                    </td>
                    <td className="tbl-pos-cell">{app.position}</td>
                    <td className="tbl-date-cell">{app.appliedDate}</td>
                    <td>
                      <select 
                        value={app.status} 
                        onChange={e => handleUpdateStatus(app.id, e.target.value as any)}
                        className={`tbl-status-select status-${app.status.toLowerCase()}`}
                      >
                        <option value="New">New</option>
                        <option value="Review">Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => setInviteCand({ name: app.candidateName } as any)} className="btn-tbl-invite">
                        Invite Round
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL: Contact Candidate */}
      {contactCand && (
        <div className="modal-overlay-bg" onClick={() => setContactCand(null)}>
          <div className="recruiter-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-top-header">
              <div>
                <h3 className="modal-h3">Contact {contactCand.name}</h3>
                <p className="modal-subtext">Direct outreach via NovaBridge talent pipeline</p>
              </div>
              <button onClick={() => setContactCand(null)} className="modal-close-btn"><X size={18} /></button>
            </div>
            <div className="modal-form-body">
              <div className="form-group-item">
                <label className="modal-label">Email Subject</label>
                <input type="text" defaultValue={`Engineering Opportunity | ${contactCand.name}`} className="modal-text-input" />
              </div>
              <div className="form-group-item">
                <label className="modal-label">Outreach Message</label>
                <textarea rows={5} defaultValue={`Hi ${contactCand.name},\n\nWe were impressed by your verified achievements and GitHub engineering work. We would love to chat!`} className="modal-textarea" />
              </div>
              <div className="modal-actions-row">
                <button onClick={() => setContactCand(null)} className="btn-modal-cancel">Cancel</button>
                <button onClick={() => { setContactCand(null); showToast(`Outreach sent to ${contactCand.name}`); }} className="btn-modal-submit-blue">
                  <Send size={15} /> Send Direct Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .recruiter-dashboard-root {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
        }

        .toast-notification-rec {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 9999;
          background: #FFFFFF;
          border: 1px solid #A7F3D0;
          border-left: 4px solid #10B981;
          border-radius: 10px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #065F46;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
        }

        .welcome-inner-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .welcome-tag-blue {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #2563EB;
          background: #EFF6FF;
          padding: 4px 10px;
          border-radius: 20px;
          width: fit-content;
          margin-bottom: 8px;
        }
        .welcome-greeting {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .welcome-subtitle {
          font-size: 0.85rem;
          color: var(--slate-500);
          margin-top: 4px;
        }
        .btn-rec-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 8px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        .recruiter-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .metric-box-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
        }
        .border-navy { border-top: 4px solid #0F172A; }
        .border-royal { border-top: 4px solid #2563EB; }
        .border-amber { border-top: 4px solid #D97706; }
        .border-emerald { border-top: 4px solid #059669; }

        .metric-header { display: flex; align-items: center; justify-content: space-between; }
        .metric-title { font-size: 0.8125rem; font-weight: 700; color: var(--slate-600); }
        .metric-value-huge { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; margin-top: 10px; line-height: 1; }
        .text-navy { color: #0F172A; }
        .text-royal { color: #2563EB; }
        .text-amber { color: #D97706; }
        .text-emerald { color: #059669; }
        .metric-sub-text { font-size: 0.75rem; color: var(--slate-500); margin-top: 8px; }

        .section-main-heading { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--navy-900); }
        .section-sub-heading { font-size: 0.8125rem; color: var(--slate-500); margin-top: 2px; }

        .search-filter-controls-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
          margin-bottom: 20px;
        }
        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon-pos { position: absolute; left: 14px; color: var(--slate-400); }
        .talent-search-input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border: 1.5px solid var(--slate-200);
          border-radius: 12px;
          font-size: 0.88rem;
          color: var(--navy-900);
          outline: none;
        }
        .talent-search-input:focus { border-color: #2563EB; }

        .skill-filter-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .skill-pill-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
        }
        .skill-pill-btn.active {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
        }

        /* Candidates Cards */
        .candidates-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
        }
        .candidate-card-item {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
          transition: transform 0.15s ease;
        }
        .candidate-card-item:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15,23,42,0.08); }

        .cand-card-top { display: flex; align-items: flex-start; gap: 12px; }
        .cand-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--slate-200); }
        .cand-identity { flex: 1; }
        .cand-name { font-family: var(--font-heading); font-size: 1rem; font-weight: 800; color: var(--navy-900); }
        .cand-headline { font-size: 0.78rem; color: var(--slate-600); margin-top: 2px; line-height: 1.3; }
        .cand-college { font-size: 0.72rem; color: var(--slate-500); margin-top: 4px; display: flex; align-items: center; gap: 4px; }
        .cand-match-pill { font-size: 0.72rem; font-weight: 800; color: #065F46; background: #D1FAE5; padding: 3px 8px; border-radius: 12px; }

        .cand-stats-pills-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .cand-stat-tag { font-size: 0.72rem; color: var(--slate-600); background: var(--slate-100); padding: 3px 8px; border-radius: 6px; }

        .cand-skills-chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .cand-skill-chip { font-size: 0.7rem; font-weight: 700; color: #1E40AF; background: #EFF6FF; padding: 2px 6px; border-radius: 4px; }

        .cand-card-footer { margin-top: auto; display: flex; gap: 8px; padding-top: 10px; border-top: 1px solid var(--slate-100); }
        .btn-cand-shortlist {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 7px 10px; border-radius: 8px; border: 1px solid var(--slate-200); background: var(--slate-50);
          font-size: 0.78rem; font-weight: 700; color: var(--slate-600); cursor: pointer;
        }
        .btn-cand-shortlist.shortlisted { background: #FEFCE8; color: #92400E; border-color: #FCD34D; }
        .btn-cand-contact {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 7px 10px; border-radius: 8px; background: #2563EB; color: #FFFFFF;
          font-size: 0.78rem; font-weight: 800; border: none; cursor: pointer;
        }
        .btn-cand-view {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 7px 10px; border-radius: 8px; background: var(--slate-100); color: var(--navy-900);
          font-size: 0.78rem; font-weight: 700; border: none; cursor: pointer;
        }

        /* Applications Table */
        .table-responsive-wrapper { overflow-x: auto; }
        .rec-applications-table { width: 100%; border-collapse: collapse; text-align: left; }
        .rec-applications-table th { font-size: 0.78rem; font-weight: 800; color: var(--slate-500); padding: 10px 12px; border-bottom: 2px solid var(--slate-200); }
        .rec-applications-table td { padding: 12px; border-bottom: 1px solid var(--slate-100); font-size: 0.82rem; }

        .tbl-candidate-cell { display: flex; align-items: center; gap: 10px; }
        .tbl-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
        .tbl-cand-name { font-weight: 800; color: var(--navy-900); }
        .tbl-pos-cell { font-weight: 700; color: var(--slate-700); }
        .tbl-date-cell { color: var(--slate-500); }

        .tbl-status-select {
          padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; outline: none; border: 1px solid transparent;
        }
        .status-shortlisted { background: #FEF3C7; color: #92400E; }
        .status-interview { background: #D1FAE5; color: #065F46; }
        .status-new { background: #EFF6FF; color: #1E40AF; }
        .status-review { background: #F3E8FF; color: #6D28D9; }
        .status-rejected { background: #FEE2E2; color: #991B1B; }

        .btn-tbl-invite {
          padding: 5px 12px; border-radius: 6px; background: var(--slate-100); border: 1px solid var(--slate-200);
          font-size: 0.75rem; font-weight: 700; color: var(--navy-900); cursor: pointer;
        }
        .btn-tbl-invite:hover { background: #DBEAFE; color: #1D4ED8; }

        /* Modal */
        .recruiter-modal-box {
          background: #FFFFFF; border-radius: 18px; width: 100%; max-width: 500px; padding: 24px;
          box-shadow: 0 20px 50px rgba(15,23,42,0.2); display: flex; flex-direction: column; gap: 16px;
        }
        .modal-top-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--slate-100); padding-bottom: 12px; }
        .modal-h3 { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--navy-900); }
        .modal-subtext { font-size: 0.8125rem; color: var(--slate-500); margin-top: 2px; }
        .modal-close-btn { background: var(--slate-100); border: none; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--slate-600); }
        .modal-form-body { display: flex; flex-direction: column; gap: 14px; }
        .form-group-item { display: flex; flex-direction: column; gap: 6px; }
        .modal-label { font-size: 0.8rem; font-weight: 700; color: var(--navy-900); }
        .modal-text-input, .modal-textarea { width: 100%; padding: 10px 12px; border: 1.5px solid var(--slate-200); border-radius: 10px; font-size: 0.85rem; color: var(--navy-900); outline: none; }
        .modal-actions-row { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
        .btn-modal-cancel { padding: 9px 18px; border-radius: 10px; border: 1px solid var(--slate-200); background: var(--slate-100); font-size: 0.8125rem; font-weight: 700; color: var(--slate-600); }
        .btn-modal-submit-blue { padding: 9px 18px; border-radius: 10px; background: #2563EB; color: #FFFFFF; font-size: 0.8125rem; font-weight: 800; border: none; display: flex; align-items: center; gap: 6px; }
      `}</style>
    </div>
  );
};
