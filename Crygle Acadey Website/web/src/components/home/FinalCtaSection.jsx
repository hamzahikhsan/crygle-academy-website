import React from 'react';
import Link from 'next/link';

export function FinalCtaSection() {
  return (
    <section style={{ padding: '80px var(--gutter)' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--blue-500) 0%, var(--blue-400) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '64px 48px',
          textAlign: 'center',
          color: 'var(--white)',
          boxShadow: '0 20px 40px rgba(35, 95, 156, 0.25)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-core)', fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
          Siap Mulai Perjuangan Kreatifmu Hari Ini?
        </h2>
        <p style={{ fontFamily: 'var(--font-core)', fontSize: 18, opacity: 0.9, maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
          Bergabung bersama ribuan santri lainnya, kuasai skill digital masa depan, dan ciptakan karya pertamamu sekarang juga.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/kelas"
            style={{
              padding: '16px 36px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--yellow-500)',
              color: 'var(--black)',
              fontFamily: 'var(--font-core)',
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            }}
          >
            Mulai Belajar Sekarang
          </Link>
          <Link
            href="/tentang"
            style={{
              padding: '16px 36px',
              borderRadius: 'var(--radius-pill)',
              background: 'transparent',
              border: '2px solid var(--white)',
              color: 'var(--white)',
              fontFamily: 'var(--font-core)',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Pelajari Filosofi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}
