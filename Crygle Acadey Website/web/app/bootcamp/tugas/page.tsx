'use client';

import React, { useState } from 'react';
import { BootcampCohortShell } from '@/components/bootcamp/BootcampCohortShell.jsx';

export default function BootcampTugasPage() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!figmaUrl.trim()) return;
    setSubmitted(true);
  }

  return (
    <BootcampCohortShell active="tugas">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#202020', margin: '0 0 6px' }}>
            Pengumpulan Tugas dan Quiz
          </h2>
          <p style={{ fontSize: 14, color: 'var(--grey-500, #797979)', margin: 0 }}>
            Kerjakan studi kasus nyata per pekan untuk melatih portfolio UI/UX bernilai jual di marketplace global.
          </p>
        </div>

        {submitted && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 12,
              background: '#E8F8EE',
              border: '1px solid #B8E8C7',
              color: '#1E7E34',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            ✅ Link tugas Figma berhasil dikumpulkan! Mas Dimas akan mereview dan memberikan skor dalam 24 jam kerja.
          </div>
        )}

        <div
          className="assignment-grid-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {/* Tugas 1 Selesai */}
          <div
            className="assignment-card-box"
            style={{
              background: '#ffffff',
              border: '1px solid var(--grey-100, #EAEAEA)',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#269C45',
                    background: '#E8F8EE',
                    padding: '4px 10px',
                    borderRadius: 20,
                    letterSpacing: '0.04em',
                  }}
                >
                  ✓ SELESAI DINILAI
                </span>
                <span
                  className="assignment-grade-badge"
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#202020',
                    background: '#F1F6FC',
                    padding: '4px 12px',
                    borderRadius: 20,
                  }}
                >
                  90/100
                </span>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#202020', margin: '0 0 8px' }}>
                Tugas 1: Riset Tren Desain di UI8 &amp; Freepik
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--grey-600, #5A6062)', lineHeight: 1.5, margin: 0 }}>
                Analisis 3 produk UI Kit terlaris dan buat dokumen spesifikasi fitur calon produkmu.
              </p>
            </div>

            <div style={{ fontSize: 12.5, color: '#5A6062', borderTop: '1px solid #EAEAEA', paddingTop: 12 }}>
              Feedback Mentor: <em>&quot;Riset pasar sangat tajam. Pertahankan struktur kategori ini!&quot;</em>
            </div>
          </div>

          {/* Tugas 2 Selesai */}
          <div
            className="assignment-card-box"
            style={{
              background: '#ffffff',
              border: '1px solid var(--grey-100, #EAEAEA)',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#269C45',
                    background: '#E8F8EE',
                    padding: '4px 10px',
                    borderRadius: 20,
                    letterSpacing: '0.04em',
                  }}
                >
                  ✓ SELESAI DINILAI
                </span>
                <span
                  className="assignment-grade-badge"
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#202020',
                    background: '#F1F6FC',
                    padding: '4px 12px',
                    borderRadius: 20,
                  }}
                >
                  88/100
                </span>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#202020', margin: '0 0 8px' }}>
                Tugas 2: Design Tokens, Varian &amp; Typography
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--grey-600, #5A6062)', lineHeight: 1.5, margin: 0 }}>
                Menyusun master components tombol, input fields, dan color variables di Figma.
              </p>
            </div>

            <div style={{ fontSize: 12.5, color: '#5A6062', borderTop: '1px solid #EAEAEA', paddingTop: 12 }}>
              Feedback Mentor: <em>&quot;Auto layout sudah rapi, tinggal sempurnakan naming tokens.&quot;</em>
            </div>
          </div>

          {/* Tugas 3 Sedang Berjalan (Active) */}
          <div
            className="assignment-card-box active-assignment"
            style={{
              background: '#ffffff',
              border: '2px solid var(--color-primary, #235F9C)',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              boxShadow: '0 8px 24px rgba(35, 95, 156, 0.08)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#E02B20',
                    background: '#FFF1F0',
                    padding: '4px 10px',
                    borderRadius: 20,
                    letterSpacing: '0.04em',
                  }}
                >
                  ⏳ DEADLINE: 2 HARI LAGI
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--color-primary, #235F9C)',
                  }}
                >
                  Tugas Aktif
                </span>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#202020', margin: '0 0 8px' }}>
                Tugas 3: Desain 10 Screen Inti Dashboard UI Kit
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--grey-600, #5A6062)', lineHeight: 1.5, margin: 0 }}>
                Buat 10 artboard dashboard responsive dengan Dark Mode &amp; Light Mode.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderTop: '1px solid #EAEAEA',
                paddingTop: 14,
              }}
            >
              <input
                type="url"
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                placeholder="https://figma.com/file/..."
                required
                style={{
                  padding: '10px 14px',
                  border: '1.5px solid #EAEAEA',
                  borderRadius: 10,
                  fontSize: 13,
                  outline: 'none',
                  color: '#202020',
                  background: '#ffffff',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '10px 18px',
                  borderRadius: 50,
                  fontSize: 13,
                  fontWeight: 700,
                  background: 'var(--color-primary, #235F9C)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Unggah Link Tugas
              </button>
            </form>
          </div>
        </div>
      </div>
    </BootcampCohortShell>
  );
}
