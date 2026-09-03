import React from 'react';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function TentangPage() {
  const pillars = [
    {
      icon: '🎨',
      title: 'Kreatif Design',
      desc: 'Menyalurkan imajinasi menjadi karya yang menghasilkan. Mulai dari pemodelan 3D Blender, desain antarmuka mobile/web di Figma, hingga produksi aset microstock komersial bernilai dolar.',
      tag: 'Blender 3D • UI/UX Figma • Digital Assets',
      tagColor: 'var(--blue-500)',
    },
    {
      icon: '💻',
      title: 'Kreatif Coding',
      desc: 'Bahasa masa depan untuk merealisasikan ide menjadi produk digital. Diajarkan melalui studi kasus interaktif, pembangunan web portfolio, dan logika pemrograman praktis yang menyenangkan.',
      tag: 'HTML5/CSS3 • JavaScript • Web Portfolio',
      tagColor: '#31BC53',
    },
    {
      icon: '🤖',
      title: 'Kreatif Robot',
      desc: 'Mengenal teknologi cerdas dan otomasi sejak dini. Belajar merancang mikrokontroler Arduino, sensor IoT, serta rekayasa mekanik otomatis yang aplikatif untuk memecahkan masalah sehari-hari.',
      tag: 'Arduino • Sensor IoT • Smart Automation',
      tagColor: '#E29C00',
    },
  ];

  const stats = [
    { number: '10.000+', label: 'Santri & Pelajar Terlatih' },
    { number: '94%', label: 'Tingkat Kelulusan & Kepuasan' },
    { number: '150+', label: 'Mitra Industri & Studio' },
    { number: '350+', label: 'Karya Portofolio Komersial' },
  ];

  return (
    <div style={{ background: 'var(--surface-base)' }}>
      {/* 1. Hero Section */}
      <section style={{ padding: '80px var(--gutter) 60px', background: 'var(--surface-subtle)', textAlign: 'center', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-tint)', color: 'var(--blue-500)', fontFamily: 'var(--font-core)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Mengenal Crygle Academy
          </span>
          <h1 style={{ fontFamily: 'var(--font-core)', fontSize: 44, fontWeight: 700, color: 'var(--black)', lineHeight: 1.25, marginBottom: 20 }}>
            Sanctuary Belajar Kreatif Digital untuk Masa Depan Nyata
          </h1>
          <p style={{ fontFamily: 'var(--font-core)', fontSize: 18, color: 'var(--grey-500)', lineHeight: 1.65, maxWidth: 720, margin: '0 auto' }}>
            Bukan hanya menghafal teori, tetapi belajar sambil bikin karya nyata. Kami mendampingi santri, pelajar, dan generasi muda dari nol hingga memiliki karya berdaya saing global.
          </p>
        </div>
      </section>

      {/* 2. Three Pillars */}
      <section style={{ padding: '80px var(--gutter)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading
            title="Tiga Pilar Pembelajaran Crygle"
            supporting="Setiap program kami dirancang terintegrasi untuk mengasah daya imajinasi, logika komputasi, dan kecakapan rekayasa teknologi."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
            {pillars.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 32,
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 32 }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 22, fontWeight: 700, color: 'var(--black)' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-core)', fontSize: 14.5, color: 'var(--grey-500)', lineHeight: 1.6, flexGrow: 1 }}>
                  {p.desc}
                </p>
                <div style={{ fontSize: 13, fontWeight: 700, color: p.tagColor, paddingTop: 12, borderTop: '1px solid var(--border-default)' }}>
                  {p.tag}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Counter Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 64, padding: '36px 0', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
            {stats.map((s, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-core)', fontSize: 38, fontWeight: 800, color: 'var(--blue-500)' }}>
                  {s.number}
                </div>
                <div style={{ fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--grey-400)', marginTop: 6 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Methodology & Studio */}
      <section style={{ padding: '80px var(--gutter)', background: 'var(--surface-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-tint)', color: 'var(--blue-500)', fontFamily: 'var(--font-core)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
              Metodologi Belajar
            </span>
            <h2 style={{ fontFamily: 'var(--font-core)', fontSize: 34, fontWeight: 700, color: 'var(--black)', lineHeight: 1.3, marginBottom: 16 }}>
              80% Praktek Nyata, 20% Fondasi Konsep
            </h2>
            <p style={{ fontFamily: 'var(--font-core)', fontSize: 16, color: 'var(--grey-500)', lineHeight: 1.65, marginBottom: 24 }}>
              Kami percaya keahlian digital tidak lahir dari sekadar membaca slide presentasi, melainkan dari keberanian mengotak-atik tools, memecahkan error, dan menyelesaikan proyek nyata.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Proyek berbasis studi kasus industri nyata.',
                'Feedback langsung dan code review mingguan oleh mentor.',
                'Komunitas santri saling dukung dan sharing peluang karir.',
              ].map((text, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-core)', fontSize: 15, fontWeight: 600, color: 'var(--black)' }}>
                  <span style={{ color: '#31BC53', fontSize: 18, fontWeight: 800 }}>✓</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', padding: 36, boxShadow: 'var(--shadow-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 20, fontWeight: 700, color: 'var(--black)', marginBottom: 12 }}>
              Studio & Hub Pembelajaran
            </h3>
            <p style={{ fontFamily: 'var(--font-core)', fontSize: 14.5, color: 'var(--grey-500)', lineHeight: 1.6, marginBottom: 20 }}>
              Berlokasi di Pekanbaru, Riau, Crygle Studio memadukan kenyamanan fasilitas studio fisik dengan platform digital modern untuk menjangkau santri dari seluruh penjuru nusantara.
            </p>
            <div style={{ fontFamily: 'var(--font-core)', fontSize: 13.5, color: 'var(--blue-500)', fontWeight: 700, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span>📍</span>
              <span>Jl. Cipta Karya, Sidomulyo Bar., Kec. Tampan, Kota Pekanbaru, Riau</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
