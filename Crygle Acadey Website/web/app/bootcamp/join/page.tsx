import React from 'react';
import Link from 'next/link';

export default function BootcampJoinPage() {
  return (
    <div
      className="bootcamp-join-container"
      style={{
        maxWidth: 840,
        margin: '0 auto',
        padding: '48px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      {/* Top back navigation */}
      <div>
        <Link
          href="/bootcamp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--color-primary, #235F9C)',
            textDecoration: 'none',
            padding: '8px 16px',
            background: '#F1F6FC',
            borderRadius: 50,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </svg>
          <span>Kembali ke Info Bootcamp</span>
        </Link>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: 20,
            background: '#E8F8EE',
            color: '#269C45',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            alignSelf: 'flex-start',
          }}
        >
          Onboarding Pendaftaran Cohort Batch 12
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-core)',
            fontSize: 32,
            fontWeight: 800,
            color: '#202020',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          Langkah Bergabung Bootcamp Intensif
        </h1>
        <p style={{ fontSize: 16, color: 'var(--grey-600, #5A6062)', lineHeight: 1.6, margin: 0 }}>
          Ikuti 3 tahapan mudah berikut untuk mengonfirmasi keikutsertaanmu dalam ekosistem belajar intensif 12 pekan bersama mentor praktisi industri.
        </p>
      </div>

      {/* 3 Steps List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Step 1 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--grey-100, #EAEAEA)',
            borderRadius: 16,
            padding: '28px 24px',
            display: 'flex',
            gap: 20,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#F1F6FC',
              color: 'var(--color-primary, #235F9C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            1
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#202020', margin: 0 }}>
              Buat atau Masuk ke Akun Crygle Academy
            </h2>
            <p style={{ fontSize: 14, color: 'var(--grey-600, #5A6062)', lineHeight: 1.6, margin: 0 }}>
              Akun siswa digunakan untuk mengakses workspace bootcamp, mencatat kehadiran sesi live, mengunggah tugas Figma, dan menyimpan sertifikat kelulusan.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
              <Link
                href="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 18px',
                  borderRadius: 50,
                  background: '#F1F6FC',
                  color: 'var(--color-primary, #235F9C)',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Masuk ke Akun
              </Link>
              <Link
                href="/signup"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 18px',
                  borderRadius: 50,
                  background: '#ffffff',
                  border: '1px solid var(--grey-200, #DFDFDF)',
                  color: '#202020',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--grey-100, #EAEAEA)',
            borderRadius: 16,
            padding: '28px 24px',
            display: 'flex',
            gap: 20,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#F1F6FC',
              color: 'var(--color-primary, #235F9C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            2
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#202020', margin: 0 }}>
              Selesaikan Pembayaran Paket Bootcamp
            </h2>
            <p style={{ fontSize: 14, color: 'var(--grey-600, #5A6062)', lineHeight: 1.6, margin: 0 }}>
              Selesaikan pembayaran pendaftaran bootcamp melalui alur Checkout terintegrasi (Virtual Account Bank BNI, Mandiri, BSI, Kartu Kredit, atau QRIS).
            </p>
            <div style={{ marginTop: 6 }}>
              <Link
                href="/checkout"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 50,
                  background: 'var(--color-primary, #235F9C)',
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(35, 95, 156, 0.25)',
                }}
              >
                <span>Selesaikan pembayaran paket Bootcamp</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--grey-100, #EAEAEA)',
            borderRadius: 16,
            padding: '28px 24px',
            display: 'flex',
            gap: 20,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#E8F8EE',
              color: '#269C45',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            3
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#202020', margin: 0 }}>
              Gabung Grup WhatsApp Cohort Resmi
            </h2>
            <p style={{ fontSize: 14, color: 'var(--grey-600, #5A6062)', lineHeight: 1.6, margin: 0 }}>
              Setelah pembayaran terverifikasi, langsung bergabung ke komunitas WhatsApp santri Batch 12 untuk menerima jadwal sesi live Google Meet dan koordinasi kelompok belajar.
            </p>
            <div style={{ marginTop: 6 }}>
              <a
                href="https://chat.whatsapp.com/demo-crygle-bootcamp-cohort"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 50,
                  background: '#25D366',
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                }}
              >
                <span>Gabung Grup WhatsApp Cohort resmi</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Already enrolled banner */}
      <div
        style={{
          background: '#F8FAFD',
          border: '1.5px dashed #235F9C',
          borderRadius: 16,
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#202020' }}>
            Sudah terdaftar di cohort Batch 12?
          </div>
          <div style={{ fontSize: 13, color: 'var(--grey-600, #5A6062)', marginTop: 2 }}>
            Langsung akses jadwal, tugas, dan booking konsultasi mentor di workspace santri.
          </div>
        </div>

        <Link
          href="/dashboard?tab=bootcamp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            borderRadius: 50,
            background: 'var(--color-primary, #235F9C)',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          <span>Buka Dashboard Bootcamp Saya</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
