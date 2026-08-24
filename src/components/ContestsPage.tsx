import React from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Clock, Calendar as CalIcon } from 'lucide-react';

export const ContestsPage: React.FC = () => {
  return (
    <div className="contests-page-root">
      <div className="contests-inner-layout">
        {/* Left Column: List Panel */}
        <div className="contests-list-panel">
          <div className="contests-list-header">
            <h2 className="contest-page-title">Contest Calendar</h2>
            <p className="contest-page-sub">Explore coding contest and never miss it</p>
          </div>

          <div className="search-filter-row">
            <div className="search-box-wrapper">
              <Search size={16} className="search-ico" />
              <input type="text" placeholder="Search contest" />
            </div>
            <button className="btn btn-secondary btn-sm filter-btn">
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          {/* List items */}
          <div className="contests-list-scroll">
            <div className="date-group-title">14 Aug 2026</div>
            <div className="contest-list-card active-contest-border">
              <div className="contest-card-time">4:30 PM - 4:30 PM<sup>+1d</sup></div>
              <h4 className="contest-card-name">ICPC 2026 Online Challenge 1 powered by Huawei</h4>
              <div className="contest-card-meta">
                <Clock size={12} /> 42 users subscribed
              </div>
            </div>

            <div className="date-group-title">15 Aug 2026</div>
            <div className="contest-list-card">
              <div className="contest-card-time">12:00 AM - 1:59 AM<sup>+2h</sup></div>
              <h4 className="contest-card-name">Placement Prep Weekends - 03</h4>
              <div className="contest-card-meta">
                <Clock size={12} /> 28 users subscribed
              </div>
            </div>

            <div className="contest-list-card">
              <div className="contest-card-time">5:30 PM - 7:10 PM</div>
              <h4 className="contest-card-name">AtCoder Beginner Contest 471</h4>
              <div className="contest-card-meta">
                <Clock size={12} /> 72 users subscribed
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Month Calendar View */}
        <div className="contests-calendar-panel">
          <div className="calendar-header-row">
            <h3 className="current-month-label">August 2026</h3>
            <div className="calendar-nav-btns">
              <button className="nav-arrow"><ChevronLeft size={16} /></button>
              <button className="nav-arrow"><ChevronRight size={16} /></button>
            </div>
          </div>

          {/* Grid header */}
          <div className="calendar-days-grid">
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          {/* Grid cells */}
          <div className="calendar-cells-grid">
            {/* Blank padding cells */}
            <div className="cell empty-cell"></div>
            <div className="cell empty-cell"></div>
            <div className="cell empty-cell"></div>
            <div className="cell empty-cell"></div>
            <div className="cell empty-cell"></div>
            <div className="cell empty-cell"></div>
            <div className="cell">
              <span className="day-num">1</span>
              <div className="cal-banner bg-purple">Starters 249</div>
            </div>

            {/* Row 2 */}
            <div className="cell">
              <span className="day-num">2</span>
              <div className="cal-banner bg-blue">ICPC Challenge</div>
            </div>
            <div className="cell"><span className="day-num">3</span></div>
            <div className="cell"><span className="day-num">4</span></div>
            <div className="cell">
              <span className="day-num">5</span>
              <div className="cal-banner bg-orange">Starters 250</div>
            </div>
            <div className="cell"><span className="day-num">6</span></div>
            <div className="cell"><span className="day-num">7</span></div>
            <div className="cell">
              <span className="day-num">8</span>
              <div className="cal-banner bg-red">Placement Prep</div>
            </div>

            {/* Row 3 */}
            <div className="cell"><span className="day-num">9</span></div>
            <div className="cell"><span className="day-num">10</span></div>
            <div className="cell"><span className="day-num">11</span></div>
            <div className="cell">
              <span className="day-num">12</span>
              <div className="cal-banner bg-orange">Starters 251</div>
            </div>
            <div className="cell"><span className="day-num">13</span></div>
            <div className="cell"><span className="day-num">14</span></div>
            <div className="cell">
              <span className="day-num">15</span>
              <div className="cal-banner bg-blue">AtCoder ABC</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contests-page-root {
          padding: 24px;
          height: calc(100vh - 60px);
          background-color: #FFFFFF;
        }
        .contests-inner-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 24px;
          height: 100%;
        }
        .contests-list-panel {
          border-right: 1px solid var(--slate-200);
          padding-right: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contest-page-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .contest-page-sub {
          font-size: 0.82rem;
          color: var(--slate-500);
        }
        .search-filter-row {
          display: flex;
          gap: 10px;
        }
        .search-box-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-ico {
          position: absolute;
          left: 10px;
          color: var(--slate-400);
        }
        .search-box-wrapper input {
          width: 100%;
          padding: 8px 12px 8px 32px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--slate-200);
          font-size: 0.8125rem;
        }
        .contests-list-scroll {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .date-group-title {
          font-weight: 800;
          font-size: 0.8125rem;
          color: var(--navy-900);
          margin-top: 10px;
        }
        .contest-list-card {
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-md);
          padding: 12px;
          background-color: var(--slate-50);
        }
        .active-contest-border {
          border-left: 4px solid var(--codolio-orange);
          background-color: #FFF;
        }
        .contest-card-time {
          font-size: 0.75rem;
          color: var(--slate-500);
        }
        .contest-card-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--navy-900);
          margin-top: 4px;
        }
        .contest-card-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--slate-400);
          margin-top: 6px;
        }

        /* Calendar */
        .contests-calendar-panel {
          display: flex;
          flex-direction: column;
        }
        .calendar-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .current-month-label {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .calendar-nav-btns {
          display: flex;
          gap: 6px;
        }
        .nav-arrow {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--slate-200);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
        }
        .calendar-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--slate-400);
          padding-bottom: 8px;
          border-bottom: 1px solid var(--slate-200);
        }
        .calendar-cells-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-auto-rows: minmax(80px, 1fr);
          border-left: 1px solid var(--slate-200);
          border-bottom: 1px solid var(--slate-200);
        }
        .cell {
          border-right: 1px solid var(--slate-200);
          border-top: 1px solid var(--slate-200);
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .day-num {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-500);
        }
        .cal-banner {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          color: #FFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bg-purple { background-color: #8B5CF6; }
        .bg-blue { background-color: #3B82F6; }
        .bg-orange { background-color: #F97316; }
        .bg-red { background-color: #EF4444; }
      `}</style>
    </div>
  );
};
