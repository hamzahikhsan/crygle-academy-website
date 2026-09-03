import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { mentors } from '@/data/mentors';

export function MentorSection() {
  const teaserMentors = mentors.filter((m) => m.slug !== 'dimas-pradipa-abiyuda');

  return (
    <section id="mentor-section" style={{ padding: '80px var(--gutter)', background: 'var(--surface-subtle)' }}>
      <SectionHeading
        title="Belajar Langsung dari Mentor Praktisi"
        supporting="Dibimbing oleh profesional berpengalaman yang aktif berkarya di industri 3D, agency desain, dan software development."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
        {teaserMentors.map((m) => (
          <div
            key={m.slug}
            style={{
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                <img
                  src={m.image}
                  alt={m.name}
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-core)', fontSize: 16, fontWeight: 700, color: 'var(--black)' }}>
                    {m.name}
                  </h4>
                  <span style={{ fontFamily: 'var(--font-core)', fontSize: 13, color: 'var(--grey-400)' }}>
                    {m.role}
                  </span>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-core)', fontSize: 13.5, color: 'var(--grey-500)', lineHeight: 1.6, marginBottom: 16 }}>
                {m.bio}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border-default)' }}>
              <span style={{ fontFamily: 'var(--font-core)', fontSize: 12, fontWeight: 700, color: 'var(--yellow-500)' }}>
                ⭐ {m.rating}
              </span>
              <span style={{ fontFamily: 'var(--font-core)', fontSize: 12, color: 'var(--grey-400)' }}>
                {m.students}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <Link
          href="/mentor"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 28px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--white)',
            color: 'var(--blue-500)',
            border: '2px solid var(--blue-500)',
            fontFamily: 'var(--font-core)',
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Lihat Profil Semua Mentor →
        </Link>
      </div>
    </section>
  );
}
