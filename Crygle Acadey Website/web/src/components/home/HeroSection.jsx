import React from 'react';
import { Button } from '@/components/core/Button.jsx';

export function HeroSection() {
  return (
    <section id="hero" style={{ padding: '80px var(--gutter) 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 48, lineHeight: 1.15, color: 'var(--black)', maxWidth: 560 }}>
          Tempat Perjuangan Kreatif Anak Muda Dimulai
        </h1>
        <div style={{ maxWidth: 420 }}>
          <p style={{ fontFamily: 'var(--font-core)', fontSize: 18, color: 'var(--grey-500)', marginBottom: 24, lineHeight: 1.6 }}>
            Bukan hanya teori, tapi juga aksi. Di sini, kamu bisa belajar sambil bikin karya nyata.
          </p>
          <Button size="large" pill><a href="#popular-courses" style={{ color: 'inherit', textDecoration: 'none' }}>Explore Kelas</a></Button>
        </div>
      </div>
    </section>
  );
}
