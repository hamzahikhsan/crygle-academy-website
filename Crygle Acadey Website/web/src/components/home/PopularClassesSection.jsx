import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { CourseCard } from '@/components/commerce/CourseCard.jsx';
import { courses } from '@/data/courses';

export function PopularClassesSection() {
  return (
    <section id="popular-courses" style={{ padding: '100px var(--gutter)' }}>
      <SectionHeading
        title="Kelas Populer"
        supporting="Beberapa kelas andalan kami yang bisa diikuti secara gratis sebelum mengikuti kelas LEVEL UP yang sudah kami sediakan."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginTop: 48, justifyContent: 'center' }}>
        {courses.map((course) => (
          <Link key={course.slug} href={`/kelas/${course.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'center' }}>
            <CourseCard {...course} />
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
        <Link
          href="/kelas"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 32px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--blue-500)',
            color: 'var(--white)',
            fontFamily: 'var(--font-core)',
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(35, 95, 156, 0.25)',
          }}
        >
          Lihat Semua Kelas
        </Link>
      </div>
    </section>
  );
}
