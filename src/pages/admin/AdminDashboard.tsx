import React, { useState } from 'react';
import { UserProfile } from '../../types/profile';
import { AuthUser } from '../../services/authService';
import { 
  Server, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  BarChart2, 
  FileText, 
  Check, 
  X, 
  Eye, 
  Lock, 
  Unlock, 
  UserCheck, 
  Activity,
  Award,
  FolderGit2
} from 'lucide-react';

interface AdminDashboardProps {
  profile: UserProfile;
  user: AuthUser;
  onLogout: () => void;
  onNavigate: (route: string) => void;
}

export interface VerificationQueueItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  itemTitle: string;
  type: 'Achievement' | 'Certification' | 'Project' | 'Coding Profile';
  submittedDate: string;
  evidenceUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const DEMO_VERIFICATION_QUEUE: VerificationQueueItem[] = [
  { id: 'ver_1', studentName: 'Jatin Vishwakarma', studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', itemTitle: 'CKA: Certified Kubernetes Administrator', type: 'Certification', submittedDate: '10 mins ago', evidenceUrl: 'https://cnc.io/verify/CKA-84920', status: 'Pending' },
  { id: 'ver_2', studentName: 'Aarav Sharma', studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', itemTitle: '1st Rank - National AI Hackathon 2026', type: 'Achievement', submittedDate: '1 hour ago', evidenceUrl: 'https://hackathon.org/winners/2026', status: 'Pending' },
  { id: 'ver_3', studentName: 'Ananya Roy', studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', itemTitle: 'Distributed Cache Engine (Go & Redis)', type: 'Project', submittedDate: '3 hours ago', evidenceUrl: 'https://github.com/ananya/cache-engine', status: 'Pending' },
  { id: 'ver_4', studentName: 'Rohan Verma', studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', itemTitle: 'Codeforces Handle: rohan_cf (Rating 1920)', type: 'Coding Profile', submittedDate: '5 hours ago', evidenceUrl: 'https://codeforces.com/profile/rohan_cf', status: 'Approved' }
];

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'recruiter' | 'admin';
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
}

const DEMO_USERS: AdminUserRow[] = [
  { id: 'u_1', name: 'Jatin Vishwakarma', email: 'student@novabridge.demo', role: 'student', status: 'Active', joinedDate: 'Aug 10, 2026' },
  { id: 'u_2', name: 'Sarah Jenkins', email: 'recruiter@novabridge.demo', role: 'recruiter', status: 'Active', joinedDate: 'Aug 12, 2026' },
  { id: 'u_3', name: 'System Administrator', email: 'admin@novabridge.demo', role: 'admin', status: 'Active', joinedDate: 'Jan 01, 2026' },
  { id: 'u_4', name: 'Aarav Sharma', email: 'aarav@iitd.ac.in', role: 'student', status: 'Active', joinedDate: 'Aug 15, 2026' },
  { id: 'u_5', name: 'Tech Recruit Corp', email: 'hr@techrecruit.com', role: 'recruiter', status: 'Pending', joinedDate: 'Aug 18, 2026' }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  profile,
  user,
  onLogout,
  onNavigate
}) => {
  const [verifications, setVerifications] = useState<VerificationQueueItem[]>(DEMO_VERIFICATION_QUEUE);
  const [usersList, setUsersList] = useState<AdminUserRow[]>(DEMO_USERS);
  const [userRoleFilter, setUserRoleFilter] = useState<'All' | 'student' | 'recruiter' | 'admin'>('All');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleApproveVerification = (item: VerificationQueueItem) => {
    setConfirmModal({
      isOpen: true,
      title: `Approve "${item.itemTitle}"?`,
      message: `This will mark the student's submission as verified with official cryptographic badge on their public profile.`,
      onConfirm: () => {
        setVerifications(prev => prev.map(v => v.id === item.id ? { ...v, status: 'Approved' } : v));
        setConfirmModal(null);
        showToast(`Approved submission for ${item.studentName}`);
      }
    });
  };

  const handleRejectVerification = (item: VerificationQueueItem) => {
    setConfirmModal({
      isOpen: true,
      title: `Reject "${item.itemTitle}"?`,
      message: `The student will be notified to re-submit valid evidence link or proof repository.`,
      onConfirm: () => {
        setVerifications(prev => prev.map(v => v.id === item.id ? { ...v, status: 'Rejected' } : v));
        setConfirmModal(null);
        showToast(`Rejected submission for ${item.studentName}`);
      }
    });
  };

  const handleToggleUserStatus = (usr: AdminUserRow) => {
    const newStatus = usr.status === 'Active' ? 'Suspended' : 'Active';
    setUsersList(prev => prev.map(u => u.id === usr.id ? { ...u, status: newStatus } : u));
    showToast(`User ${usr.name} is now ${newStatus}`);
  };

  const filteredUsers = usersList.filter(u => {
    const matchesRole = userRoleFilter === 'All' || u.role === userRoleFilter;
    const matchesQuery = u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    return matchesRole && matchesQuery;
  });

  return (
    <div className="admin-dashboard-root">
      {/* Toast */}
      {toastMsg && (
        <div className="toast-notification-adm">
          <CheckCircle2 size={16} style={{ color: '#10B981' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner welcome-inner-flex">
          <div>
            <div className="welcome-tag-emerald">
              <Server size={14} style={{ color: '#10B981' }} />
              <span>NovaBridge Systems Operations Console</span>
            </div>
            <h1 className="welcome-greeting">NovaBridge Administration</h1>
            <p className="welcome-subtitle">Manage users, opportunities, verification queue and platform metrics.</p>
          </div>

          <div className="welcome-action-buttons">
            <button onClick={() => showToast('Platform diagnostics clean. All services healthy.')} className="btn-adm-primary">
              <Activity size={14} />
              <span>System Health: 100% Operational</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Admin Metrics */}
      <div className="admin-metrics-grid">
        <div className="metric-box-card border-navy">
          <div className="metric-header">
            <span className="metric-title">Total Registered Students</span>
            <Users size={16} className="text-navy" />
          </div>
          <div className="metric-value-huge text-navy">12,450</div>
          <div className="metric-sub-text">+140 joined this week</div>
        </div>

        <div className="metric-box-card border-royal">
          <div className="metric-header">
            <span className="metric-title">Verified Recruiters</span>
            <Briefcase size={16} className="text-royal" />
          </div>
          <div className="metric-value-huge text-royal">1,280</div>
          <div className="metric-sub-text">Across 420 tech enterprises</div>
        </div>

        <div className="metric-box-card border-emerald">
          <div className="metric-header">
            <span className="metric-title">Active Opportunities</span>
            <BarChart2 size={16} className="text-emerald" />
          </div>
          <div className="metric-value-huge text-emerald">450</div>
          <div className="metric-sub-text">Live internships & full-time roles</div>
        </div>

        <div className="metric-box-card border-amber">
          <div className="metric-header">
            <span className="metric-title">Pending Verifications</span>
            <ShieldCheck size={16} className="text-amber" />
          </div>
          <div className="metric-value-huge text-amber">38</div>
          <div className="metric-sub-text">Requires admin review</div>
        </div>
      </div>

      {/* Platform Activity Overview Charts / Metrics */}
      <div className="color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <h3 className="section-main-heading" style={{ marginBottom: '14px' }}>Platform Activity Overview</h3>

          <div className="admin-analytics-grid">
            <div className="chart-card-box">
              <div className="chart-header-title">User Growth & Registrations</div>
              <div className="sparkline-bar-container">
                <div className="spark-bar" style={{ height: '40%' }}></div>
                <div className="spark-bar" style={{ height: '55%' }}></div>
                <div className="spark-bar" style={{ height: '70%' }}></div>
                <div className="spark-bar" style={{ height: '60%' }}></div>
                <div className="spark-bar" style={{ height: '85%' }}></div>
                <div className="spark-bar" style={{ height: '100%' }}></div>
              </div>
              <div className="chart-sub-text">Avg. 45 new students registered per day</div>
            </div>

            <div className="chart-card-box">
              <div className="chart-header-title">Opportunity Activity & Applications</div>
              <div className="sparkline-bar-container">
                <div className="spark-bar bg-emerald-bar" style={{ height: '30%' }}></div>
                <div className="spark-bar bg-emerald-bar" style={{ height: '50%' }}></div>
                <div className="spark-bar bg-emerald-bar" style={{ height: '65%' }}></div>
                <div className="spark-bar bg-emerald-bar" style={{ height: '80%' }}></div>
                <div className="spark-bar bg-emerald-bar" style={{ height: '90%' }}></div>
                <div className="spark-bar bg-emerald-bar" style={{ height: '95%' }}></div>
              </div>
              <div className="chart-sub-text">340 applications processed this week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Queue Section */}
      <div className="color-card color-card-amber">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="ver-header-flex">
            <div>
              <h3 className="section-main-heading">Verification Operations Queue</h3>
              <p className="section-sub-heading">Review submitted achievements, certifications, projects, and competitive handles</p>
            </div>
            <span className="ver-badge-count">{verifications.filter(v => v.status === 'Pending').length} Pending</span>
          </div>

          <div className="table-responsive-wrapper" style={{ marginTop: '16px' }}>
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Item / Submission</th>
                  <th>Type</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {verifications.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="tbl-candidate-cell">
                        <img src={item.studentAvatar} alt={item.studentName} className="tbl-avatar" />
                        <span className="tbl-cand-name">{item.studentName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="item-title-cell">{item.itemTitle}</div>
                      <a href={item.evidenceUrl} target="_blank" rel="noreferrer" className="evidence-link">
                        <FileText size={12} /> Evidence Link
                      </a>
                    </td>
                    <td><span className="ver-type-chip">{item.type}</span></td>
                    <td className="tbl-date-cell">{item.submittedDate}</td>
                    <td>
                      <span className={`status-pill status-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status === 'Pending' ? (
                        <div className="ver-action-btns">
                          <button onClick={() => handleApproveVerification(item)} className="btn-act-approve">
                            <Check size={13} /> Approve
                          </button>
                          <button onClick={() => handleRejectVerification(item)} className="btn-act-reject">
                            <X size={13} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="ver-done-text">Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="color-card color-card-royal">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="ver-header-flex">
            <div>
              <h3 className="section-main-heading">User Management & Accounts</h3>
              <p className="section-sub-heading">Audit user permissions, active status, and role assignments</p>
            </div>
          </div>

          {/* User Filters & Search */}
          <div className="user-filter-bar">
            <div className="search-input-wrap">
              <Search size={15} className="search-icon-pos" />
              <input 
                type="text" 
                placeholder="Search users by name or email..." 
                value={userSearchQuery} 
                onChange={e => setUserSearchQuery(e.target.value)} 
                className="talent-search-input" 
              />
            </div>

            <div className="role-filter-pills">
              {(['All', 'student', 'recruiter', 'admin'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setUserRoleFilter(role)}
                  className={`role-pill-btn ${userRoleFilter === role ? 'active' : ''}`}
                >
                  {role.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive-wrapper" style={{ marginTop: '16px' }}>
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(usr => (
                  <tr key={usr.id}>
                    <td className="tbl-cand-name">{usr.name}</td>
                    <td className="tbl-date-cell">{usr.email}</td>
                    <td><span className={`role-badge role-${usr.role}`}>{usr.role.toUpperCase()}</span></td>
                    <td>
                      <span className={`status-pill status-${usr.status.toLowerCase()}`}>
                        {usr.status}
                      </span>
                    </td>
                    <td className="tbl-date-cell">{usr.joinedDate}</td>
                    <td>
                      <button onClick={() => handleToggleUserStatus(usr)} className="btn-act-toggle-user">
                        {usr.status === 'Active' ? <><Lock size={12} /> Suspend</> : <><Unlock size={12} /> Activate</>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmModal && (
        <div className="modal-overlay-bg" onClick={() => setConfirmModal(null)}>
          <div className="recruiter-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-top-header">
              <h3 className="modal-h3">{confirmModal.title}</h3>
              <button onClick={() => setConfirmModal(null)} className="modal-close-btn"><X size={18} /></button>
            </div>
            <p className="modal-subtext" style={{ fontSize: '0.88rem', color: 'var(--navy-900)' }}>
              {confirmModal.message}
            </p>
            <div className="modal-actions-row">
              <button onClick={() => setConfirmModal(null)} className="btn-modal-cancel">Cancel</button>
              <button onClick={confirmModal.onConfirm} className="btn-modal-submit-navy">Confirm Action</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-dashboard-root {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
        }

        .toast-notification-adm {
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
        .welcome-tag-emerald {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #059669;
          background: #D1FAE5;
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
        .btn-adm-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 8px;
          background: #0F172A;
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        .admin-metrics-grid {
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
        .border-emerald { border-top: 4px solid #059669; }
        .border-amber { border-top: 4px solid #D97706; }

        .metric-header { display: flex; align-items: center; justify-content: space-between; }
        .metric-title { font-size: 0.8125rem; font-weight: 700; color: var(--slate-600); }
        .metric-value-huge { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; margin-top: 10px; line-height: 1; }
        .text-navy { color: #0F172A; }
        .text-royal { color: #2563EB; }
        .text-emerald { color: #059669; }
        .text-amber { color: #D97706; }
        .metric-sub-text { font-size: 0.75rem; color: var(--slate-500); margin-top: 8px; }

        .section-main-heading { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--navy-900); }
        .section-sub-heading { font-size: 0.8125rem; color: var(--slate-500); margin-top: 2px; }

        /* Analytics Chart Box */
        .admin-analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 16px;
        }
        .chart-card-box {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .chart-header-title { font-size: 0.85rem; font-weight: 800; color: var(--navy-900); }
        .sparkline-bar-container {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 80px;
          padding-top: 10px;
        }
        .spark-bar {
          flex: 1;
          background: #2563EB;
          border-radius: 4px 4px 0 0;
        }
        .bg-emerald-bar { background: #059669; }
        .chart-sub-text { font-size: 0.75rem; color: var(--slate-500); }

        /* Verification Table */
        .ver-header-flex { display: flex; justify-content: space-between; align-items: flex-start; }
        .ver-badge-count { font-size: 0.78rem; font-weight: 800; color: #D97706; background: #FEF3C7; padding: 4px 10px; border-radius: 12px; }

        .table-responsive-wrapper { overflow-x: auto; }
        .admin-data-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-data-table th { font-size: 0.78rem; font-weight: 800; color: var(--slate-500); padding: 10px 12px; border-bottom: 2px solid var(--slate-200); }
        .admin-data-table td { padding: 12px; border-bottom: 1px solid var(--slate-100); font-size: 0.82rem; }

        .tbl-candidate-cell { display: flex; align-items: center; gap: 10px; }
        .tbl-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
        .tbl-cand-name { font-weight: 800; color: var(--navy-900); }
        .item-title-cell { font-weight: 700; color: var(--navy-900); }
        .evidence-link { font-size: 0.72rem; color: #2563EB; text-decoration: none; display: flex; align-items: center; gap: 3px; margin-top: 2px; }

        .ver-type-chip { font-size: 0.72rem; font-weight: 800; color: #6D28D9; background: #F3E8FF; padding: 2px 6px; border-radius: 4px; }
        .status-pill { font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; }
        .status-pending { background: #FEF3C7; color: #92400E; }
        .status-approved, .status-active { background: #D1FAE5; color: #065F46; }
        .status-rejected, .status-suspended { background: #FEE2E2; color: #991B1B; }

        .ver-action-btns { display: flex; gap: 6px; }
        .btn-act-approve { padding: 4px 10px; border-radius: 6px; background: #059669; color: #FFFFFF; border: none; font-size: 0.75rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 3px; }
        .btn-act-reject { padding: 4px 10px; border-radius: 6px; background: #EF4444; color: #FFFFFF; border: none; font-size: 0.75rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 3px; }
        .ver-done-text { font-size: 0.75rem; font-weight: 700; color: var(--slate-400); }

        /* User Management */
        .user-filter-bar { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
        .role-filter-pills { display: flex; gap: 6px; }
        .role-pill-btn { padding: 5px 12px; border-radius: 20px; border: 1px solid var(--slate-200); background: var(--slate-50); font-size: 0.75rem; font-weight: 800; color: var(--slate-600); cursor: pointer; }
        .role-pill-btn.active { background: var(--navy-900); color: #FFFFFF; border-color: var(--navy-900); }
        .role-badge { font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
        .role-student { background: #EFF6FF; color: #1D4ED8; }
        .role-recruiter { background: #F3E8FF; color: #6D28D9; }
        .role-admin { background: #ECFDF5; color: #047857; }

        .btn-act-toggle-user { padding: 4px 10px; border-radius: 6px; background: var(--slate-100); border: 1px solid var(--slate-200); font-size: 0.75rem; font-weight: 700; color: var(--navy-900); cursor: pointer; display: flex; align-items: center; gap: 4px; }

        .btn-modal-submit-navy { padding: 9px 18px; border-radius: 10px; background: #0F172A; color: #FFFFFF; font-size: 0.8125rem; font-weight: 800; border: none; }
      `}</style>
    </div>
  );
};
