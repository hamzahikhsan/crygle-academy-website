'use client';

import React, { useState } from 'react';

export function CurriculumTab() {
  const [openChapter, setOpenChapter] = useState(0);

  const chapters = [
    {
      title: 'Chapter 1 : Introduction to UI/UX & Digital Product',
      lessons: [
        'Apa itu UI dan UX Design',
        'Perbedaan UI vs UX dalam Praktik',
        'Kenapa UI Kit bisa dijual (💰 peluang monetisasi global)',
        'Overview Marketplace UI Kit (UI8, Envato, Freepik)',
        'Mindset: Dari Pelajar Menjadi Creator Digital Product',
      ],
    },
    {
      title: 'Chapter 2 : Basic UI Design Fundamentals',
      lessons: ['Teori Warna & Palet Harmonis', 'Hierarki Tipografi & Skala Font'],
    },
    {
      title: 'Chapter 3 : Wireframing & Information Architecture',
      lessons: ['User Flow & Wireflow Dasar', 'Membuat Wireframe Lo-Fi di Figma'],
    },
    {
      title: 'Chapter 4 : Design System & Component Mastery',
      lessons: ['Auto Layout & Constraints', 'Variants & Component Properties'],
    },
    {
      title: 'Chapter 5 : High-Fidelity UI Kit Production',
      lessons: ['Desain Mobile Screen & Web Plate', 'Iconography & Illustration Styling'],
    },
    {
      title: 'Chapter 6 : Packaging & Presentation for Marketplace',
      lessons: ['Membuat Dribbble/Behance Shot Mockup', 'Preview Cover Banner & File Structuring'],
    },
    {
      title: 'Chapter 7 : Opening Store & Uploading to UI8',
      lessons: ['Registrasi Akun Seller UI8', 'Format Metadata, Tagging & Pricing Strategy'],
    },
    {
      title: 'Chapter 8 : Payout Setup & Passive Income Optimization',
      lessons: ['Setup Rekening Bank & Stripe/Payoneer', 'Evaluasi Penjualan & Rilis Update UI Kit'],
    },
  ];

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 24, fontWeight: 700, color: 'var(--black)', marginBottom: 24 }}>
        Silabus Modul (8 Chapter Lengkap)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {chapters.map((ch, idx) => {
          const isOpen = openChapter === idx;
          return (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--white)',
              }}
            >
              <button
                type="button"
                onClick={() => setOpenChapter(isOpen ? -1 : idx)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 20px',
                  background: isOpen ? 'var(--surface-tint)' : 'var(--white)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-core)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--black)',
                }}
              >
                <span>{ch.title}</span>
                <span style={{ fontSize: 18, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                  ▾
                </span>
              </button>

              {isOpen && (
                <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--border-default)' }}>
                  {ch.lessons.map((lesson, lIdx) => (
                    <div key={lIdx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--blue-500)" style={{ flexShrink: 0 }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span style={{ fontFamily: 'var(--font-core)', fontSize: 14.5, color: 'var(--grey-500)' }}>
                        {lesson}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
