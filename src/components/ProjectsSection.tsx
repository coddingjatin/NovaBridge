import React, { useState } from 'react';
import { Project } from '../types/profile';
import { CaseStudyModal } from './CaseStudyModal';
import { ExternalLink, Github, Settings, Plus } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onAddProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onAddProject }) => {
  const [selectedCaseStudyProject, setSelectedCaseStudyProject] = useState<Project | null>(null);

  // Return specific tech dot color matching reference screenshot
  const getDotColor = (tech: string): string => {
    switch (tech.toLowerCase()) {
      case 'css': return '#38BDF8'; // Light blue
      case 'javascript': return '#F59E0B'; // Yellow
      case 'html': return '#10B981'; // Green
      case 'typescript': return '#8B5CF6'; // Purple
      case 'dockerfile': return '#EF4444'; // Red
      case 'c++': return '#F97316'; // Orange
      default: return '#64748B';
    }
  };

  return (
    <div className="nb-card projects-card-container">
      <div className="projects-grid-header">
        <h3 className="projects-title-h3">Projects</h3>
        <div className="projects-action-group">
          <button 
            onClick={onAddProject}
            className="btn btn-orange-pill btn-sm"
          >
            <Plus size={14} /> ADD PROJECT
          </button>
          <button className="settings-cog-btn"><Settings size={18} /></button>
        </div>
      </div>

      <div className="projects-banner-subtitle">
        Showcase Your Projects and Share with Peers - Inspire Collaboration and Growth
      </div>

      {/* Grid */}
      <div className="projects-grid-view">
        {projects.map(proj => (
          <div key={proj.id} className="project-grid-card">
            {/* Image Thumbnail */}
            <div className="proj-card-img-box">
              <img src={proj.imageUrl} alt={proj.title} className="proj-card-img" />
              {proj.featured && <span className="case-badge">Case Study</span>}
            </div>

            {/* Content Body */}
            <div className="proj-card-body">
              <div className="proj-title-row">
                <h4 className="proj-name">{proj.title}</h4>
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="proj-external-link">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              {/* GitHub tag matching media_1787145522165.png */}
              {proj.githubUrl && (
                <div className="proj-github-tag">
                  <Github size={13} />
                  <span>{proj.githubUrl.replace('https://github.com/', '')}</span>
                </div>
              )}

              <p className="proj-desc-text">{proj.description}</p>

              {/* Tech Stack badges with color dots */}
              <div className="proj-tech-row">
                {proj.techStack.map(tech => (
                  <span key={tech} className="tech-badge-dot-item">
                    <span className="tech-dot" style={{ backgroundColor: getDotColor(tech) }}></span>
                    <span className="tech-name">{tech}</span>
                  </span>
                ))}
              </div>

              {proj.caseStudy && (
                <button 
                  onClick={() => setSelectedCaseStudyProject(proj)}
                  className="btn btn-orange-outline btn-sm mt-3"
                  style={{ width: '100%' }}
                >
                  View System Architecture Case Study
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudyProject}
        onClose={() => setSelectedCaseStudyProject(null)}
      />

      <style>{`
        .projects-card-container {
          background-color: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-lg);
          padding: 24px;
        }
        .projects-grid-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .projects-title-h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .projects-action-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .settings-cog-btn {
          color: var(--slate-400);
          padding: 4px;
          border-radius: var(--radius-sm);
        }
        .settings-cog-btn:hover {
          background-color: var(--slate-100);
          color: var(--navy-900);
        }
        .projects-banner-subtitle {
          background-color: var(--slate-50);
          border: 1px solid var(--slate-200);
          padding: 10px 14px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--navy-800);
          text-align: center;
          border-radius: var(--radius-sm);
          margin-top: 14px;
          margin-bottom: 20px;
        }
        .projects-grid-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .project-grid-card {
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background-color: #FFFFFF;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .project-grid-card:hover {
          border-color: var(--codolio-orange);
          box-shadow: var(--shadow-md);
        }
        .proj-card-img-box {
          position: relative;
          height: 180px;
          width: 100%;
        }
        .proj-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .case-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: var(--navy-900);
          color: #FFF;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .proj-card-body {
          padding: 16px 20px;
        }
        .proj-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .proj-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .proj-external-link {
          color: var(--slate-400);
        }
        .proj-external-link:hover {
          color: var(--codolio-orange);
        }
        .proj-github-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--slate-500);
          background-color: var(--slate-100);
          padding: 3px 8px;
          border-radius: var(--radius-full);
          margin-top: 6px;
        }
        .proj-desc-text {
          font-size: 0.82rem;
          color: var(--slate-600);
          margin-top: 10px;
          line-height: 1.5;
        }
        .proj-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
        }
        .tech-badge-dot-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-700);
        }
        .tech-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .mt-3 {
          margin-top: 12px;
        }
        @media (max-width: 800px) {
          .projects-grid-view {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
