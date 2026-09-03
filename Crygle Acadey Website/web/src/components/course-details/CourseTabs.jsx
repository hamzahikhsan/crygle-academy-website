'use client';

import React, { useState } from 'react';
import { OverviewTab } from './OverviewTab.jsx';
import { CurriculumTab } from './CurriculumTab.jsx';
import { MentorTab } from './MentorTab.jsx';
import { ReviewsTab } from './ReviewsTab.jsx';

export function CourseTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Kurikulum Kelas' },
    { id: 'mentor', label: 'Tentang Mentor' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, borderBottom: '2px solid var(--border-default)', marginBottom: 32, flexWrap: 'wrap' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '14px 20px',
                border: 'none',
                background: 'transparent',
                fontFamily: 'var(--font-core)',
                fontSize: 16,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--blue-500)' : 'var(--grey-400)',
                borderBottom: isActive ? '3px solid var(--blue-500)' : '3px solid transparent',
                marginBottom: -2,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'curriculum' && <CurriculumTab />}
        {activeTab === 'mentor' && <MentorTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
      </div>
    </div>
  );
}
