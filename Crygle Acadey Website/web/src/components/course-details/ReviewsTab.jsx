import React from 'react';

export function ReviewsTab() {
  const reviews = [
    {
      name: 'Fathan Al-Ghifari',
      role: 'Siswa SMK Pekanbaru · 2 minggu lalu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      comment: 'Materi Mas Dimas sangat daging! Saya baru kelas 10 tapi sudah paham cara buat Auto Layout dan komponen varian di Figma. Modul pembukaan akun seller di UI8 juga sangat mendetail.',
    },
    {
      name: 'Clarissa Putri',
      role: 'Santriwati Boarding School · 1 bulan lalu',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
      comment: 'Akses seumur hidup sangat membantu karena waktu luang di asrama terbatas. Saya cicil belajar tiap akhir pekan dan mentor selalu cepat merespons di grup diskusi.',
    },
  ];

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 24, fontWeight: 700, color: 'var(--black)', marginBottom: 24 }}>
        Ulasan Siswa (1.600+ Ulasan)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {reviews.map((r, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--surface-card)',
              padding: 24,
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <img
                src={r.avatar}
                alt={r.name}
                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontFamily: 'var(--font-core)', fontSize: 16, fontWeight: 700, color: 'var(--black)' }}>
                  {r.name}
                </h4>
                <p style={{ fontFamily: 'var(--font-core)', fontSize: 12, color: 'var(--grey-400)' }}>
                  {r.role}
                </p>
              </div>
              <div style={{ marginLeft: 'auto', color: 'var(--yellow-500)', fontSize: 16 }}>
                ★★★★★
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-core)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--grey-500)' }}>
              {r.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
