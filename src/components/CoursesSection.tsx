import React, { useState } from 'react';
import { Course, ProfileBadge } from '../types/profile';
import { BookOpen, Award, CheckCircle2, ExternalLink, Sparkles, ShieldCheck, Star } from 'lucide-react';

interface CoursesSectionProps {
  courses: Course[];
  badges: ProfileBadge[];
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ courses, badges }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'badges'>('courses');

  const getRarityBadgeStyle = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return { bg: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)', border: '#F97316', color: '#C2410C', tag: '✨ LEGENDARY' };
      case 'Gold':
        return { bg: 'linear-gradient(135deg, #FEFCE8 0%, #FEF08A 100%)', border: '#EAB308', color: '#A16207', tag: '👑 GOLD' };
      case 'Silver':
        return { bg: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', border: '#94A3B8', color: '#334155', tag: '⚡ SILVER' };
      default:
        return { bg: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)', border: '#EF4444', color: '#B91C1C', tag: '🏆 BRONZE' };
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LeetCode': return '🟠';
      case 'Codeforces': return '🔷';
      case 'GitHub': return '🐙';
      case 'CodeChef': return '👨‍🍳';
      case 'HackerRank': return '🟢';
      default: return '🚀';
    }
  };

  return (
    <div className="courses-section-root">
      <div className="color-card color-card-purple">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          {/* Header Controls */}
          <div className="courses-header-flex">
            <div className="section-title-wrap">
              <div className="title-icon-badge">
                <BookOpen size={18} className="text-purple-600" />
              </div>
              <div>
                <h3 className="courses-main-heading">Courses & Skill Badges</h3>
                <p className="courses-sub-heading">Verified academic coursework, certifications & competitive programming awards</p>
              </div>
            </div>

            <div className="courses-tab-pills">
              <button 
                onClick={() => setActiveTab('courses')} 
                className={`tab-pill-btn ${activeTab === 'courses' ? 'active-purple' : ''}`}
              >
                <BookOpen size={14} /> Courses ({courses.length})
              </button>
              <button 
                onClick={() => setActiveTab('badges')} 
                className={`tab-pill-btn ${activeTab === 'badges' ? 'active-amber' : ''}`}
              >
                <Award size={14} /> Badges ({badges.length})
              </button>
            </div>
          </div>

          {/* Courses Tab View */}
          {activeTab === 'courses' && (
            <div className="courses-cards-grid">
              {courses.map(course => (
                <div key={course.id} className="course-card-item">
                  <div className="course-top-row">
                    <div className="course-platform-chip">
                      <Sparkles size={13} style={{ color: '#7C3AED' }} />
                      <span>{course.platform}</span>
                    </div>
                    {course.gradeOrScore && (
                      <span className="course-grade-badge">{course.gradeOrScore}</span>
                    )}
                  </div>

                  <h4 className="course-title">{course.title}</h4>
                  <div className="course-instructor">Instructor: <strong>{course.instructor}</strong> • Completed {course.completionDate}</div>

                  {/* Progress Bar */}
                  <div className="course-progress-box">
                    <div className="progress-info-row">
                      <span className="progress-lbl">Completion Progress</span>
                      <span className="progress-num">{course.progressPercentage}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${course.progressPercentage}%` }}></div>
                    </div>
                  </div>

                  {/* Skills Learned */}
                  <div className="course-skills-chips">
                    {course.skillsLearned.map(skill => (
                      <span key={skill} className="skill-chip-purple">{skill}</span>
                    ))}
                  </div>

                  {course.certificateUrl && (
                    <a 
                      href={course.certificateUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-view-certificate"
                    >
                      <span>Verify Certificate</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Badges Tab View */}
          {activeTab === 'badges' && (
            <div className="badges-cards-grid">
              {badges.map(badge => {
                const rarityStyle = getRarityBadgeStyle(badge.rarity);
                return (
                  <div 
                    key={badge.id} 
                    className="badge-card-item"
                    style={{ background: rarityStyle.bg, borderColor: rarityStyle.border }}
                  >
                    <div className="badge-rarity-tag" style={{ color: rarityStyle.color }}>
                      {rarityStyle.tag}
                    </div>

                    <div className="badge-icon-main">
                      <span className="badge-emoji">{getPlatformIcon(badge.platform)}</span>
                    </div>

                    <h4 className="badge-name">{badge.name}</h4>
                    <div className="badge-platform-lbl">{badge.platform} • Earned {badge.earnedDate}</div>
                    <p className="badge-desc">{badge.description}</p>

                    <div className="badge-footer-status">
                      <ShieldCheck size={14} style={{ color: '#10B981' }} />
                      <span>Cryptographically Verified</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .courses-section-root {
          margin-top: 20px;
        }
        .courses-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--slate-100);
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .section-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .title-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #F3E8FF;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .courses-main-heading {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .courses-sub-heading {
          font-size: 0.78rem;
          color: var(--slate-500);
        }

        .courses-tab-pills {
          display: flex;
          gap: 8px;
          background: var(--slate-100);
          padding: 4px;
          border-radius: 10px;
        }
        .tab-pill-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
          transition: all 0.15s ease;
        }
        .tab-pill-btn.active-purple {
          background: #FFFFFF;
          color: #7C3AED;
          box-shadow: var(--shadow-sm);
        }
        .tab-pill-btn.active-amber {
          background: #FFFFFF;
          color: #D97706;
          box-shadow: var(--shadow-sm);
        }

        /* Courses Grid */
        .courses-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .course-card-item {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .course-card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.1);
          border-color: #DDD6FE;
        }
        .course-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .course-platform-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #7C3AED;
          background: #F3E8FF;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .course-grade-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: #065F46;
          background: #D1FAE5;
          padding: 2px 8px;
          border-radius: 6px;
        }
        .course-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1.3;
        }
        .course-instructor {
          font-size: 0.75rem;
          color: var(--slate-500);
        }
        .course-progress-box {
          margin-top: 4px;
        }
        .progress-info-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--slate-600);
          margin-bottom: 4px;
        }
        .progress-track {
          width: 100%;
          height: 6px;
          background: var(--slate-100);
          border-radius: 10px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7C3AED, #A78BFA);
          border-radius: 10px;
        }
        .course-skills-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .skill-chip-purple {
          font-size: 0.72rem;
          font-weight: 700;
          color: #6D28D9;
          background: #F5F3FF;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #EDE9FE;
        }
        .btn-view-certificate {
          margin-top: auto;
          padding: 8px 12px;
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--navy-900);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .btn-view-certificate:hover {
          background: #F3E8FF;
          color: #7C3AED;
          border-color: #C4B5FD;
        }

        /* Badges Grid */
        .badges-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }
        .badge-card-item {
          border: 1.5px solid;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 4px 12px rgba(15,23,42,0.06);
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .badge-card-item:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 24px rgba(15,23,42,0.12);
        }
        .badge-rarity-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .badge-icon-main {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .badge-emoji { font-size: 1.6rem; }
        .badge-name {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .badge-platform-lbl {
          font-size: 0.72rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .badge-desc {
          font-size: 0.75rem;
          color: var(--slate-600);
          margin-top: 8px;
          line-height: 1.35;
        }
        .badge-footer-status {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #065F46;
          background: rgba(255,255,255,0.7);
          padding: 4px 10px;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};
