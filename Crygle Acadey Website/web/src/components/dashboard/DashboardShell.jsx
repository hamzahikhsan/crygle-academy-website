'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardSidebar } from './DashboardSidebar.jsx';
import { DashboardHeader } from './DashboardHeader.jsx';

// Placeholder panels (will be replaced in Tasks 3-9)
// TODO Task 3: OverviewPanel
// TODO Task 4: CourseSayaPanel
// TODO Task 5: BootcampSayaPanel
// TODO Task 6: ExploreKelasPanel
// TODO Task 7: ChatMentorPanel
// TODO Task 8: AffiliatePanel
// TODO Task 9: SettingPanel

export function DashboardShell({ children = null }) {
  const searchParams = useSearchParams();
  const rawTab = searchParams ? searchParams.get('tab') : null;
  const validTabs = ['overview', 'courses', 'bootcamp', 'explore', 'chat', 'affiliate', 'setting'];
  const activeTab = rawTab && validTabs.includes(rawTab) ? rawTab : 'courses';

  return (
    <div
      className="dashboard-page-container"
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--surface-light, #F8FAFC)',
      }}
    >
      <DashboardSidebar activeTab={activeTab} />
      <div
        className="dashboard-main-area"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          background: 'var(--surface-light, #F8FAFC)',
        }}
      >
        <DashboardHeader activeTab={activeTab} />
        <main
          className="dashboard-content-container"
          style={{
            flex: 1,
            padding: '32px 36px 60px',
            overflowY: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
