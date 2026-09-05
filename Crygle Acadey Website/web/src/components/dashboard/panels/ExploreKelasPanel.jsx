'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { exploreCourses } from '@/data/exploreCourses';

export function ExploreKelasPanel() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Kelas' },
    { id: 'design', label: 'UI/UX Design' },
    { id: '3d', label: '3D & Animation' },
    { id: 'code', label: 'Front-End Coding' },
    { id: 'ai', label: 'AI for Designers' },
  ];

  const filteredCourses =
    activeCategory === 'all'
      ? exploreCourses
      : exploreCourses.filter((course) => course.category === activeCategory);

  function handleCopyVoucher() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('CRYGLE50');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function getCourseHref(course) {
    if (course.category === 'design' && course.title.includes('Menjual Produk UI Kit')) {
      return '/kelas/ui-ux-menjual-produk-ui-kit';
    }
    return '/kelas';
  }

  return (
    <section id="panel-explore" className="dashboard-panel" style={{ display: 'block' }}>
      <div className="explore-content-body" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Promo Banner */}
        <div
          className="explore-promo-banner"
          style={{
            background: 'linear-gradient(135deg, #184370 0%, #235F9C 100%)',
            borderRadius: 20,
            padding: 30,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 10px 28px rgba(35, 95, 156, 0.15)',
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <span
              style={{
                background: '#FCC112',
                color: '#202020',
                fontSize: 11,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 20,
                display: 'inline-block',
                marginBottom: 8,
              }}
            >
              VOUCHER KHUSUS SANTRI
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.3 }}>
              Gunakan Kode "CRYGLE50" untuk Diskon 50%
            </h2>
            <p style={{ fontSize: 13.5, opacity: 0.9, margin: 0 }}>
              Tersedia subsidi beasiswa belajar untuk siswa SMK dan santri asrama mitra.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCopyVoucher}
            style={{
              background: '#ffffff',
              color: 'var(--color-primary, #235F9C)',
              borderRadius: 50,
              fontWeight: 800,
              padding: '12px 24px',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.2s ease',
            }}
          >
            {copied ? '✓ Kupon Tersalin!' : 'Salin Kupon CRYGLE50'}
          </button>
        </div>

        {/* Category Filter Chips */}
        <div
          className="category-chips-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`category-chip-pill ${isActive ? 'active' : ''}`}
                style={{
                  padding: '8px 18px',
                  borderRadius: 50,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? '1px solid var(--color-primary, #235F9C)' : '1px solid #EAEAEA',
                  background: isActive ? 'var(--color-primary, #235F9C)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#5A6062',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Course Catalog Grid (6 Classes) */}
        <div
          className="explore-catalog-grid"
          id="explore-catalog-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.title}
              className="catalog-course-item"
              data-cat={course.category}
              style={{
                background: '#ffffff',
                border: '1px solid #E9E9E9',
                borderRadius: 20,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 16,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div>
                <div
                  className="course-card-thumb-wrap"
                  style={{
                    height: 160,
                    marginBottom: 14,
                    borderRadius: 14,
                    overflow: 'hidden',
                    background: '#F1F6FC',
                  }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-card-thumb-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: '#797979',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {course.levelBadge}
                </span>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#202020',
                    margin: '8px 0 10px 0',
                    lineHeight: 1.4,
                  }}
                >
                  {course.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 16 }}>
                  <span style={{ color: '#FCC112', fontWeight: 700 }}>★ {course.rating.toFixed(1)}</span>
                  <span style={{ color: '#797979' }}>{course.studentsLabel}</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary, #235F9C)' }}>
                    {course.price}
                  </span>
                  <span style={{ fontSize: 13, textDecoration: 'line-through', color: '#A6A6A6' }}>
                    {course.originalPrice}
                  </span>
                </div>
                <Link
                  href={getCourseHref(course)}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    display: 'block',
                    textAlign: 'center',
                    borderRadius: 50,
                    padding: '10px 16px',
                    textDecoration: 'none',
                    background: 'var(--color-primary, #235F9C)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 13,
                    boxSizing: 'border-box',
                  }}
                >
                  Lihat Detail Kelas
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
