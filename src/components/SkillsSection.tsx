import React, { useState } from 'react';
import { Skill, SkillCategory } from '../types/profile';
import { Cpu, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
}

const CATEGORIES: ('All' | SkillCategory)[] = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'AI/ML',
  'Tools'
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillCategory>('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="nb-card skills-card">
      <div className="skills-header">
        <div>
          <div className="nb-section-title">
            <Cpu size={20} className="text-royal" />
            <span>Verified Skills & Technical Proof</span>
          </div>
          <div className="nb-section-subtitle">
            Skills are backed by empirical code proof, repository commits, and competitive rankings.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.map(skill => (
          <div key={skill.id} className="skill-item-card">
            <div className="skill-top-row">
              <span className="skill-name">{skill.name}</span>
              <span className={`nb-badge ${getLevelBadgeClass(skill.level)}`}>
                {skill.level}
              </span>
            </div>

            <div className="skill-category-label">
              Category: <span className="cat-text">{skill.category}</span>
            </div>

            <div className="skill-proof-box">
              <ShieldCheck size={14} className="proof-icon text-royal" />
              <div className="proof-content">
                <div className="proof-label">Proof of Competency</div>
                <div className="proof-title">{skill.proofTitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .skills-card {
          margin-top: 24px;
        }
        .skills-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--slate-200);
          margin-bottom: 20px;
        }
        .category-filters {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .cat-tab {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: var(--radius-md);
          color: var(--slate-600);
          background-color: var(--slate-100);
          border: 1px solid var(--slate-200);
          transition: all var(--transition-fast);
        }
        .cat-tab:hover {
          color: var(--navy-900);
          background-color: var(--slate-200);
        }
        .cat-tab.active {
          background-color: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .skill-item-card {
          background-color: var(--bg-card);
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-md);
          padding: 16px;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .skill-item-card:hover {
          border-color: var(--royal-600);
          box-shadow: var(--shadow-sm);
        }
        .skill-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .skill-name {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .skill-category-label {
          font-size: 0.75rem;
          color: var(--slate-500);
          margin-top: 4px;
        }
        .cat-text {
          font-weight: 600;
          color: var(--slate-600);
        }
        .skill-proof-box {
          margin-top: 12px;
          background-color: var(--royal-50);
          border: 1px solid var(--royal-100);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .proof-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .proof-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--royal-700);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .proof-title {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--navy-800);
          margin-top: 2px;
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
};

function getLevelBadgeClass(level: string): string {
  switch (level) {
    case 'Expert': return 'badge-royal';
    case 'Advanced': return 'badge-emerald';
    case 'Intermediate': return 'badge-slate';
    default: return 'badge-slate';
  }
}
