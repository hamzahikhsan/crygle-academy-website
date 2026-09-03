import React from 'react';
import { mentors } from '@/data/mentors';

export function MentorTab() {
  const dimas = mentors.find((m) => m.slug === 'dimas-pradipa-abiyuda') || mentors[0];

  return (
    <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)' }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
        <img
          src={dimas.image}
          alt={dimas.name}
          style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 22, fontWeight: 700, color: 'var(--black)' }}>
            {dimas.name}
          </h3>
          <p style={{ fontFamily: 'var(--font-core)', fontSize: 15, color: 'var(--grey-400)', marginTop: 4 }}>
            {dimas.role}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--font-core)', fontSize: 15, color: 'var(--grey-500)', lineHeight: 1.7 }}>
        <p>
          Seorang UI/UX Designer berpengalaman yang telah berhasil membuat dan menjual berbagai produk UI Kit di marketplace internasional seperti UI8, sekaligus CEO & Founder CRYGLE Academy, dengan pengalaman lebih dari 4 tahun di bidang UI/UX serta 3 tahun mengajar di lembaga pendidikan formal tingkat SMK.
        </p>
        <p>
          Melalui perjalanan kariernya, ia tidak hanya berfokus pada pengembangan desain digital, tetapi juga berhasil menghasilkan ribuan dolar dari penjualan produk UI Kit yang dibuatnya sendiri, membuktikan bahwa skill desain dapat menjadi sumber penghasilan nyata di era digital saat ini.
        </p>
        <p>
          Berangkat dari pengalaman tersebut, ia memiliki passion besar dalam membimbing pemula yang ingin memulai karier di bidang UI/UX, khususnya bagi siswa yang belum memiliki pengalaman sama sekali. Dengan pendekatan pembelajaran yang sederhana, terstruktur, dan mudah dipahami, ia berkomitmen untuk membantu setiap peserta memahami dasar desain, membangun UI Kit yang berkualitas, hingga mampu memonetisasi karya mereka menjadi sumber penghasilan dalam bentuk dolar, sehingga siapa pun dapat memulai dari nol dan berkembang menjadi kreator digital yang produktif.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 32, padding: '24px 0', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: 'var(--grey-400)' }}>Review</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginTop: 4 }}>
            <span style={{ color: 'var(--yellow-500)' }}>⭐ 4.8</span>
            <span style={{ color: 'var(--grey-400)', fontWeight: 500, fontSize: 13 }}>(2.650 Reviews)</span>
          </div>
        </div>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: 'var(--grey-400)' }}>Total Siswa</span>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--black)', marginTop: 4 }}>3.000 Siswa</p>
        </div>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: 'var(--grey-400)' }}>Total Course</span>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--black)', marginTop: 4 }}>5 Course</p>
        </div>
      </div>

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--surface-tint)', borderRadius: 'var(--radius-md)', fontStyle: 'italic', fontFamily: 'var(--font-core)', fontSize: 15, color: 'var(--blue-500)', fontWeight: 600 }}>
        &ldquo;Semua orang bisa mulai dari nol. Yang penting adalah mulai dulu dan konsisten.&rdquo;
      </div>
    </div>
  );
}
