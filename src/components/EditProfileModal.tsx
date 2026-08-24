import React, { useState } from 'react';
import { UserProfile, SkillCategory, Skill, Project, Education, Experience, Achievement, Certification, ResearchPublication } from '../types/profile';
import { 
  X, 
  User, 
  FileText, 
  GraduationCap, 
  Cpu, 
  FolderGit2, 
  Briefcase, 
  Trophy, 
  Award, 
  BookOpen, 
  Code2, 
  Link as LinkIcon, 
  Save, 
  Download, 
  Upload,
  Plus,
  Trash2,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

interface EditProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: UserProfile) => void;
}

type TabType = 
  | 'basic' 
  | 'about' 
  | 'education' 
  | 'skills' 
  | 'projects' 
  | 'experience' 
  | 'achievements' 
  | 'certifications' 
  | 'research' 
  | 'coding' 
  | 'resume' 
  | 'links';

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [formData, setFormData] = useState<UserProfile>({ ...profile });

  const handleFieldChange = (field: keyof UserProfile, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onSave(updated); // Immediate reactive frontend state sync!
  };

  const handleHandleChange = (key: string, value: string) => {
    const updated = {
      ...formData,
      handles: { ...formData.handles, [key]: value }
    };
    setFormData(updated);
    onSave(updated);
  };

  // Image File Upload -> DataURL converter
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleFieldChange('photoUrl', event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.slug}_profile_backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setFormData(imported);
        onSave(imported);
        alert('Profile data successfully imported!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content edit-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="edit-title-group">
            <User size={20} className="text-royal" />
            <div>
              <h2 className="modal-title">Live Profile & Details Editor</h2>
              <div className="modal-subtitle">Instant reactive synchronization with profile preview</div>
            </div>
          </div>

          <div className="edit-header-actions">
            <button onClick={handleExportJSON} className="btn btn-secondary btn-sm" title="Export Profile JSON">
              <Download size={14} /> Export JSON
            </button>
            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={14} /> Import JSON
              <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
            </label>
            <button onClick={onClose} className="btn btn-primary btn-sm">
              <Save size={14} /> Save & Close
            </button>
          </div>
        </div>

        {/* Edit Layout */}
        <div className="edit-body-grid">
          {/* Sidebar Tabs */}
          <div className="edit-tabs-sidebar">
            <button className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>
              <User size={15} /> Basic Info & Photo
            </button>
            <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
              <FileText size={15} /> About Summary
            </button>
            <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
              <GraduationCap size={15} /> Education
            </button>
            <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
              <Cpu size={15} /> Skills ({formData.skills.length})
            </button>
            <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
              <FolderGit2 size={15} /> Projects ({formData.projects.length})
            </button>
            <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
              <Briefcase size={15} /> Experience
            </button>
            <button className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
              <Trophy size={15} /> Achievements
            </button>
            <button className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>
              <Award size={15} /> Certifications
            </button>
            <button className={`tab-btn ${activeTab === 'coding' ? 'active' : ''}`} onClick={() => setActiveTab('coding')}>
              <Code2 size={15} /> Coding Profiles
            </button>
            <button className={`tab-btn ${activeTab === 'links' ? 'active' : ''}`} onClick={() => setActiveTab('links')}>
              <LinkIcon size={15} /> Social Links
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="edit-tab-content">
            {/* 1. Basic Info & Avatar Upload */}
            {activeTab === 'basic' && (
              <div className="form-section">
                <h3 className="tab-title">Basic Profile & Avatar Photo</h3>
                
                {/* Photo Upload & Preview Box */}
                <div className="photo-edit-preview-box">
                  <div className="photo-avatar-wrap">
                    <img src={formData.photoUrl} alt={formData.fullName} className="preview-avatar-img" />
                    <label className="photo-upload-overlay-btn" title="Upload New Photo">
                      <Camera size={18} />
                      <input type="file" accept="image/*" onChange={handlePhotoFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                  <div className="photo-upload-controls">
                    <div className="photo-upload-title">Profile Picture</div>
                    <div className="photo-upload-sub">Upload an image file from your device or paste a public image URL</div>
                    <div className="photo-btn-row">
                      <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                        <Upload size={14} /> Upload Local Image File
                        <input type="file" accept="image/*" onChange={handlePhotoFileUpload} style={{ display: 'none' }} />
                      </label>
                      <button 
                        type="button" 
                        onClick={() => handleFieldChange('photoUrl', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')}
                        className="btn btn-secondary btn-sm"
                      >
                        Reset Demo Photo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-grid-2" style={{ marginTop: '20px' }}>
                  <div className="form-group">
                    <label>Profile Image URL</label>
                    <input 
                      type="text" 
                      value={formData.photoUrl} 
                      onChange={e => handleFieldChange('photoUrl', e.target.value)} 
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName} 
                      onChange={e => handleFieldChange('fullName', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Professional Headline</label>
                    <input 
                      type="text" 
                      value={formData.headline} 
                      onChange={e => handleFieldChange('headline', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Institution / University</label>
                    <input 
                      type="text" 
                      value={formData.institution} 
                      onChange={e => handleFieldChange('institution', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Degree & Field</label>
                    <input 
                      type="text" 
                      value={formData.degree} 
                      onChange={e => handleFieldChange('degree', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Graduation Year</label>
                    <input 
                      type="text" 
                      value={formData.graduationYear} 
                      onChange={e => handleFieldChange('graduationYear', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input 
                      type="text" 
                      value={formData.location} 
                      onChange={e => handleFieldChange('location', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Availability Status</label>
                    <select 
                      value={formData.availability} 
                      onChange={e => handleFieldChange('availability', e.target.value as any)}
                    >
                      <option value="Available Immediately">Available Immediately</option>
                      <option value="Available in 30 Days">Available in 30 Days</option>
                      <option value="Open to Offers">Open to Offers</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => handleFieldChange('email', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={e => handleFieldChange('phone', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. About Summary */}
            {activeTab === 'about' && (
              <div className="form-section">
                <h3 className="tab-title">Professional About Section</h3>
                <div className="form-group">
                  <label>Professional Bio & Engineering Ethos</label>
                  <textarea 
                    rows={8}
                    value={formData.about} 
                    onChange={e => handleFieldChange('about', e.target.value)} 
                  />
                </div>
              </div>
            )}

            {/* 3. Skills Manager */}
            {activeTab === 'skills' && (
              <div className="form-section">
                <div className="tab-header-row">
                  <h3 className="tab-title">Verified Skills Matrix</h3>
                  <button 
                    type="button"
                    onClick={() => {
                      const newSkill: Skill = {
                        id: `s_${Date.now()}`,
                        name: 'New Technical Skill',
                        category: 'Languages',
                        level: 'Proficient',
                        proofType: 'project',
                        proofTitle: 'Verified by Repository',
                        verified: true
                      };
                      handleFieldChange('skills', [...formData.skills, newSkill]);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus size={14} /> Add Skill
                  </button>
                </div>

                <div className="skills-edit-list">
                  {formData.skills.map((skill, index) => (
                    <div key={skill.id} className="edit-item-row">
                      <input 
                        type="text" 
                        value={skill.name} 
                        onChange={e => {
                          const updated = [...formData.skills];
                          updated[index].name = e.target.value;
                          handleFieldChange('skills', updated);
                        }} 
                        className="input-sm"
                        placeholder="Skill Name"
                      />
                      <select
                        value={skill.category}
                        onChange={e => {
                          const updated = [...formData.skills];
                          updated[index].category = e.target.value as SkillCategory;
                          handleFieldChange('skills', updated);
                        }}
                        className="input-sm"
                      >
                        <option value="Languages">Languages</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Tools">Tools</option>
                      </select>
                      <select
                        value={skill.level}
                        onChange={e => {
                          const updated = [...formData.skills];
                          updated[index].level = e.target.value as any;
                          handleFieldChange('skills', updated);
                        }}
                        className="input-sm"
                      >
                        <option value="Expert">Expert</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Proficient">Proficient</option>
                      </select>
                      <button 
                        type="button" 
                        onClick={() => {
                          const updated = formData.skills.filter(s => s.id !== skill.id);
                          handleFieldChange('skills', updated);
                        }}
                        className="btn-icon-danger"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Projects Manager */}
            {activeTab === 'projects' && (
              <div className="form-section">
                <div className="tab-header-row">
                  <h3 className="tab-title">Projects Showcase</h3>
                  <button 
                    type="button"
                    onClick={() => {
                      const newProj: Project = {
                        id: `p_${Date.now()}`,
                        title: 'New Engineering Project',
                        subtitle: 'Scalable Full-Stack or Systems Application',
                        description: 'Project details and architectural features.',
                        role: 'Lead Developer',
                        outcomes: ['Optimized throughput by 30%'],
                        techStack: ['TypeScript', 'React.js'],
                        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                        featured: true
                      };
                      handleFieldChange('projects', [...formData.projects, newProj]);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>

                <div className="projects-edit-list">
                  {formData.projects.map((proj, idx) => (
                    <div key={proj.id} className="edit-card-box">
                      <div className="form-group">
                        <label>Project Title</label>
                        <input 
                          type="text" 
                          value={proj.title} 
                          onChange={e => {
                            const updated = [...formData.projects];
                            updated[idx].title = e.target.value;
                            handleFieldChange('projects', updated);
                          }} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Subtitle</label>
                        <input 
                          type="text" 
                          value={proj.subtitle} 
                          onChange={e => {
                            const updated = [...formData.projects];
                            updated[idx].subtitle = e.target.value;
                            handleFieldChange('projects', updated);
                          }} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Image URL</label>
                        <input 
                          type="text" 
                          value={proj.imageUrl} 
                          onChange={e => {
                            const updated = [...formData.projects];
                            updated[idx].imageUrl = e.target.value;
                            handleFieldChange('projects', updated);
                          }} 
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = formData.projects.filter(p => p.id !== proj.id);
                          handleFieldChange('projects', updated);
                        }}
                        className="btn btn-danger btn-sm"
                        style={{ marginTop: '8px' }}
                      >
                        <Trash2 size={13} /> Remove Project
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Coding Handles */}
            {activeTab === 'coding' && (
              <div className="form-section">
                <h3 className="tab-title">Coding Handles</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>GitHub Username</label>
                    <input 
                      type="text" 
                      value={formData.handles.github} 
                      onChange={e => handleHandleChange('github', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>LeetCode Username</label>
                    <input 
                      type="text" 
                      value={formData.handles.leetcode} 
                      onChange={e => handleHandleChange('leetcode', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Codeforces Handle</label>
                    <input 
                      type="text" 
                      value={formData.handles.codeforces} 
                      onChange={e => handleHandleChange('codeforces', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>CodeChef Handle</label>
                    <input 
                      type="text" 
                      value={formData.handles.codechef} 
                      onChange={e => handleHandleChange('codechef', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. Social Links */}
            {activeTab === 'links' && (
              <div className="form-section">
                <h3 className="tab-title">Social Profile Links</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>LinkedIn Profile URL</label>
                    <input 
                      type="text" 
                      value={formData.handles.linkedin} 
                      onChange={e => handleHandleChange('linkedin', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Portfolio Website URL</label>
                    <input 
                      type="text" 
                      value={formData.handles.portfolio} 
                      onChange={e => handleHandleChange('portfolio', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(15,23,42,0.6);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          backdrop-filter: blur(4px);
        }
        .edit-modal {
          background: #FFFFFF;
          border-radius: 20px;
          width: 100%;
          max-width: 960px;
          height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 60px rgba(15,23,42,0.25);
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--slate-200);
          background: #FFFFFF;
        }
        .edit-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .edit-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .edit-body-grid {
          display: grid;
          grid-template-columns: 220px 1fr;
          flex: 1;
          overflow: hidden;
        }
        .edit-tabs-sidebar {
          background: var(--slate-50);
          border-right: 1px solid var(--slate-200);
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          border: none;
          background: transparent;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
          text-align: left;
          cursor: pointer;
        }
        .tab-btn.active {
          background: #FFFFFF;
          color: var(--codolio-orange);
          box-shadow: var(--shadow-sm);
        }

        .edit-tab-content {
          padding: 24px;
          overflow-y: auto;
          background: #FFFFFF;
        }
        .tab-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-bottom: 16px;
        }

        /* Photo Upload Box */
        .photo-edit-preview-box {
          display: flex;
          align-items: center;
          gap: 20px;
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          padding: 16px 20px;
          border-radius: 16px;
        }
        .photo-avatar-wrap {
          position: relative;
          width: 84px;
          height: 84px;
          flex-shrink: 0;
        }
        .preview-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--slate-200);
        }
        .photo-upload-overlay-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--codolio-orange);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }
        .photo-upload-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .photo-upload-sub {
          font-size: 0.78rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .photo-btn-row {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.85rem;
          color: var(--navy-900);
          outline: none;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--codolio-orange);
        }

        .skills-edit-list, .projects-edit-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 14px;
        }
        .edit-item-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .input-sm {
          padding: 8px 10px;
          border: 1px solid var(--slate-200);
          border-radius: 8px;
          font-size: 0.82rem;
        }
        .btn-icon-danger {
          background: #FEE2E2;
          color: #EF4444;
          border: none;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
        }
        .edit-card-box {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .btn-danger {
          background: #EF4444;
          color: #FFFFFF;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
