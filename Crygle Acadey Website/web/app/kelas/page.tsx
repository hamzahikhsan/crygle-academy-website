import Link from 'next/link';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { CourseCard } from '@/components/commerce/CourseCard.jsx';
import { courses } from '@/data/courses';

export default function KatalogPage() {
  return (
    <section style={{ padding: '60px var(--gutter)' }}>
      <SectionHeading title="Katalog Kelas" supporting="Semua kelas yang tersedia di Crygle Academy — pilih sesuai minatmu." />
      <div style={{ display: 'flex', gap: 12, margin: '32px 0', flexWrap: 'wrap' }}>
        {['Semua Kelas', 'UI/UX Design', '3D & Animation', 'Front-End Coding'].map((label, idx) => (
          <span
            key={label}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              background: idx === 0 ? 'var(--blue-500)' : 'var(--surface-tint)',
              color: idx === 0 ? 'var(--white)' : 'var(--black)',
              fontFamily: 'var(--font-core)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
        {courses.map((course) => (
          <Link key={course.slug} href={`/kelas/${course.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'center' }}>
            <CourseCard {...course} />
          </Link>
        ))}
      </div>
    </section>
  );
}
