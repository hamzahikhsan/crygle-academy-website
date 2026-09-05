import React from 'react';
import Link from 'next/link';

export default function BootcampLandingPage() {
  const features = [
    {
      icon: '📅',
      title: 'Jadwal & Sesi Live Terstruktur',
      desc: '12 pekan pembelajaran intensif dengan sesi live review mingguan setiap Kamis pukul 19:30 WIB, absensi digital, dan rekaman materi selamanya.',
    },
    {
      icon: '🤝',
      title: '1-on-1 Mentoring Terjadwal',
      desc: 'Bebas jadwalkan sesi privat bersama mentor praktisi industri untuk bedah file Figma, optimasi auto layout, dan standarisasi token.',
    },
    {
      icon: '📝',
      title: 'Tugas Riil Portofolio UI8',
      desc: 'Bukan sekadar tutorial! Setiap tugas dirancang untuk menghasilkan produk UI Kit bernilai jual tinggi yang siap di-upload ke marketplace global.',
    },
    {
      icon: '🏆',
      title: 'Leaderboard & Sertifikasi Industri',
      desc: 'Sistem gamifikasi poin santri yang memacu konsistensi belajar, dengan sertifikat resmi Crygle Academy untuk santri berprestasi.',
    },
  ];

  return (
    <div
      className="bootcamp-landing-container"
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '48px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 56,
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 20,
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 30,
            background: '#F1F6FC',
            color: 'var(--color-primary, #235F9C)',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Bootcamp Intensif
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-core)',
            fontSize: 40,
            fontWeight: 800,
            color: '#202020',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          Bootcamp Intensif UI/UX Design &amp; Digital Product
        </h1>

        <p
          style={{
            fontSize: 18,
            color: 'var(--grey-600, #5A6062)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Transformasi kemampuan santri dan siswa SMK menjadi desainer produk digital siap industri global. Belajar langsung dari praktisi, bangun portofolio bernilai jual, dan raih kemandirian finansial.
        </p>

        {/* Fact highlights */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            flexWrap: 'wrap',
            padding: '16px 28px',
            background: '#ffffff',
            border: '1px solid var(--grey-100, #EAEAEA)',
            borderRadius: 16,
            marginTop: 8,
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: 'var(--grey-500, #797979)' }}>Mentor Utama</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#202020' }}>Dimas Pradipa Abiyuda</div>
          </div>
          <div style={{ width: 1, height: 28, background: '#EAEAEA' }} />
          <div>
            <div style={{ fontSize: 12, color: 'var(--grey-500, #797979)' }}>Periode Cohort</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#202020' }}>September – November 2026</div>
          </div>
          <div style={{ width: 1, height: 28, background: '#EAEAEA' }} />
          <div>
            <div style={{ fontSize: 12, color: 'var(--grey-500, #797979)' }}>Durasi Program</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#202020' }}>12 Pekan Intensif</div>
          </div>
        </div>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 12,
          }}
        >
          <Link
            href="/bootcamp/join"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              borderRadius: 50,
              background: 'var(--color-primary, #235F9C)',
              color: '#ffffff',
              fontSize: 15,
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(35, 95, 156, 0.25)',
            }}
          >
            <span>Gabung Cohort Berikutnya</span>
            <span>→</span>
          </Link>

          <Link
            href="/dashboard?tab=bootcamp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 50,
              background: '#ffffff',
              border: '1.5px solid var(--grey-200, #DFDFDF)',
              color: 'var(--grey-700, #202020)',
              fontSize: 15,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <span>Buka Dashboard Siswa</span>
          </Link>
        </div>
      </section>

      {/* Feature Preview Cards */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#202020', margin: '0 0 8px' }}>
            Ekosistem Belajar Terpadu Cohort
          </h2>
          <p style={{ fontSize: 15, color: 'var(--grey-500, #797979)', margin: 0 }}>
            Seluruh fasilitas terintegrasi dalam workspace cohort khusus santri.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1px solid var(--grey-100, #EAEAEA)',
                borderRadius: 16,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div style={{ fontSize: 32 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#202020', margin: 0 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--grey-600, #5A6062)', lineHeight: 1.6, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
