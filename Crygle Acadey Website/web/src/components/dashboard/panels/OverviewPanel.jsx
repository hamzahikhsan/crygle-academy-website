import React from 'react';
import Link from 'next/link';

export function OverviewPanel() {
  const weeklyActivity = [
    { day: 'Sen', pct: 60, title: 'Senin: 2.5 Jam', active: false },
    { day: 'Sel', pct: 80, title: 'Selasa: 3.2 Jam', active: false },
    { day: 'Rab', pct: 45, title: 'Rabu: 1.8 Jam', active: false },
    { day: 'Kam', pct: 90, title: 'Kamis: 4.0 Jam', active: false },
    { day: 'Jum', pct: 70, title: 'Jumat: 2.8 Jam', active: false },
    { day: 'Sab', pct: 100, title: 'Sabtu: 4.5 Jam (Hari Ini)', active: true },
    { day: 'Min', pct: 30, title: 'Minggu: Rencana 1.5 Jam', active: false },
  ];

  return (
    <section id="panel-overview" className="dashboard-panel" style={{ display: 'block' }}>
      <div className="overview-content-body" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* 4 Bento KPI Metric Cards */}
        <div
          className="bento-kpi-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 22,
          }}
        >
          {/* KPI 1 */}
          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div className="kpi-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
                Total Jam Belajar
              </span>
              <div
                className="kpi-icon-badge"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#F1F6FC',
                  color: 'var(--color-primary, #235F9C)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
            <div className="kpi-value-number" style={{ fontSize: 28, fontWeight: 800, color: '#202020' }}>
              24.5 Jam
            </div>
            <span
              className="kpi-trend-pill"
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 20,
                background: '#E8F8EE',
                color: '#269C45',
                alignSelf: 'flex-start',
              }}
            >
              +4.2 jam minggu ini
            </span>
          </div>

          {/* KPI 2 */}
          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div className="kpi-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
                Kursus Terdaftar
              </span>
              <div
                className="kpi-icon-badge gold"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#FFF9E6',
                  color: '#D9A000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
            </div>
            <div className="kpi-value-number" style={{ fontSize: 28, fontWeight: 800, color: '#202020' }}>
              3 Kursus
            </div>
            <span style={{ fontSize: 12, color: '#797979' }}>1 Siap Uji Sertifikasi</span>
          </div>

          {/* KPI 3 */}
          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div className="kpi-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
                Rata-rata Skor Tugas
              </span>
              <div
                className="kpi-icon-badge green"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#E8F8EE',
                  color: '#269C45',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
            </div>
            <div className="kpi-value-number" style={{ fontSize: 28, fontWeight: 800, color: '#202020' }}>
              86/100
            </div>
            <span
              className="kpi-trend-pill"
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 20,
                background: '#E8F8EE',
                color: '#269C45',
                alignSelf: 'flex-start',
              }}
            >
              ⭐ Lolos Syarat Sertifikat (≥80)
            </span>
          </div>

          {/* KPI 4 */}
          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div className="kpi-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
                Streak Belajar Santri
              </span>
              <div
                className="kpi-icon-badge purple"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#F5EEFD',
                  color: '#8C40D4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
            </div>
            <div className="kpi-value-number" style={{ fontSize: 28, fontWeight: 800, color: '#202020' }}>
              🔥 14 Hari
            </div>
            <span style={{ fontSize: 12, color: '#8C40D4', fontWeight: 700 }}>Konsisten Tanpa Absen!</span>
          </div>
        </div>

        {/* 2-Col Layout: Resume Learning & Live Mentoring */}
        <div
          className="overview-dual-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 24,
          }}
        >
          {/* Continue Learning Card */}
          <div
            className="hero-resume-card"
            style={{
              background: 'linear-gradient(135deg, #184370 0%, #235F9C 100%)',
              color: '#ffffff',
              borderRadius: 20,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 20,
              boxShadow: '0 12px 30px rgba(35, 95, 156, 0.16)',
            }}
          >
            <div>
              <div
                className="resume-tag"
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#FFF9E6',
                  letterSpacing: '0.05em',
                  marginBottom: 10,
                }}
              >
                <span>▶ SEDANG DIPELAJARI</span>
              </div>
              <h2
                className="resume-course-name"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  lineHeight: 1.4,
                  marginBottom: 8,
                }}
              >
                UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit
              </h2>
              <div className="resume-lesson-target" style={{ fontSize: 13, color: '#D2E3F4' }}>
                Materi Terakhir: Modul 2 — <em>Brainstorming Fitur Produk</em>
              </div>
            </div>

            <div
              className="resume-action-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div style={{ flex: 1, minWidth: 200, maxWidth: 260 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, fontWeight: 700 }}>
                  <span>5 dari 8 Modul</span>
                  <span>60%</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(255, 255, 255, 0.25)', borderRadius: 20, overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: '#31BC53', borderRadius: 20 }}></div>
                </div>
              </div>

              <Link
                href="/classroom/ui-ux-menjual-produk-ui-kit"
                className="btn-resume-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  borderRadius: 50,
                  background: '#ffffff',
                  color: '#184370',
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <span>Lanjutkan Belajar</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </Link>
            </div>
          </div>

          {/* Upcoming Live Session */}
          <div
            className="upcoming-live-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span
                  className="live-badge-status"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 12px',
                    borderRadius: 20,
                    background: '#FDECEB',
                    color: '#E02B20',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  <span
                    className="pulse-dot-red"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#E02B20',
                    }}
                  ></span>
                  SESI LIVE HARI INI
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>16:00 – 17:30 WIB</span>
              </div>
              <h3 className="live-session-title" style={{ fontSize: 16, fontWeight: 800, color: '#202020', lineHeight: 1.4, margin: 0 }}>
                Review Portofolio Santri &amp; Persiapan Upload Produk ke UI8
              </h3>
            </div>

            <div className="live-mentor-profile" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="Dimas Pradipa"
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: '#202020' }}>Dimas Pradipa Abiyuda</div>
                <div style={{ fontSize: 12, color: '#797979' }}>Founder Crygle Academy · Fasilitator</div>
              </div>
            </div>

            <a
              href="https://meet.google.com/demo-crygle-live"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-join-live"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 18px',
                borderRadius: 50,
                background: 'var(--color-primary, #235F9C)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path>
                <rect x="3" y="6" width="12" height="12" rx="2"></rect>
              </svg>
              <span>Join Google Meet (Sesi Live)</span>
            </a>
          </div>
        </div>

        {/* Weekly Activity Visualizer */}
        <div
          className="overview-activity-card"
          style={{
            background: '#FCFCFC',
            border: '1px solid #E9E9E9',
            borderRadius: 20,
            padding: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#202020', marginBottom: 4 }}>Aktivitas Belajar 7 Hari Terakhir</h3>
              <p style={{ fontSize: 13, color: '#797979', margin: 0 }}>Target harian santri: minimal 2 jam belajar mandiri atau live mentoring.</p>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary, #235F9C)' }}>Rata-rata: 3.5 Jam/Hari</span>
          </div>

          <div
            className="weekly-bars-container"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: 160,
              padding: '0 10px',
              gap: 12,
            }}
          >
            {weeklyActivity.map((bar) => (
              <div
                key={bar.day}
                className="day-bar-column"
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  gap: 8,
                }}
              >
                <div
                  className={`day-bar-pill ${bar.active ? 'active' : ''}`}
                  title={bar.title}
                  style={{
                    width: '100%',
                    maxWidth: 42,
                    height: `${bar.pct}%`,
                    borderRadius: 10,
                    background: bar.active ? 'var(--color-primary, #235F9C)' : '#E6EDF5',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
                <span
                  className="day-label-text"
                  style={{
                    fontSize: 12,
                    fontWeight: bar.active ? 800 : 600,
                    color: bar.active ? 'var(--color-primary, #235F9C)' : '#797979',
                  }}
                >
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
