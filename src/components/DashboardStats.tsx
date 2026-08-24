import React from 'react';
import { UserProfile } from '../types/profile';
import { Info, ShieldCheck, Star } from 'lucide-react';

interface DashboardStatsProps {
  profile: UserProfile;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ profile }) => {
  const { leetcodeStats, githubStats, codeforcesStats, codeChefStats } = profile;

  const totalQuestionsSolved = (leetcodeStats.totalSolved || 0) + (codeChefStats.solvedCount || 0) + (codeforcesStats.solvedCount || 0);

  const weeks = Array.from({ length: 24 });
  const daysPerWeek = 7;

  return (
    <div className="dashboard-stats-root">
      {/* Verification Banner */}
      <div className="verification-alert-banner">
        <div className="alert-left">
          <ShieldCheck size={20} style={{ color: '#065F46', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 className="alert-title">You aren't verified yet</h4>
            <p className="alert-desc">Get verified to unlock your exclusive NovaBridge card — your stamp of authenticity and access your rankings on the leaderboard.</p>
          </div>
        </div>
        <button onClick={() => alert('Verification process launched.')} className="btn-verify-action">
          Verify Profile -&gt;
        </button>
      </div>

      {/* Row 1: KPI Cards + Heatmap */}
      <div className="kpi-grid-3">
        {/* Questions Solved — Royal Blue accent */}
        <div className="color-card color-card-royal">
          <div className="color-card-ribbon"></div>
          <div className="color-card-inner">
            <div className="kpi-header">
              <span className="kpi-title">Questions Solved</span>
              <Info size={14} className="text-slate-400" />
            </div>
            <div className="kpi-value-huge" style={{ color: '#2563EB' }}>
              {totalQuestionsSolved > 0 ? totalQuestionsSolved : leetcodeStats.totalSolved || 0}
            </div>
          </div>
        </div>

        {/* Active Days — Emerald accent */}
        <div className="color-card color-card-emerald">
          <div className="color-card-ribbon"></div>
          <div className="color-card-inner">
            <div className="kpi-header">
              <span className="kpi-title">Active Days</span>
              <Info size={14} className="text-slate-400" />
            </div>
            <div className="kpi-value-huge" style={{ color: '#059669' }}>{githubStats.activeDays || 120}</div>
          </div>
        </div>

        {/* Submissions Heatmap — Navy accent */}
        <div className="color-card color-card-navy">
          <div className="color-card-ribbon"></div>
          <div className="color-card-inner heatmap-card-inner">
            <div className="heatmap-header">
              <div className="heatmap-meta-group">
                <span>Submissions <strong>{githubStats.submissionsCount || 1482}</strong></span>
                <span>Max.Streak <strong>{githubStats.maxStreak || 45}</strong></span>
                <span>Current <strong>{githubStats.currentStreak || 12}</strong></span>
              </div>
              <div className="heatmap-period-select">Current</div>
            </div>
            <div className="heatmap-grid-wrapper">
              <div className="heatmap-months-row">
                <span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
              </div>
              <div className="heatmap-matrix">
                {weeks.map((_, wIdx) => (
                  <div key={wIdx} className="heatmap-col">
                    {Array.from({ length: daysPerWeek }).map((_, dIdx) => {
                      const lvl = (wIdx + dIdx) % 7 === 0 ? 'level-2' : (wIdx * 2 + dIdx) % 5 === 0 ? 'level-3' : 'level-0';
                      return <div key={dIdx} className={`heatmap-cell ${lvl}`} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Contest Attended | Rating Trend | Distribution + Rankings */}
      <div className="middle-dashboard-grid">
        {/* Contest Attended — Orange accent */}
        <div className="color-card color-card-orange">
          <div className="color-card-ribbon"></div>
          <div className="color-card-inner">
            <div className="contest-title">Contest Attended</div>
            <div className="contest-huge-val">
              {(leetcodeStats.contestsAttended || 0) + (codeChefStats.contestsAttended || 0) + (codeforcesStats.totalContests || 0)}
            </div>
            <div className="contest-breakdown-list">
              <div className="contest-row">
                <div className="platform-brand"><span className="brand-dot" style={{ background: '#FFA116' }}></span><span className="platform-name">LeetCode</span></div>
                <span className="contest-count">{leetcodeStats.contestsAttended || 0}</span>
              </div>
              <div className="contest-row">
                <div className="platform-brand"><span className="brand-dot" style={{ background: '#EF4444' }}></span><span className="platform-name">CodeChef</span></div>
                <span className="contest-count">{codeChefStats.contestsAttended || 0}</span>
              </div>
              <div className="contest-row">
                <div className="platform-brand"><span className="brand-dot" style={{ background: '#2563EB' }}></span><span className="platform-name">CodeForces</span></div>
                <span className="contest-count">{codeforcesStats.totalContests || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Trend — Amber accent */}
        <div className="color-card color-card-amber">
          <div className="color-card-ribbon"></div>
          <div className="color-card-inner">
            <div className="rating-chart-header">
              <div>
                <div className="rating-val-lbl">
                  Rating <strong>{codeforcesStats.rating || leetcodeStats.ranking || 1891}</strong>
                </div>
                <div className="rating-contest-sub">
                  {codeforcesStats.rank ? `${codeforcesStats.rank} (${codeforcesStats.handle})` : `LeetCode Rank: ${leetcodeStats.ranking || '4812'}`}
                </div>
              </div>
              <div className="rating-date">Synced Live</div>
            </div>
            <div className="svg-chart-container">
              <svg viewBox="0 0 500 120" className="rating-svg">
                <defs>
                  <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 100 Q 100 80 200 95 T 350 70 T 500 40 L 500 120 L 0 120 Z" fill="url(#ratingGrad)" />
                <path d="M 0 100 Q 100 80 200 95 T 350 70 T 500 40" fill="none" stroke="#F97316" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Distribution + Rankings Sidebar — Purple accent */}
        <div className="dist-rankings-sidebar">
          <div className="color-card color-card-purple">
            <div className="color-card-ribbon"></div>
            <div className="color-card-inner">
              <div className="dist-header">Question Distribution</div>
              <div className="dist-sub-lbl">Fundamentals</div>
              <div className="dist-row-flex">
                <div className="ring-wrapper" style={{ border: '6px solid #8B5CF6' }}>
                  <span className="ring-num">36</span>
                </div>
                <div className="dist-platform-list">
                  <div className="dist-item"><span className="dist-name">GFG Basic</span><span className="dist-val">18</span></div>
                  <div className="dist-item"><span className="dist-name">HackerRank</span><span className="dist-val">18</span></div>
                </div>
              </div>
              <div className="dist-sub-lbl" style={{ marginTop: '14px' }}>DSA (Based on Difficulty)</div>
              <div className="dist-row-flex">
                <div className="ring-wrapper" style={{ border: '6px solid #F59E0B', borderTopColor: '#10B981', borderBottomColor: '#EF4444' }}>
                  <span className="ring-num">{leetcodeStats.totalSolved || 0}</span>
                </div>
                <div className="dist-platform-list">
                  <div className="dist-item"><span className="dist-name" style={{ color: '#10B981' }}>Easy</span><span className="dist-val">{leetcodeStats.easySolved || 0}</span></div>
                  <div className="dist-item"><span className="dist-name" style={{ color: '#F59E0B' }}>Medium</span><span className="dist-val">{leetcodeStats.mediumSolved || 0}</span></div>
                  <div className="dist-item"><span className="dist-name" style={{ color: '#EF4444' }}>Hard</span><span className="dist-val">{leetcodeStats.hardSolved || 0}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contest Rankings — Rose accent */}
          <div className="color-card color-card-rose">
            <div className="color-card-ribbon"></div>
            <div className="color-card-inner">
              <div className="rank-sec-title">Contest Rankings</div>
              <div className="rank-platform-name">CODECHEF / CODEFORCES</div>
              <div className="rank-value-row">
                <Star size={16} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                <div className="rank-metrics-box">
                  <div className="rank-val-big">{codeforcesStats.rating || codeChefStats.rating || 1950}</div>
                  <div className="rank-val-max">(max : {codeforcesStats.maxRating || codeChefStats.rating || 1980})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-stats-root {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Colorful Card System */
        .color-card {
          position: relative;
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(15,23,42,0.05);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .color-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15,23,42,0.1);
        }
        .color-card-ribbon {
          height: 5px;
          width: 100%;
        }
        .color-card-inner {
          padding: 20px;
        }

        /* Color Variants */
        .color-card-royal .color-card-ribbon { background: linear-gradient(90deg, #2563EB, #60A5FA); }
        .color-card-royal { border-top: none; }

        .color-card-emerald .color-card-ribbon { background: linear-gradient(90deg, #059669, #34D399); }
        .color-card-emerald { border-top: none; }

        .color-card-navy .color-card-ribbon { background: linear-gradient(90deg, #0F172A, #334155); }
        .color-card-navy { border-top: none; }

        .color-card-orange .color-card-ribbon { background: linear-gradient(90deg, #EA580C, #FB923C); }
        .color-card-orange { border-top: none; }

        .color-card-amber .color-card-ribbon { background: linear-gradient(90deg, #D97706, #FCD34D); }
        .color-card-amber { border-top: none; }

        .color-card-purple .color-card-ribbon { background: linear-gradient(90deg, #7C3AED, #C4B5FD); }
        .color-card-purple { border-top: none; }

        .color-card-rose .color-card-ribbon { background: linear-gradient(90deg, #E11D48, #FDA4AF); }
        .color-card-rose { border-top: none; }

        .kpi-grid-3 {
          display: grid;
          grid-template-columns: 200px 200px 1fr;
          gap: 20px;
        }
        .kpi-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .kpi-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .kpi-value-huge {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          margin-top: 14px;
        }
        .heatmap-card-inner {
          padding: 16px 20px;
        }
        .heatmap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--slate-500);
        }
        .heatmap-meta-group {
          display: flex;
          gap: 14px;
        }
        .heatmap-meta-group strong { color: var(--navy-900); }
        .heatmap-period-select {
          background: var(--slate-100);
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.72rem;
          color: var(--navy-900);
        }
        .heatmap-grid-wrapper { margin-top: 10px; }
        .heatmap-months-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--slate-400);
          margin-bottom: 4px;
        }
        .heatmap-matrix { display: flex; gap: 4px; overflow-x: auto; }
        .heatmap-col { display: flex; flex-direction: column; gap: 4px; }
        .heatmap-cell { width: 10px; height: 10px; border-radius: 2px; }
        .level-0 { background-color: #E2E8F0; }
        .level-2 { background-color: #4ADE80; }
        .level-3 { background-color: #16A34A; }

        .middle-dashboard-grid {
          display: grid;
          grid-template-columns: 300px 1fr 320px;
          gap: 20px;
        }
        .contest-title { font-size: 0.88rem; font-weight: 700; color: var(--slate-600); }
        .contest-huge-val {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1;
          margin-top: 10px;
        }
        .contest-breakdown-list { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
        .contest-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--slate-50);
          padding: 8px 12px;
          border-radius: 6px;
        }
        .platform-brand { display: flex; align-items: center; gap: 8px; }
        .brand-dot { width: 8px; height: 8px; border-radius: 50%; }
        .platform-name { font-size: 0.8125rem; font-weight: 700; color: var(--navy-900); }
        .contest-count { font-weight: 700; font-size: 0.85rem; color: var(--navy-900); }

        .rating-chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .rating-val-lbl { font-size: 0.88rem; color: var(--navy-900); }
        .rating-contest-sub { font-size: 0.75rem; color: var(--slate-500); margin-top: 2px; }
        .rating-date { font-size: 0.75rem; font-weight: 600; color: var(--slate-500); }
        .svg-chart-container { margin-top: 14px; width: 100%; height: 120px; }
        .rating-svg { width: 100%; height: 100%; }

        .dist-rankings-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .dist-header {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy-900);
          text-align: center;
        }
        .dist-sub-lbl {
          font-size: 0.72rem;
          color: var(--slate-500);
          text-align: center;
        }
        .dist-row-flex { display: flex; align-items: center; gap: 16px; margin-top: 8px; }
        .ring-wrapper {
          width: 60px; height: 60px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ring-num { font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; color: var(--navy-900); }
        .dist-platform-list { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .dist-item {
          display: flex; justify-content: space-between; font-size: 0.78rem;
          background-color: var(--slate-50); padding: 4px 8px; border-radius: 6px;
        }
        .dist-name { font-weight: 700; }
        .dist-val { font-weight: 800; color: var(--navy-900); }

        .rank-sec-title {
          font-size: 0.75rem; font-weight: 800; color: var(--slate-500);
          text-transform: uppercase; letter-spacing: 0.05em; text-align: center;
        }
        .rank-platform-name {
          font-size: 0.82rem; font-weight: 800; color: var(--navy-800); text-align: center; margin-top: 4px;
        }
        .rank-value-row {
          display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 10px;
        }
        .rank-metrics-box { display: flex; align-items: flex-end; gap: 4px; }
        .rank-val-big { font-size: 1.8rem; font-weight: 800; color: var(--navy-900); line-height: 1; }
        .rank-val-max { font-size: 0.75rem; color: var(--slate-500); margin-bottom: 2px; }

        @media (max-width: 1100px) {
          .kpi-grid-3, .middle-dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
