import React from 'react';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { alumniWork } from '@/data/alumniWork';

export function AlumniShowcaseSection() {
  return (
    <section style={{ padding: '80px var(--gutter)', background: 'var(--surface-subtle)' }}>
      <SectionHeading
        title="Karya Nyata Santri & Alumni"
        supporting="Bukan sekadar latihan di atas kertas. Santri kami memproduksi karya digital fungsional, dari UI Kit komersial hingga aplikasi sekolah."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
        {alumniWork.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 220,
                background: `url(${item.image}) center / cover no-repeat`,
                backgroundColor: 'var(--blue-100)',
              }}
            />
            <div style={{ padding: 20 }}>
              <h4 style={{ fontFamily: 'var(--font-core)', fontSize: 18, fontWeight: 700, color: 'var(--black)', marginBottom: 6 }}>
                {item.title}
              </h4>
              <span style={{ fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--grey-400)' }}>
                {item.student}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
