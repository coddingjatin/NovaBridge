import React from 'react';
import { Education, Experience } from '../types/profile';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Building2, Award } from 'lucide-react';

interface TimelineSectionProps {
  experience: Experience[];
  education: Education[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ experience, education }) => {
  return (
    <div className="timeline-grid-container">
      {/* Work Experience Section */}
      <div className="color-card color-card-royal">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="section-title-wrap" style={{ marginBottom: '20px' }}>
            <div className="title-icon-badge" style={{ background: '#EFF6FF' }}>
              <Briefcase size={20} style={{ color: '#2563EB' }} />
            </div>
            <div>
              <h3 className="section-main-heading">Professional Experience</h3>
              <p className="section-sub-heading">Verified industry software engineering roles & open source contributions</p>
            </div>
          </div>

          <div className="timeline-list-cards">
            {experience.map(exp => (
              <div key={exp.id} className="experience-item-card">
                <div className="exp-header-row">
                  <div className="company-logo-avatar">
                    {exp.company.charAt(0)}
                  </div>
                  <div className="exp-meta-group">
                    <h4 className="exp-role-title">{exp.role}</h4>
                    <div className="exp-company-name">
                      <Building2 size={13} className="text-slate-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <span className={`exp-type-badge ${exp.type === 'Full-time' ? 'badge-emerald' : exp.type === 'Internship' ? 'badge-royal' : 'badge-amber'}`}>
                    {exp.type}
                  </span>
                </div>

                <div className="timeline-meta-row">
                  <span className="meta-pill"><Calendar size={13} /> {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  <span className="meta-pill"><MapPin size={13} /> {exp.location}</span>
                </div>

                <ul className="timeline-bullet-list">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                  <div className="skills-used-row">
                    <span className="skills-label">Tech Stack & Tools:</span>
                    <div className="skills-chips-list">
                      {exp.skillsUsed.map(s => (
                        <span key={s} className="skill-chip-blue">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="color-card color-card-emerald">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="section-title-wrap" style={{ marginBottom: '20px' }}>
            <div className="title-icon-badge" style={{ background: '#ECFDF5' }}>
              <GraduationCap size={20} style={{ color: '#059669' }} />
            </div>
            <div>
              <h3 className="section-main-heading">Academic Education</h3>
              <p className="section-sub-heading">Degrees, academic achievements, CGPA benchmarks & TA roles</p>
            </div>
          </div>

          <div className="timeline-list-cards">
            {education.map(edu => (
              <div key={edu.id} className="experience-item-card edu-item-card">
                <div className="exp-header-row">
                  <div className="company-logo-avatar edu-logo-avatar">
                    🎓
                  </div>
                  <div className="exp-meta-group">
                    <h4 className="exp-role-title">{edu.degree}</h4>
                    <div className="exp-company-name">
                      <GraduationCap size={13} className="text-slate-400" />
                      <span>{edu.institution}</span>
                    </div>
                  </div>
                  <span className="cgpa-grade-badge">
                    <Award size={13} /> {edu.grade}
                  </span>
                </div>

                <div className="timeline-meta-row">
                  <span className="meta-pill"><Calendar size={13} /> {edu.startYear} - {edu.endYear}</span>
                  <span className="meta-pill"><MapPin size={13} /> {edu.location}</span>
                </div>

                <div className="edu-field-row">
                  <span>Major / Field of Study:</span> <strong>{edu.fieldOfStudy}</strong>
                </div>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="timeline-bullet-list">
                    {edu.highlights.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        .section-main-heading {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .section-sub-heading {
          font-size: 0.78rem;
          color: var(--slate-500);
        }
        .timeline-list-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .experience-item-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .experience-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(15,23,42,0.08);
        }
        .exp-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .company-logo-avatar {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .edu-logo-avatar {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          font-size: 1.3rem;
        }
        .exp-meta-group {
          flex: 1;
        }
        .exp-role-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .exp-company-name {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
          margin-top: 2px;
        }
        .exp-type-badge {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .badge-emerald { background: #D1FAE5; color: #065F46; }
        .badge-royal { background: #DBEAFE; color: #1E40AF; }
        .badge-amber { background: #FEF3C7; color: #92400E; }

        .cgpa-grade-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #065F46;
          background: #D1FAE5;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .timeline-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .meta-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--slate-500);
          background: var(--slate-100);
          padding: 3px 8px;
          border-radius: 6px;
        }
        .edu-field-row {
          font-size: 0.8125rem;
          color: var(--slate-600);
          background: #ECFDF5;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #A7F3D0;
        }

        .timeline-bullet-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0;
          list-style: none;
        }
        .timeline-bullet-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--slate-700);
          line-height: 1.4;
        }

        .skills-used-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding-top: 8px;
          border-top: 1px solid var(--slate-100);
        }
        .skills-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--slate-500);
        }
        .skills-chips-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-chip-blue {
          font-size: 0.72rem;
          font-weight: 700;
          color: #1D4ED8;
          background: #EFF6FF;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #DBEAFE;
        }
      `}</style>
    </div>
  );
};
