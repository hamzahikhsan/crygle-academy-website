import React from 'react';
import Link from 'next/link';

export function BootcampSayaPanel() {
  const ctaCards = [
    {
      title: 'Jadwal & Absensi',
      desc: 'Lihat kalender sesi live mingguan, materi bootcamp, tautan Zoom, dan rekap absensi santri.',
      icon: '📅',
      href: '/bootcamp/jadwal',
    },
    {
      title: 'Booking Konsultasi Mentor',
      desc: 'Jadwalkan sesi 1-on-1 bersama Dimas Pradipa atau Randy Pratama untuk review portofolio.',
      icon: '🤝',
      href: '/bootcamp/booking',
    },
    {
      title: 'Pengumpulan Tugas',
      desc: 'Kirim link Figma tugas mingguan, cek deadline, feedback mentor, dan riwayat revisi.',
      icon: '📝',
      href: '/bootcamp/tugas',
    },
    {
      title: 'Leaderboard',
      desc: 'Peringkat santri terbaik berdasarkan nilai tugas, keaktifan live sesi, dan streak belajar.',
      icon: '🏆',
      href: '/bootcamp/leaderboard',
    },
  ];

  return (
    <section id="panel-bootcamp" className="dashboard-panel" style={{ display: 'block' }}>
      <div className="bootcamp-content-body" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Cohort Banner */}
        <div
          className="bootcamp-cohort-banner"
          style={{
            background: 'linear-gradient(135deg, #184370 0%, #235F9C 100%)',
            borderRadius: 20,
            padding: 32,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 12px 32px rgba(35, 95, 156, 0.15)',
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <span
              className="cohort-badge-edition"
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.18)',
                color: '#FFF9E6',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.05em',
                marginBottom: 12,
              }}
            >
              EDISI ASRAMA &amp; SMK BATCH 12
            </span>
            <h2
              className="cohort-title-h2"
              style={{
                fontSize: 22,
                fontWeight: 800,
                margin: '0 0 10px 0',
                lineHeight: 1.3,
              }}
            >
              Bootcamp Intensif UI/UX Design &amp; Digital Product
            </h2>
            <div className="cohort-meta-info" style={{ fontSize: 13, color: '#D2E3F4' }}>
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
              padding: '14px 22px',
              borderRadius: 50,
              background: '#25D366',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.051-.376-.025-.527-.076-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.577-.01c-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.513 0 1.482 1.079 2.913 1.23 3.114.15.2 2.124 3.243 5.145 4.548.719.31 1.28.496 1.718.635.722.23 1.378.198 1.898.12.58-.088 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.429-.075-.125-.276-.2-.577-.35z" />
            </svg>
            <span>Grup WhatsApp Santri Cohort</span>
          </a>
        </div>

        {/* 4 Dedicated Bootcamp Action Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {ctaCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14,
                padding: 24,
                background: '#ffffff',
                border: '1px solid #E9E9E9',
                borderRadius: 18,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#202020', margin: '0 0 6px 0' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 13, color: '#797979', margin: 0, lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--color-primary, #235F9C)',
                  marginTop: 6,
                }}
              >
                <span>Buka Halaman</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
