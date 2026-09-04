'use client';

import React from 'react';
import Link from 'next/link';
import { useCheckoutState, PaymentMethod } from '@/hooks/useCheckoutState';

const METHOD_LABELS: Record<PaymentMethod, string> = {
  card: 'Debit/Credit Card',
  bni: 'Transfer Bank BNI',
  mandiri: 'Transfer Bank Mandiri',
  bsi: 'Transfer Bank Syariah Indonesia',
  qris: 'QRIS',
};

export default function GagalPage() {
  const { paymentMethod, pricing } = useCheckoutState();

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
        {/* Failed Badge */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--color-danger-bg, #fef2f2)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            color: 'var(--danger-500, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 24px rgba(239, 68, 68, 0.25)',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
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
          Pembayaran Belum Berhasil
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
          id="failed-reason-text"
        >
          Transaksi kamu tidak dapat diverifikasi. Saldo tidak mencukupi atau metode pembayaran ditolak oleh penyedia layanan.
        </p>

        {/* Order Recap Box */}
        <div
          style={{
            background: 'var(--color-danger-bg, #fef2f2)',
            borderRadius: 'var(--radius-md, 14px)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '20px 24px',
            textAlign: 'left',
            marginBottom: 32,
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
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
                  color: 'var(--danger-500, #ef4444)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  padding: '3px 8px',
                  borderRadius: 4,
                }}
              >
                Advanced UI/UX Design Mastery
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span style={{ color: 'var(--grey-500)', fontWeight: 500 }}>Order ID</span>
            <strong style={{ color: 'var(--black)' }}>#CR-99201-AX</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span style={{ color: 'var(--grey-500)', fontWeight: 500 }}>Metode Pembayaran</span>
            <strong style={{ color: 'var(--black)' }}>{METHOD_LABELS[paymentMethod] || 'Transfer Bank BNI'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderTop: '1px dashed rgba(239, 68, 68, 0.3)', paddingTop: 10 }}>
            <span style={{ color: 'var(--grey-500)', fontWeight: 700 }}>Total Tagihan</span>
            <strong style={{ color: 'var(--danger-500, #ef4444)', fontSize: 18, fontWeight: 800 }}>
              {formatRupiah(pricing.total)}
            </strong>
          </div>
        </div>

        {/* Kemungkinan Penyebab */}
        <div style={{ width: '100%', textAlign: 'left', marginBottom: 36 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 10 }}>
            Kemungkinan Penyebab:
          </h3>
          <ul style={{ paddingLeft: 20, fontSize: 14, color: 'var(--grey-500)', lineHeight: '24px', margin: 0 }}>
            <li>Saldo rekening atau limit kartu tidak mencukupi</li>
            <li>Nomor Virtual Account atau kode QRIS sudah kedaluwarsa (berlaku 15–60 menit)</li>
            <li>Transaksi ditolak sistem keamanan bank penerbit kartu</li>
            <li>Koneksi terputus saat proses verifikasi berlangsung</li>
          </ul>
        </div>

        {/* Dual CTA */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40 }}>
          <Link
            href="/checkout"
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
            Coba Metode Lain
          </Link>
          <a
            href="mailto:tanya@crygleacademy.com"
            style={{
              padding: '14px 28px',
              borderRadius: 'var(--radius-control, 10px)',
              background: 'var(--white)',
              border: '1px solid var(--grey-200, #cbd5e1)',
              color: 'var(--black)',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Hubungi Bantuan
          </a>
        </div>

        {/* Trust Badges */}
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
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--grey-500)' }}>Dana Aman Tersimpan</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ color: 'var(--blue-500, #0056F2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--grey-500)' }}>Live Chat Support</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ color: 'var(--blue-500, #0056F2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--grey-500)' }}>Coba Lagi Kapan Saja</span>
          </div>
        </div>
      </div>
    </main>
  );
}
