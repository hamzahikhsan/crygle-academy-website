import React from 'react';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { Avatar } from '@/components/media/Avatar.jsx';
import { testimonials } from '@/data/testimonials';

export function TestimonialSection() {
  const t = testimonials[0];

  return (
    <section style={{ padding: '80px var(--gutter)' }}>
      <SectionHeading
        title="Cerita Perjuangan Mereka"
        supporting="Pengalaman langsung santri yang telah belajar dan membuktikan hasil karyanya bersama Crygle Academy."
      />
      <div style={{ maxWidth: 840, margin: '48px auto 0', padding: 40, background: 'var(--surface-tint)', borderRadius: 'var(--radius-xl)', display: 'flex', gap: 32, alignItems: 'center' }}>
        <Avatar src={t.avatar} name={t.name} size={96} ring="var(--white)" />
        <div>
          <p style={{ fontFamily: 'var(--font-core)', fontSize: 18, color: 'var(--black)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
            &ldquo;{t.quote}&rdquo;
          </p>
          <div style={{ fontFamily: 'var(--font-core)', fontSize: 17, fontWeight: 700, color: 'var(--blue-500)' }}>
            {t.name}
          </div>
          <div style={{ fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--grey-400)', marginTop: 4 }}>
            {t.role}
          </div>
        </div>
      </div>
    </section>
  );
}
