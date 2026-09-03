import React from 'react';
import Link from 'next/link';
import { CourseTabs } from '@/components/course-details/CourseTabs.jsx';
import { courses } from '@/data/courses';

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug) || courses[2]; // Default to UI/UX flagship if not found

  return (
    <div style={{ padding: '60px var(--gutter)', background: 'var(--surface-base)' }}>
      {/* Course Header Banner */}
      <div style={{ maxWidth: 1200, margin: '0 auto 40px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
          <Link href="/kelas" style={{ fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--blue-500)', textDecoration: 'none' }}>
            ← Kembali ke Katalog
          </Link>
          <span style={{ color: 'var(--grey-300)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--grey-400)' }}>
            {course.level}
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-core)', fontSize: 36, fontWeight: 700, color: 'var(--black)', lineHeight: 1.3, maxWidth: 840 }}>
          {course.title}
        </h1>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
          <span style={{ fontFamily: 'var(--font-core)', fontSize: 15, fontWeight: 600, color: 'var(--yellow-500)' }}>
            ⭐ {course.rating}
          </span>
          <span style={{ fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--grey-400)' }}>
            {course.reviews}
          </span>
        </div>
      </div>

      {/* Main Content: Left Tabs + Right Sticky Sidebar */}
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'flex-start' }}>
        {/* Left Column: Interactive Tabs */}
        <div>
          <CourseTabs />
        </div>

        {/* Right Column: Sticky Pricing Sidebar */}
        <aside
          style={{
            position: 'sticky',
            top: 100,
            background: 'var(--surface-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 32,
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-core)', fontSize: 13, textTransform: 'uppercase', fontWeight: 600, color: 'var(--grey-400)' }}>
              Invest
            </span>
            <div style={{ fontFamily: 'var(--font-core)', fontSize: 36, fontWeight: 800, color: 'var(--blue-500)', marginTop: 4 }}>
              Rp449.000
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <span style={{ fontFamily: 'var(--font-core)', fontSize: 16, textDecoration: 'line-through', color: 'var(--grey-300)' }}>
                Rp899.000
              </span>
              <span style={{ background: 'var(--discount-bg)', color: 'var(--discount-fg)', padding: '2px 8px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700 }}>
                50% off
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '16px 24px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--blue-500)',
              color: 'var(--white)',
              fontFamily: 'var(--font-core)',
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 6px 16px rgba(35, 95, 156, 0.3)',
              marginBottom: 28,
            }}
          >
            Mulai Belajar
          </Link>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              '20+ Jam Durasi Belajar',
              'Advanced Level Class',
              'Konsultasi Kapan Saja',
              'Lifetime Access/Akses Seumur Hidup',
              'Certificate of Completion',
            ].map((benefit, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-core)', fontSize: 14, color: 'var(--grey-500)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--blue-500)" style={{ flexShrink: 0 }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
