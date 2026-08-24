import React, { useState, useEffect } from 'react';
import {
  X, Save, Github, Linkedin, Globe, Code2, Trophy, Star, Terminal, ExternalLink, Check, AlertCircle, User, Mail, Twitter
} from 'lucide-react';
import { UserProfile, CodingHandles, LinkedInStats, CodeChefStats, HackerRankStats, CodeStudioStats } from '../types/profile';

interface UpdateLinksModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    handles: CodingHandles,
    linkedin: LinkedInStats,
    codechef: CodeChefStats,
    hackerrank: HackerRankStats,
    codestudio: CodeStudioStats
  ) => void;
}

type Section = 'social' | 'coding';

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  prefix?: string;
  icon: React.ReactNode;
  color: string;
  helpText?: string;
}

const socialFields: FieldDef[] = [
  { key: 'email',     label: 'Email',           placeholder: 'you@example.com',         icon: <Mail size={15} />,     color: '#6366F1', helpText: 'Your public contact email' },
  { key: 'linkedin',  label: 'LinkedIn URL',     placeholder: 'https://linkedin.com/in/yourname', icon: <Linkedin size={15} />, color: '#0A66C2', helpText: 'Full LinkedIn profile URL' },
  { key: 'twitter',   label: 'X / Twitter',      placeholder: 'yourhandle',              prefix: 'x.com/',             icon: <Twitter size={15} />,  color: '#1A1A1A', helpText: 'Twitter/X username (without @)' },
  { key: 'portfolio', label: 'Portfolio Website', placeholder: 'https://yoursite.com',   icon: <Globe size={15} />,    color: '#0891B2', helpText: 'Your personal or portfolio website' },
  { key: 'devfolio',  label: 'Devfolio',         placeholder: 'yourusername',            prefix: 'devfolio.co/@',      icon: <User size={15} />,     color: '#3B82F6', helpText: 'Devfolio username' },
];

const codingFields: FieldDef[] = [
  { key: 'github',     label: 'GitHub',      placeholder: 'yourusername', prefix: 'github.com/',         icon: <Github size={15} />,    color: '#1F2937' },
  { key: 'leetcode',   label: 'LeetCode',    placeholder: 'yourusername', prefix: 'leetcode.com/u/',     icon: <Code2 size={15} />,     color: '#FFA116' },
  { key: 'codeforces', label: 'Codeforces',  placeholder: 'yourusername', prefix: 'codeforces.com/profile/', icon: <Trophy size={15} />,color: '#1744B0' },
  { key: 'codechef',   label: 'CodeChef',    placeholder: 'yourusername', prefix: 'codechef.com/users/',  icon: <Star size={15} />,     color: '#5B4638' },
  { key: 'hackerrank', label: 'HackerRank',  placeholder: 'yourusername', prefix: 'hackerrank.com/profile/', icon: <Terminal size={15} />, color: '#00EA64' },
  { key: 'codestudio', label: 'Code Studio', placeholder: 'yourusername', prefix: 'naukri.com/code360/profile/', icon: <Code2 size={15} />, color: '#F97316' },
  { key: 'linkedinHandle', label: 'LinkedIn Followers', placeholder: '1500', icon: <Linkedin size={15} />, color: '#0A66C2', helpText: 'Number of followers' },
];

export const UpdateLinksModal: React.FC<UpdateLinksModalProps> = ({ profile, isOpen, onClose, onSave }) => {
  const [section, setSection] = useState<Section>('social');
  const [saved, setSaved] = useState(false);

  // Social links state
  const [email, setEmail] = useState(profile.email || '');
  const [linkedin, setLinkedin] = useState(profile.handles.linkedin || profile.linkedInStats.url || '');
  const [twitter, setTwitter] = useState(profile.handles.leetcode || '');  // twitter handle stored separately
  const [portfolio, setPortfolio] = useState(profile.handles.portfolio || '');
  const [devfolio, setDevfolio] = useState(profile.handles.devfolio || '');

  // Coding handles state
  const [github, setGithub] = useState(profile.handles.github || '');
  const [leetcode, setLeetcode] = useState(profile.handles.leetcode || '');
  const [codeforces, setCodeforces] = useState(profile.handles.codeforces || '');
  const [codechef, setCodechef] = useState(profile.handles.codechef || '');
  const [hackerrank, setHackerrank] = useState(profile.handles.hackerrank || '');
  const [codestudio, setCodestudio] = useState(profile.handles.codestudio || '');
  const [linkedinFollowers, setLinkedinFollowers] = useState(String(profile.linkedInStats.followersCount || ''));

  useEffect(() => {
    if (isOpen) {
      setEmail(profile.email || '');
      setLinkedin(profile.handles.linkedin || profile.linkedInStats.url || '');
      setPortfolio(profile.handles.portfolio || '');
      setDevfolio(profile.handles.devfolio || '');
      setGithub(profile.handles.github || '');
      setLeetcode(profile.handles.leetcode || '');
      setCodeforces(profile.handles.codeforces || '');
      setCodechef(profile.handles.codechef || '');
      setHackerrank(profile.handles.hackerrank || '');
      setCodestudio(profile.handles.codestudio || '');
      setLinkedinFollowers(String(profile.linkedInStats.followersCount || ''));
      setSaved(false);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSave = () => {
    const newHandles: CodingHandles = {
      github: github.trim(),
      leetcode: leetcode.trim(),
      codeforces: codeforces.trim(),
      codechef: codechef.trim(),
      hackerrank: hackerrank.trim(),
      codestudio: codestudio.trim(),
      devfolio: devfolio.trim(),
      linkedin: linkedin.trim(),
      portfolio: portfolio.trim(),
    };
    const newLinkedIn: LinkedInStats = {
      ...profile.linkedInStats,
      url: linkedin.trim(),
      followersCount: parseInt(linkedinFollowers) || profile.linkedInStats.followersCount,
    };
    const newCodeChef: CodeChefStats = { ...profile.codeChefStats, handle: codechef.trim() };
    const newHackerRank: HackerRankStats = { ...profile.hackerRankStats, handle: hackerrank.trim() };
    const newCodeStudio: CodeStudioStats = { ...profile.codeStudioStats, handle: codestudio.trim() };

    onSave(newHandles, newLinkedIn, newCodeChef, newHackerRank, newCodeStudio);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1200);
  };

  const socialValues: Record<string, { val: string; set: (v: string) => void }> = {
    email:     { val: email, set: setEmail },
    linkedin:  { val: linkedin, set: setLinkedin },
    twitter:   { val: twitter, set: setTwitter },
    portfolio: { val: portfolio, set: setPortfolio },
    devfolio:  { val: devfolio, set: setDevfolio },
  };

  const codingValues: Record<string, { val: string; set: (v: string) => void }> = {
    github:        { val: github,          set: setGithub },
    leetcode:      { val: leetcode,        set: setLeetcode },
    codeforces:    { val: codeforces,      set: setCodeforces },
    codechef:      { val: codechef,        set: setCodechef },
    hackerrank:    { val: hackerrank,      set: setHackerrank },
    codestudio:    { val: codestudio,      set: setCodestudio },
    linkedinHandle:{ val: linkedinFollowers, set: setLinkedinFollowers },
  };

  const activeFields = section === 'social' ? socialFields : codingFields;
  const activeValues = section === 'social' ? socialValues : codingValues;

  return (
    <div className="modal-overlay-bg" onClick={onClose}>
      <div className="links-modal-box" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="links-modal-header">
          <div>
            <h2 className="links-modal-title">Edit Profile Links</h2>
            <p className="links-modal-sub">Update your social and coding profile URLs</p>
          </div>
          <button onClick={onClose} className="modal-close-x"><X size={18} /></button>
        </div>

        {/* Tab Switch */}
        <div className="links-tab-row">
          <button
            onClick={() => setSection('social')}
            className={`links-tab-btn ${section === 'social' ? 'active' : ''}`}
          >
            <Globe size={14} /> Social Links
          </button>
          <button
            onClick={() => setSection('coding')}
            className={`links-tab-btn ${section === 'coding' ? 'active' : ''}`}
          >
            <Code2 size={14} /> Coding Profiles
          </button>
        </div>

        {/* Fields */}
        <div className="links-fields-list">
          {activeFields.map(field => {
            const entry = activeValues[field.key];
            const val = entry?.val ?? '';
            const set = entry?.set;
            return (
              <div key={field.key} className="link-field-row">
                <div className="link-field-icon-wrap" style={{ background: `${field.color}18`, color: field.color }}>
                  {field.icon}
                </div>
                <div className="link-field-body">
                  <label className="link-field-label">{field.label}</label>
                  {field.helpText && <span className="link-field-helptext">{field.helpText}</span>}
                  <div className="link-input-wrapper">
                    {field.prefix && <span className="link-input-prefix">{field.prefix}</span>}
                    <input
                      type={field.key === 'email' ? 'email' : field.key === 'linkedinHandle' ? 'number' : 'text'}
                      className={`link-text-input ${field.prefix ? 'has-prefix' : ''}`}
                      value={val}
                      onChange={e => set?.(e.target.value)}
                      placeholder={field.placeholder}
                      spellCheck={false}
                    />
                    {val && field.prefix && (
                      <a
                        href={`https://${field.prefix}${val}`}
                        target="_blank"
                        rel="noreferrer"
                        className="link-preview-btn"
                        title="Preview link"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    {val && !field.prefix && field.key !== 'linkedinHandle' && (
                      <a
                        href={field.key === 'email' ? `mailto:${val}` : val}
                        target={field.key === 'email' ? undefined : '_blank'}
                        rel="noreferrer"
                        className="link-preview-btn"
                        title="Preview link"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="links-modal-footer">
          <button onClick={onClose} className="btn-cancel-links">Cancel</button>
          <button onClick={handleSave} className={`btn-save-links ${saved ? 'btn-saved' : ''}`}>
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>

        <style>{`
          .modal-overlay-bg {
            position: fixed; inset: 0; z-index: 9000;
            background: rgba(15,23,42,0.5);
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
            backdrop-filter: blur(4px);
          }
          .links-modal-box {
            background: #FFFFFF;
            border-radius: 18px;
            width: 100%;
            max-width: 520px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 24px 60px rgba(15,23,42,0.25);
            display: flex; flex-direction: column;
          }
          .links-modal-header {
            display: flex; align-items: flex-start; justify-content: space-between;
            padding: 24px 24px 16px 24px;
            border-bottom: 1px solid #F1F5F9;
          }
          .links-modal-title {
            font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; color: #0F172A;
          }
          .links-modal-sub {
            font-size: 0.8125rem; color: #64748B; margin-top: 4px;
          }
          .modal-close-x {
            width: 32px; height: 32px; border-radius: 8px;
            border: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: center;
            color: #64748B; background: #F8FAFC; flex-shrink: 0;
          }
          .modal-close-x:hover { background: #F1F5F9; color: #0F172A; }

          .links-tab-row {
            display: flex; gap: 0; padding: 16px 24px 0 24px;
          }
          .links-tab-btn {
            display: flex; align-items: center; gap: 6px;
            padding: 9px 20px; border-radius: 10px 10px 0 0;
            font-size: 0.8125rem; font-weight: 700; color: #64748B;
            border: 1px solid #E2E8F0; border-bottom: none;
            background: #F8FAFC;
            transition: all 0.15s;
          }
          .links-tab-btn.active {
            background: #FFFFFF; color: #F97316;
            border-color: #E2E8F0;
            position: relative; z-index: 1;
          }
          .links-tab-btn:first-child { margin-right: 4px; }

          .links-fields-list {
            padding: 20px 24px;
            display: flex; flex-direction: column; gap: 14px;
            border: 1px solid #E2E8F0;
            border-radius: 0 12px 0 0;
            margin: 0 24px;
            background: #FFFFFF;
          }

          .link-field-row {
            display: flex; align-items: flex-start; gap: 12px;
          }
          .link-field-icon-wrap {
            width: 36px; height: 36px; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; margin-top: 22px;
          }
          .link-field-body {
            flex: 1; display: flex; flex-direction: column; gap: 3px;
          }
          .link-field-label {
            font-size: 0.8rem; font-weight: 700; color: #334155;
          }
          .link-field-helptext {
            font-size: 0.72rem; color: #94A3B8;
          }
          .link-input-wrapper {
            display: flex; align-items: center;
            border: 1.5px solid #E2E8F0; border-radius: 10px;
            background: #F8FAFC; overflow: hidden;
            transition: border-color 0.15s;
          }
          .link-input-wrapper:focus-within {
            border-color: #F97316;
            background: #FFFFFF;
          }
          .link-input-prefix {
            font-size: 0.72rem; font-weight: 600; color: #94A3B8;
            padding: 0 0 0 10px; white-space: nowrap;
          }
          .link-text-input {
            flex: 1; border: none; background: transparent;
            padding: 9px 10px; font-size: 0.8125rem; color: #0F172A;
            outline: none;
          }
          .link-text-input.has-prefix { padding-left: 2px; }
          .link-preview-btn {
            padding: 0 10px; color: #94A3B8; display: flex; align-items: center;
          }
          .link-preview-btn:hover { color: #F97316; }

          .links-modal-footer {
            display: flex; justify-content: flex-end; gap: 12px;
            padding: 16px 24px 24px 24px;
          }
          .btn-cancel-links {
            padding: 10px 20px; border-radius: 10px;
            border: 1.5px solid #E2E8F0; font-size: 0.8125rem; font-weight: 700;
            color: #64748B; background: #F8FAFC;
          }
          .btn-cancel-links:hover { background: #F1F5F9; }
          .btn-save-links {
            padding: 10px 22px; border-radius: 10px;
            background: #F97316; color: #FFFFFF;
            font-size: 0.8125rem; font-weight: 700;
            display: flex; align-items: center; gap: 7px;
            transition: background 0.15s;
          }
          .btn-save-links:hover { background: #EA580C; }
          .btn-save-links.btn-saved {
            background: #10B981;
          }
        `}</style>
      </div>
    </div>
  );
};
