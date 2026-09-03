import React from 'react';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export function AboutSection() {
  const pillars = [
    {
      title: 'Kreatif Design',
      desc: 'Mulai dari pemahaman dasar estetika, riset pengguna, hingga memproduksi UI Kit komersial dan 3D visual siap jual di pasar global.',
      tag: 'UI/UX · 3D Modeling · Vector Art',
    },
    {
      title: 'Kreatif Coding',
      desc: 'Membangun logika berpikir komputasional dengan membuat game interaktif, animasi web modern, dan aplikasi portofolio nyata.',
      tag: 'Web Dev · Game Logic · Creative Tech',
    },
    {
      title: 'Kreatif Robot',
      desc: 'Mengenalkan otomasi cerdas, sensor, mikrokontroler Arduino/IoT, hingga persiapan kompetisi robotika ramah santri.',
      tag: 'Arduino · IoT Automation · Robotics',
    },
  ];

  const stats = [
    { value: '10.000+', label: 'Santri & Santriwati Terlatih' },
    { value: '94%', label: 'Tingkat Kelulusan & Karya' },
    { value: '150+', label: 'Mitra Sekolah & Komunitas' },
    { value: '350+', label: 'Portofolio Santri Terkurasi' },
  ];

  return (
    <section id="about-section" style={{ padding: '80px var(--gutter)', background: 'var(--surface-subtle)' }}>
      <SectionHeading
        title="Sanctuary Belajar Kreatif Digital K-12"
        supporting="Crygle Academy menyeimbangkan teori dengan aksi nyata. Kami membimbing santri dari nol hingga mampu memproduksi karya berstandar industri."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-lg)',
              padding: 32,
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <span style={{ fontFamily: 'var(--font-core)', fontSize: 12, fontWeight: 700, color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: 1 }}>
              {pillar.tag}
            </span>
            <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 22, fontWeight: 700, color: 'var(--black)' }}>
              {pillar.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-core)', fontSize: 15, color: 'var(--grey-500)', lineHeight: 1.6 }}>
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 48, padding: '32px 0', borderTop: '1px solid var(--border-default)' }}>
        {stats.map((s, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-core)', fontSize: 36, fontWeight: 800, color: 'var(--blue-500)' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--grey-400)', marginTop: 6 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
