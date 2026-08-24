import React, { useState } from 'react';
import { BookOpen, Sparkles, Bookmark, CheckCircle2, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface RecommendedLearningProps {
  currentSkills: string[];
  targetRole: string;
  onSaveCourse?: (courseTitle: string) => void;
}

export interface RecommendedCourseItem {
  id: string;
  title: string;
  provider: string;
  level: string;
  duration: string;
  primarySkill: string;
  reason: string;
  niche: string;
  url: string;
  saved?: boolean;
}

const NICHES = [
  'Software Development',
  'AI / ML',
  'Data Science',
  'Cybersecurity',
  'Cloud & DevOps',
  'Web Development',
  'Mobile Development',
  'Blockchain',
  'UI/UX',
  'Product Development'
];

const ALL_RECOMMENDED_COURSES: RecommendedCourseItem[] = [
  // Software Development
  {
    id: 'rc_sw_1',
    title: 'Advanced React Patterns & Frontend Architecture',
    provider: 'NovaBridge Engineering Academy',
    level: 'Advanced',
    duration: '6 Weeks (24 hrs)',
    primarySkill: 'React.js Architecture',
    reason: 'Your React skills are strong, but advanced frontend architecture is missing from your profile.',
    niche: 'Software Development',
    url: 'https://novabridge.dev/courses/react-architecture'
  },
  {
    id: 'rc_sw_2',
    title: 'System Design Fundamentals & Distributed Systems',
    provider: 'MIT OpenCourseWare',
    level: 'Intermediate - Advanced',
    duration: '8 Weeks (32 hrs)',
    primarySkill: 'Distributed Systems',
    reason: 'System design is a critical requirement for your target role as Full Stack Engineer.',
    niche: 'Software Development',
    url: 'https://novabridge.dev/courses/system-design'
  },
  {
    id: 'rc_sw_3',
    title: 'PostgreSQL & High-Throughput Database Optimization',
    provider: 'PostgreSQL Certified Track',
    level: 'Intermediate',
    duration: '4 Weeks (16 hrs)',
    primarySkill: 'PostgreSQL',
    reason: 'Strengthen your backend database indexing & query optimization knowledge.',
    niche: 'Software Development',
    url: 'https://novabridge.dev/courses/postgres-mastery'
  },

  // AI / ML
  {
    id: 'rc_ai_1',
    title: 'Python for Machine Learning & Data Pipelines',
    provider: 'DeepLearning.AI',
    level: 'Intermediate',
    duration: '5 Weeks (20 hrs)',
    primarySkill: 'PyTorch / NumPy',
    reason: 'Essential foundation to scale vector embeddings and neural models in Python.',
    niche: 'AI / ML',
    url: 'https://novabridge.dev/courses/python-ml'
  },
  {
    id: 'rc_ai_2',
    title: 'Deep Learning & Neural Network Specialization',
    provider: 'Coursera (Andrew Ng)',
    level: 'Advanced',
    duration: '10 Weeks (40 hrs)',
    primarySkill: 'CNNs & Transformers',
    reason: 'High demand for AI engineers capable of fine-tuning LLMs and attention mechanisms.',
    niche: 'AI / ML',
    url: 'https://novabridge.dev/courses/deep-learning'
  },
  {
    id: 'rc_ai_3',
    title: 'MLOps: Production Machine Learning System Design',
    provider: 'AWS Machine Learning',
    level: 'Advanced',
    duration: '6 Weeks (24 hrs)',
    primarySkill: 'MLOps & Model Serving',
    reason: 'Bridge model training with automated deployment and real-time inference monitoring.',
    niche: 'AI / ML',
    url: 'https://novabridge.dev/courses/mlops-prod'
  },

  // Cybersecurity
  {
    id: 'rc_sec_1',
    title: 'Network Security & Penetration Testing Fundamentals',
    provider: 'SANS Institute',
    level: 'Intermediate',
    duration: '6 Weeks (24 hrs)',
    primarySkill: 'Network Defense',
    reason: 'Build core threat analysis and packet inspection skills required for SecOps.',
    niche: 'Cybersecurity',
    url: 'https://novabridge.dev/courses/netsec'
  },
  {
    id: 'rc_sec_2',
    title: 'Web Application Security & OWASP Top 10 Audit',
    provider: 'Offensive Security',
    level: 'Advanced',
    duration: '4 Weeks (18 hrs)',
    primarySkill: 'Application Security',
    reason: 'Identify and patch authentication vulnerabilities and SQLi / XSS vectors.',
    niche: 'Cybersecurity',
    url: 'https://novabridge.dev/courses/websec'
  },

  // Cloud & DevOps
  {
    id: 'rc_dev_1',
    title: 'Kubernetes Administrator (CKA) & Container Orchestration',
    provider: 'CNCF Official Track',
    level: 'Advanced',
    duration: '8 Weeks (30 hrs)',
    primarySkill: 'Docker & Kubernetes',
    reason: 'Highly rated by tech recruiters for cloud-native microservices infrastructure roles.',
    niche: 'Cloud & DevOps',
    url: 'https://novabridge.dev/courses/cka-prep'
  },
  {
    id: 'rc_dev_2',
    title: 'Terraform & Infrastructure as Code (IaC) Masterclass',
    provider: 'HashiCorp Academy',
    level: 'Intermediate',
    duration: '4 Weeks (16 hrs)',
    primarySkill: 'Terraform & AWS',
    reason: 'Automate multi-region cloud provisioning across AWS and GCP environments.',
    niche: 'Cloud & DevOps',
    url: 'https://novabridge.dev/courses/terraform'
  }
];

export const RecommendedLearningSection: React.FC<RecommendedLearningProps> = ({
  currentSkills,
  targetRole,
  onSaveCourse
}) => {
  const [selectedNiche, setSelectedNiche] = useState<string>('Software Development');
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredCourses = ALL_RECOMMENDED_COURSES.filter(c => c.niche === selectedNiche);

  const toggleSave = (course: RecommendedCourseItem) => {
    if (savedCourseIds.includes(course.id)) {
      setSavedCourseIds(savedCourseIds.filter(id => id !== course.id));
    } else {
      setSavedCourseIds([...savedCourseIds, course.id]);
      if (onSaveCourse) onSaveCourse(course.title);
      setToastMsg(`Saved "${course.title}" to your learning roadmap!`);
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div className="recommended-learning-card color-card color-card-purple" style={{ marginBottom: '24px' }}>
      <div className="color-card-ribbon"></div>
      <div className="color-card-inner">
        {/* Toast */}
        {toastMsg && (
          <div className="toast-notification-subtle">
            <CheckCircle2 size={15} style={{ color: '#10B981' }} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="rec-header-row">
          <div className="rec-title-group">
            <div className="rec-icon-wrap">
              <Sparkles size={18} style={{ color: '#7C3AED' }} />
            </div>
            <div>
              <h3 className="rec-main-title">Recommended Learning</h3>
              <p className="rec-sub-title">Personalized recommendations tailored to your current skills & target role: <strong>{targetRole || 'Full Stack Engineer'}</strong></p>
            </div>
          </div>

          <span className="rec-skill-readiness-pill">
            <ShieldCheck size={13} /> 78% Readiness Match
          </span>
        </div>

        {/* Niche Selection Chips */}
        <div className="niche-selection-block">
          <div className="niche-label-text">
            <Compass size={14} /> Explore Your Niche:
          </div>
          <div className="niche-chips-flex">
            {NICHES.map(niche => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`niche-chip-btn ${selectedNiche === niche ? 'active' : ''}`}
              >
                {niche}
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Courses Cards Grid */}
        <div className="recommended-courses-grid">
          {filteredCourses.map(course => {
            const isSaved = savedCourseIds.includes(course.id);
            return (
              <div key={course.id} className="rec-course-item-card">
                <div className="rec-card-top">
                  <span className="rec-provider-badge">{course.provider}</span>
                  <span className="rec-duration-tag">{course.duration}</span>
                </div>

                <h4 className="rec-course-title">{course.title}</h4>
                <div className="rec-skill-tag-row">
                  <span className="rec-level-pill">{course.level}</span>
                  <span className="rec-skill-pill">{course.primarySkill}</span>
                </div>

                <div className="rec-reason-box">
                  <strong>Reason:</strong> {course.reason}
                </div>

                <div className="rec-card-actions">
                  <button 
                    onClick={() => toggleSave(course)} 
                    className={`btn-save-rec ${isSaved ? 'saved' : ''}`}
                  >
                    <Bookmark size={14} fill={isSaved ? '#7C3AED' : 'none'} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-view-rec"
                  >
                    <span>View Course</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .recommended-learning-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 16px;
        }

        .toast-notification-subtle {
          position: absolute;
          top: 12px;
          right: 16px;
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #065F46;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(16,185,129,0.12);
        }

        .rec-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--slate-100);
          gap: 16px;
          flex-wrap: wrap;
        }
        .rec-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rec-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #F3E8FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rec-main-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .rec-sub-title {
          font-size: 0.8125rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .rec-skill-readiness-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #6D28D9;
          background: #F3E8FF;
          padding: 5px 12px;
          border-radius: 20px;
        }

        /* Niche Selection Block */
        .niche-selection-block {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .niche-label-text {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--navy-900);
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .niche-chips-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .niche-chip-btn {
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .niche-chip-btn.active {
          background: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }

        /* Cards Grid */
        .recommended-courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        .rec-course-item-card {
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
        .rec-course-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.08);
          border-color: #DDD6FE;
        }

        .rec-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .rec-provider-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: #6D28D9;
          background: #F3E8FF;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .rec-duration-tag {
          font-size: 0.72rem;
          color: var(--slate-500);
          font-weight: 600;
        }

        .rec-course-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1.35;
        }

        .rec-skill-tag-row {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .rec-level-pill {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--slate-600);
          background: var(--slate-100);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .rec-skill-pill {
          font-size: 0.7rem;
          font-weight: 800;
          color: #1D4ED8;
          background: #EFF6FF;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .rec-reason-box {
          font-size: 0.78rem;
          color: var(--slate-600);
          background: #F8FAFC;
          border-left: 3px solid #7C3AED;
          padding: 8px 10px;
          border-radius: 4px;
          line-height: 1.4;
        }
        .rec-reason-box strong { color: var(--navy-900); }

        .rec-card-actions {
          margin-top: auto;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .btn-save-rec {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
        }
        .btn-save-rec.saved {
          background: #F3E8FF;
          color: #7C3AED;
          border-color: #C4B5FD;
        }

        .btn-view-rec {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          background: var(--navy-900);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .btn-view-rec:hover {
          background: var(--codolio-orange);
        }
      `}</style>
    </div>
  );
};
