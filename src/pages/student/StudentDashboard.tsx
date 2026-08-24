import React, { useState } from 'react';
import { UserProfile } from '../../types/profile';
import { AuthUser } from '../../services/authService';
import { LeftProfileCard } from '../../components/LeftProfileCard';
import { DashboardStats } from '../../components/DashboardStats';
import { SkillsSection } from '../../components/SkillsSection';
import { ProjectsSection } from '../../components/ProjectsSection';
import { TimelineSection } from '../../components/TimelineSection';
import { RecommendedLearningSection } from '../../components/RecommendedLearningSection';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Target, 
  Award, 
  Briefcase, 
  Send,
  Bell,
  Search,
  User,
  Compass,
  BookOpen,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  FolderGit2
} from 'lucide-react';

interface StudentDashboardProps {
  profile: UserProfile;
  user: AuthUser;
  onOpenUpdateLinks: () => void;
  onSyncAPIs: () => void;
  isSyncing: boolean;
  onAddProject: () => void;
  onLogout: () => void;
  onNavigate: (route: string) => void;
  currentRoute: string;
}

export interface OpportunityCard {
  id: string;
  company: string;
  logoBg: string;
  role: string;
  location: string;
  skills: string[];
  matchPercentage: number;
  deadline: string;
  applied?: boolean;
  saved?: boolean;
}

const DEMO_OPPORTUNITIES: OpportunityCard[] = [
  {
    id: 'opp_1',
    company: 'Uber Infrastructure',
    logoBg: '#0F172A',
    role: 'Software Engineer - Distributed Systems',
    location: 'Bengaluru / Remote',
    skills: ['Go', 'gRPC', 'Distributed Systems', 'Redis'],
    matchPercentage: 94,
    deadline: 'Aug 30, 2026'
  },
  {
    id: 'opp_2',
    company: 'Google Cloud Platform',
    logoBg: '#2563EB',
    role: 'Backend Engineering Specialist',
    location: 'Hyderabad, India',
    skills: ['TypeScript', 'C++', 'System Architecture', 'PostgreSQL'],
    matchPercentage: 88,
    deadline: 'Sep 05, 2026'
  },
  {
    id: 'opp_3',
    company: 'Stripe Global Talent',
    logoBg: '#7C3AED',
    role: 'Full Stack Product Engineer',
    location: 'Remote',
    skills: ['React.js', 'TypeScript', 'API Design', 'Node.js'],
    matchPercentage: 85,
    deadline: 'Sep 12, 2026'
  }
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  user,
  onOpenUpdateLinks,
  onSyncAPIs,
  isSyncing,
  onAddProject,
  onLogout,
  onNavigate,
  currentRoute
}) => {
  const [opportunities, setOpportunities] = useState<OpportunityCard[]>(DEMO_OPPORTUNITIES);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'courses' | 'opportunities' | 'applications'>('dashboard');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleApply = (oppId: string) => {
    setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, applied: true } : o));
    showToast('Application submitted successfully! Recruiter notified.');
  };

  const handleSaveOpp = (oppId: string) => {
    setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, saved: !o.saved } : o));
    showToast('Opportunity saved to your shortlist!');
  };

  return (
    <div className="student-dashboard-root">
      {/* Toast */}
      {toastMsg && (
        <div className="toast-notification-student">
          <CheckCircle2 size={16} style={{ color: '#10B981' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Welcome Banner */}
      <div className="student-welcome-banner color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner welcome-inner-flex">
          <div>
            <div className="welcome-tag">
              <Sparkles size={14} style={{ color: '#F97316' }} />
              <span>Verified Student Career Dashboard</span>
            </div>
            <h1 className="welcome-greeting">Good morning, {user.name.split(' ')[0]}</h1>
            <p className="welcome-subtitle">Build your profile. Prove your skills. Find your next opportunity.</p>
          </div>

          <div className="welcome-action-buttons">
            <button onClick={onSyncAPIs} disabled={isSyncing} className="btn-welcome-secondary">
              <RefreshCwIcon size={14} className={isSyncing ? 'spin-icon' : ''} />
              <span>{isSyncing ? 'Syncing...' : 'Refresh Live APIs'}</span>
            </button>
            <button onClick={() => onNavigate('/student/profile')} className="btn-welcome-primary">
              <span>View Full Profile</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="student-metrics-grid">
        <div className="metric-box-card border-royal">
          <div className="metric-header">
            <span className="metric-title">Profile Completion</span>
            <Target size={16} className="text-royal" />
          </div>
          <div className="metric-value-huge text-royal">85%</div>
          <div className="metric-bar-bg"><div className="metric-bar-fill bg-royal" style={{ width: '85%' }}></div></div>
        </div>

        <div className="metric-box-card border-emerald">
          <div className="metric-header">
            <span className="metric-title">Career Readiness</span>
            <Sparkles size={16} className="text-emerald" />
          </div>
          <div className="metric-value-huge text-emerald">78%</div>
          <div className="metric-bar-bg"><div className="metric-bar-fill bg-emerald" style={{ width: '78%' }}></div></div>
        </div>

        <div className="metric-box-card border-orange">
          <div className="metric-header">
            <span className="metric-title">Opportunity Matches</span>
            <Briefcase size={16} className="text-orange" />
          </div>
          <div className="metric-value-huge text-orange">14</div>
          <div className="metric-sub-text">3 High Match Roles Ready</div>
        </div>

        <div className="metric-box-card border-navy">
          <div className="metric-header">
            <span className="metric-title">Profile Views</span>
            <Eye size={16} className="text-navy" />
          </div>
          <div className="metric-value-huge text-navy">245</div>
          <div className="metric-sub-text">+32 this week by recruiters</div>
        </div>
      </div>

      {/* Career Snapshot Panel */}
      <div className="color-card color-card-royal" style={{ marginBottom: '24px' }}>
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <h3 className="snapshot-title">Career Snapshot & Benchmarks</h3>
          <div className="snapshot-grid">
            <div className="snapshot-item">
              <span className="snap-lbl">Target Role</span>
              <strong className="snap-val text-navy">{user.targetRole || 'Software Engineer'}</strong>
            </div>
            <div className="snapshot-item">
              <span className="snap-lbl">Skill Readiness</span>
              <strong className="snap-val text-emerald">78% Match</strong>
            </div>
            <div className="snapshot-item">
              <span className="snap-lbl">Verified Projects</span>
              <strong className="snap-val text-royal">{profile.projects.length} Projects</strong>
            </div>
            <div className="snapshot-item">
              <span className="snap-lbl">Verified Achievements</span>
              <strong className="snap-val text-orange">{profile.achievements.length + profile.certifications.length} Credentials</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Opportunities Section */}
      <div className="color-card color-card-emerald" style={{ marginBottom: '24px' }}>
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="opp-sec-header">
            <div>
              <h3 className="opp-sec-title">Recommended Opportunities</h3>
              <p className="opp-sec-sub">Matched with your verified skills and Codeforces / GitHub activity</p>
            </div>
            <button onClick={() => onNavigate('/student/opportunities')} className="btn-link-sec">
              View All 14 Roles -&gt;
            </button>
          </div>

          <div className="opp-cards-grid">
            {opportunities.map(opp => (
              <div key={opp.id} className="opp-item-card">
                <div className="opp-card-top">
                  <div className="opp-company-logo" style={{ background: opp.logoBg }}>
                    {opp.company.charAt(0)}
                  </div>
                  <div className="opp-match-badge">
                    <span>{opp.matchPercentage}% Match</span>
                  </div>
                </div>

                <h4 className="opp-role-title">{opp.role}</h4>
                <div className="opp-company-name">{opp.company} • {opp.location}</div>

                <div className="opp-skills-list">
                  {opp.skills.map(s => (
                    <span key={s} className="opp-skill-chip">{s}</span>
                  ))}
                </div>

                <div className="opp-footer">
                  <div className="opp-deadline"><Clock size={12} /> {opp.deadline}</div>
                  <div className="opp-actions-btns">
                    <button onClick={() => handleSaveOpp(opp.id)} className={`btn-opp-icon ${opp.saved ? 'saved' : ''}`} title="Save">
                      <Bookmark size={14} fill={opp.saved ? '#F97316' : 'none'} />
                    </button>
                    <button 
                      onClick={() => handleApply(opp.id)} 
                      disabled={opp.applied} 
                      className={`btn-opp-apply ${opp.applied ? 'applied' : ''}`}
                    >
                      {opp.applied ? <><CheckCircle2 size={13} /> Applied</> : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Profile Card + Right Sections */}
      <div className="codolio-grid-layout">
        <LeftProfileCard
          profile={profile}
          onOpenUpdateLinks={onOpenUpdateLinks}
          onSyncAPIs={onSyncAPIs}
          isSyncing={isSyncing}
          publicProfileEnabled={false}
          setPublicProfileEnabled={() => {}}
        />

        <div className="right-dashboard-col">
          {/* 1. Skills */}
          <SkillsSection skills={profile.skills} />

          {/* 2. Projects */}
          <ProjectsSection projects={profile.projects} onAddProject={onAddProject} />

          {/* 3. Timeline / Experience & Education */}
          <TimelineSection experience={profile.experience} education={profile.education} />

          {/* 4. RECOMMENDED LEARNING (PLACED ABOVE CODING PROFILES!) */}
          <RecommendedLearningSection 
            currentSkills={profile.skills.map(s => s.name)} 
            targetRole={user.targetRole || 'Full Stack Developer'} 
          />

          {/* 5. CODING PROFILES (Dashboard Stats) */}
          <DashboardStats profile={profile} />
        </div>
      </div>

      <style>{`
        .student-dashboard-root {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
        }

        .toast-notification-student {
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
        .welcome-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #F97316;
          background: rgba(249,115,22,0.1);
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

        .welcome-action-buttons {
          display: flex;
          gap: 10px;
        }
        .btn-welcome-secondary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--navy-900);
          cursor: pointer;
        }
        .btn-welcome-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        /* 4 Metrics Grid */
        .student-metrics-grid {
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
        .border-royal { border-top: 4px solid #2563EB; }
        .border-emerald { border-top: 4px solid #059669; }
        .border-orange { border-top: 4px solid #F97316; }
        .border-navy { border-top: 4px solid #0F172A; }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .metric-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .metric-value-huge {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          margin-top: 10px;
          line-height: 1;
        }
        .text-royal { color: #2563EB; }
        .text-emerald { color: #059669; }
        .text-orange { color: #F97316; }
        .text-navy { color: #0F172A; }

        .metric-bar-bg {
          width: 100%;
          height: 5px;
          background: var(--slate-100);
          border-radius: 10px;
          margin-top: 12px;
          overflow: hidden;
        }
        .metric-bar-fill {
          height: 100%;
          border-radius: 10px;
        }
        .bg-royal { background: #2563EB; }
        .bg-emerald { background: #059669; }
        .metric-sub-text {
          font-size: 0.75rem;
          color: var(--slate-500);
          margin-top: 10px;
        }

        /* Snapshot Grid */
        .snapshot-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-bottom: 14px;
        }
        .snapshot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }
        .snapshot-item {
          background: var(--slate-50);
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--slate-200);
          display: flex;
          flex-direction: column;
        }
        .snap-lbl {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--slate-500);
        }
        .snap-val {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          margin-top: 4px;
        }

        /* Opportunities Grid */
        .opp-sec-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .opp-sec-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .opp-sec-sub {
          font-size: 0.8125rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .btn-link-sec {
          background: none;
          border: none;
          font-size: 0.8125rem;
          font-weight: 800;
          color: #059669;
          cursor: pointer;
        }

        .opp-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }
        .opp-item-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
          transition: transform 0.15s ease;
        }
        .opp-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15,23,42,0.08);
        }
        .opp-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .opp-company-logo {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          color: #FFFFFF;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .opp-match-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: #065F46;
          background: #D1FAE5;
          padding: 3px 8px;
          border-radius: 12px;
        }
        .opp-role-title {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1.3;
        }
        .opp-company-name {
          font-size: 0.78rem;
          color: var(--slate-500);
        }
        .opp-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .opp-skill-chip {
          font-size: 0.7rem;
          font-weight: 700;
          color: #1E40AF;
          background: #EFF6FF;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .opp-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid var(--slate-100);
        }
        .opp-deadline {
          font-size: 0.72rem;
          color: var(--slate-400);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .opp-actions-btns {
          display: flex;
          gap: 6px;
        }
        .btn-opp-icon {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate-500);
          cursor: pointer;
        }
        .btn-opp-icon.saved {
          background: #FFF7ED;
          border-color: #FFEDD5;
          color: #F97316;
        }
        .btn-opp-apply {
          padding: 6px 12px;
          border-radius: 6px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .btn-opp-apply.applied {
          background: #10B981;
        }
      `}</style>
    </div>
  );
};

const RefreshCwIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 14} height={props.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);
