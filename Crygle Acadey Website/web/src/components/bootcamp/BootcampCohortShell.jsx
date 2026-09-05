import React from 'react';
import Link from 'next/link';

export function BootcampCohortShell({ active, children }) {
  const tabs = [
    { key: 'jadwal', label: '📅 Jadwal & Absensi', href: '/bootcamp/jadwal' },
    { key: 'booking', label: '🤝 Booking Konsultasi Mentor', href: '/bootcamp/booking' },
    { key: 'tugas', label: '📝 Pengumpulan Tugas & Quiz', href: '/bootcamp/tugas' },
    { key: 'leaderboard', label: '🏆 Leaderboard Ranking', href: '/bootcamp/leaderboard' },
  ];

  return (
    <div
      className="bootcamp-page-container"
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px 24px 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      {/* Top back navigation breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <Link
          href="/dashboard?tab=bootcamp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--color-primary, #235F9C)',
            textDecoration: 'none',
            padding: '6px 14px',
            background: '#F1F6FC',
            borderRadius: 50,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </svg>
          <span>Kembali ke Dashboard Bootcamp</span>
        </Link>

        <span style={{ fontSize: 13, color: 'var(--grey-500, #797979)', fontWeight: 600 }}>
          Cohort Aktif: Batch 12 (Fall 2026)
        </span>
      </div>

      {/* Cohort Banner */}
      <div
        className="bootcamp-cohort-banner"
        style={{
          background: 'linear-gradient(135deg, #1B4B7D 0%, #235F9C 100%)',
          borderRadius: 20,
          padding: '32px 36px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          boxShadow: '0 12px 36px rgba(35, 95, 156, 0.16)',
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <span
            className="cohort-badge-edition"
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.18)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.05em',
              marginBottom: 12,
              textTransform: 'uppercase',
            }}
          >
            EDISI ASRAMA &amp; SMK BATCH 12
          </span>
          <h1
            className="cohort-title-h2"
            style={{
              fontFamily: 'var(--font-core)',
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1.3,
              margin: '0 0 10px',
              color: '#ffffff',
            }}
          >
            Bootcamp Intensif UI/UX Design &amp; Digital Product
          </h1>
          <div
            className="cohort-meta-info"
            style={{
              fontSize: 14,
              opacity: 0.9,
              lineHeight: 1.5,
            }}
          >
            Mentor Utama: Dimas Pradipa Abiyuda · Periode: September – November 2026 · 12 Pekan
          </div>
        </div>

        <a
          href="https://chat.whatsapp.com/demo-crygle-bootcamp-cohort"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bootcamp-wa"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 24px',
            background: '#25D366',
            color: '#ffffff',
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.051-.376-.025-.527-.076-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.577-.01c-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.513 0 1.482 1.079 2.913 1.23 3.114.15.2 2.124 3.243 5.145 4.548.719.31 1.28.496 1.718.635.722.23 1.378.198 1.898.12.58-.088 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.429-.075-.125-.276-.2-.577-.35z" />
          </svg>
          <span>Grup WhatsApp Santri Cohort</span>
        </a>
      </div>

      {/* Bootcamp Sub-Tabs Nav */}
      <nav
        className="bootcamp-subtabs-bar"
        aria-label="Bootcamp Navigation"
        style={{
          display: 'flex',
          gap: 10,
          borderBottom: '1px solid var(--grey-100, #EAEAEA)',
          paddingBottom: 12,
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`bootcamp-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                background: isActive ? 'var(--color-primary, #235F9C)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--grey-600, #5A6062)',
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Main Workspace Body */}
      <main className="bootcamp-content-body">
        {children}
      </main>
    </div>
  );
}
