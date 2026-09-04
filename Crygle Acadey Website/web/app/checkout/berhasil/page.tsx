'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCheckoutState, PaymentMethod } from '@/hooks/useCheckoutState';

const METHOD_LABELS: Record<PaymentMethod, string> = {
  card: 'Debit/Credit Card',
  bni: 'Transfer Bank BNI',
  mandiri: 'Transfer Bank Mandiri',
  bsi: 'Transfer Bank Syariah Indonesia',
  qris: 'QRIS',
};

export default function BerhasilPage() {
  const { paymentMethod, pricing } = useCheckoutState();
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const formatRupiah = (val: number) => `Rp${val.toLocaleString('id-ID')}`;

  return (
    <main style={{ maxWidth: 840, margin: '0 auto', padding: '60px 24px 100px', textAlign: 'center' }}>
      <div
        style={{
          background: 'var(--white, #ffffff)',
          borderRadius: 'var(--radius-lg, 20px)',
          border: '1px solid var(--grey-100, #EAEAEA)',
          padding: '48px 36px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Animated / Glowing Checkmark Badge */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--surface-tint, #ecfdf5)',
            border: '2px solid rgba(16, 185, 129, 0.3)',
            color: 'var(--color-success, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 24px rgba(16, 185, 129, 0.25)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-core)',
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 10,
            color: 'var(--black)',
          }}
        >
          Pembayaran Berhasil! 🎉
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-core)',
            color: 'var(--grey-500)',
            fontSize: 15,
            maxWidth: 520,
            margin: '0 auto 36px auto',
            lineHeight: '24px',
          }}
        >
          Kamu sudah berhasil bergabung di kelas ini. Perjalanan belajarmu dimulai sekarang di sanctuary digital kami.
        </p>

        {/* Enrolled Course Box with 0% Progress */}
        <div
          style={{
            background: 'var(--surface-subtle, #f8fafc)',
            borderRadius: 'var(--radius-md, 14px)',
            border: '1px solid var(--grey-100, #EAEAEA)',
            padding: '20px 24px',
            textAlign: 'left',
            marginBottom: 36,
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=160&auto=format&fit=crop&q=80"
              alt="UI/UX Course Thumbnail"
              style={{ width: 88, height: 66, borderRadius: 10, objectFit: 'cover' }}
            />
            <div>
              <h2 style={{ fontFamily: 'var(--font-core)', fontSize: 16, fontWeight: 700, color: 'var(--black)', margin: '0 0 6px 0' }}>
                UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit
              </h2>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--blue-500, #0056F2)',
                  background: 'var(--surface-tint, #f0f4ff)',
                  padding: '3px 8px',
                  borderRadius: 4,
                }}
              >
                Advanced UI/UX Design Mastery
              </span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: 'var(--grey-500)', fontWeight: 500 }}>Progress Belajar</span>
              <span style={{ color: 'var(--blue-500, #0056F2)', fontWeight: 800 }}>0%</span>
            </div>
            <div style={{ width: '100%', height: 6, background: 'var(--grey-100)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '3%', height: '100%', background: 'var(--blue-500, #0056F2)', borderRadius: 4 }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--grey-400)', marginTop: 6, marginBottom: 0 }}>
              Belum ada materi yang diselesaikan
            </p>
          </div>
        </div>

        {/* Dual CTA Buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40 }}>
          <Link
            href="/dashboard"
            style={{
              padding: '14px 32px',
              borderRadius: 'var(--radius-control, 10px)',
              background: 'var(--blue-500, #0056F2)',
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Mulai Belajar
          </Link>
          <button
            type="button"
            onClick={() => setIsReceiptOpen(true)}
            style={{
              padding: '14px 28px',
              borderRadius: 'var(--radius-control, 10px)',
              background: 'var(--white)',
              border: '1px solid var(--grey-200, #cbd5e1)',
              color: 'var(--black)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Lihat Kuitansi
          </button>
        </div>

        {/* 3 Trust Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            borderTop: '1px solid var(--grey-100, #EAEAEA)',
            paddingTop: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ color: 'var(--blue-500, #0056F2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--grey-500)' }}>Akses Selamanya</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ color: 'var(--blue-500, #0056F2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--grey-500)' }}>Sertifikat Resmi</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ color: 'var(--blue-500, #0056F2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--grey-500)' }}>Grup Komunitas</span>
          </div>
        </div>
      </div>

      {/* Official Digital Receipt Modal */}
      {isReceiptOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setIsReceiptOpen(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 16,
              maxWidth: 480,
              width: '100%',
              padding: 32,
              position: 'relative',
              textAlign: 'left',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup Faktur"
              onClick={() => setIsReceiptOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'none',
                border: 'none',
                fontSize: 18,
                cursor: 'pointer',
                color: 'var(--grey-400)',
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <img src="/logo/crygle-lockup-blue.png" alt="Crygle Academy" style={{ height: 36, marginBottom: 12 }} />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: 1,
                    padding: '4px 10px',
                    borderRadius: 4,
                  }}
                >
                  LUNAS · VERIFIED
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
              <span style={{ color: 'var(--grey-500)' }}>No. Faktur</span>
              <strong style={{ color: 'var(--black)' }}>#INV-20260903-882</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
              <span style={{ color: 'var(--grey-500)' }}>Tanggal Transaksi</span>
              <strong style={{ color: 'var(--black)' }}>3 September 2026</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
              <span style={{ color: 'var(--grey-500)' }}>Metode Pembayaran</span>
              <strong style={{ color: 'var(--black)' }}>{METHOD_LABELS[paymentMethod] || 'Transfer Bank BNI'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
              <span style={{ color: 'var(--grey-500)' }}>Nama Pembeli</span>
              <strong style={{ color: 'var(--black)' }}>Dion Ahza</strong>
            </div>

            <div style={{ height: 1, background: 'var(--grey-100)', margin: '16px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--grey-500)' }}>Advanced UI/UX Design Mastery</span>
                <span style={{ fontWeight: 600 }}>{formatRupiah(pricing.base)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--grey-500)' }}>Registration Fee</span>
                <span style={{ fontWeight: 600 }}>{formatRupiah(pricing.regFee)}</span>
              </div>
              {pricing.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success, #10b981)' }}>
                  <span>Potongan Promo</span>
                  <span style={{ fontWeight: 600 }}>-{formatRupiah(pricing.discount)}</span>
                </div>
              )}
            </div>

            <div style={{ height: 1, background: 'var(--grey-100)', margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-500, #0056F2)' }}>
                {formatRupiah(pricing.total)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => typeof window !== 'undefined' && window.print()}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 8,
                background: 'var(--blue-500, #0056F2)',
                color: 'white',
                border: 'none',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Cetak Kuitansi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
