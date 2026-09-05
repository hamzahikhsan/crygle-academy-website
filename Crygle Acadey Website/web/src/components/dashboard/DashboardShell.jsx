'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardSidebar } from './DashboardSidebar.jsx';
import { DashboardHeader } from './DashboardHeader.jsx';
import { OverviewPanel } from './panels/OverviewPanel.jsx';
import { CourseSayaPanel } from './panels/CourseSayaPanel.jsx';
import { BootcampSayaPanel } from './panels/BootcampSayaPanel.jsx';
import { ExploreKelasPanel } from './panels/ExploreKelasPanel.jsx';
import { ChatMentorPanel } from './panels/ChatMentorPanel.jsx';
import { AffiliatePanel } from './panels/AffiliatePanel.jsx';
import { SettingPanel } from './panels/SettingPanel.jsx';

export function DashboardShell({ children = null }) {
  const searchParams = useSearchParams();
  const rawTab = searchParams ? searchParams.get('tab') : null;
  const validTabs = ['overview', 'courses', 'bootcamp', 'explore', 'chat', 'affiliate', 'setting'];
  const activeTab = rawTab && validTabs.includes(rawTab) ? rawTab : 'courses';

  const panelMap = {
    overview: <OverviewPanel />,
    courses: <CourseSayaPanel />,
    bootcamp: <BootcampSayaPanel />,
    explore: <ExploreKelasPanel />,
    chat: <ChatMentorPanel />,
    affiliate: <AffiliatePanel />,
    setting: <SettingPanel />,
  };

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
          {children || panelMap[activeTab] || panelMap.courses}
        </main>
      </div>
    </div>
  );
}
