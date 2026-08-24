import React from 'react';
import { UserCheck } from 'lucide-react';

interface AboutSectionProps {
  about: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  return (
    <div className="nb-card about-card">
      <div className="nb-section-title">
        <UserCheck size={20} className="text-royal" />
        <span>Professional Overview</span>
      </div>
      
      <p className="about-text">{about}</p>

      <style>{`
        .about-card {
          margin-top: 20px;
        }
        .about-text {
          font-size: 0.95rem;
          color: var(--slate-600);
          line-height: 1.7;
          margin-top: 14px;
        }
      `}</style>
    </div>
  );
};
