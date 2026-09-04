'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckoutState } from '@/hooks/useCheckoutState';

export default function ProcessingPage() {
  const router = useRouter();
  const { scenario, pricing } = useCheckoutState();

  useEffect(() => {
    const target = scenario === 'failed' ? '/checkout/gagal' : '/checkout/berhasil';
    const timer = setTimeout(() => router.push(target), 2400);
    return () => clearTimeout(timer);
  }, [router, scenario]);

  const formatRupiah = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      {/* Animated Spinner Frame */}
      <div
        style={{
          width: 96,
          height: 96,
          margin: '0 auto 32px auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '4px solid var(--surface-tint, #f0f4ff)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '4px solid var(--blue-500, #0056F2)',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div style={{ color: 'var(--blue-500, #0056F2)', display: 'flex' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-core)',
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 12,
          color: 'var(--black)',
        }}
      >
        Memproses pembayaran kamu...
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-core)',
          color: 'var(--grey-500)',
          fontSize: 15,
          lineHeight: '24px',
          maxWidth: 460,
          margin: '0 auto 32px auto',
        }}
      >
        Mohon tunggu sebentar, kami sedang memastikan transaksi kamu berjalan aman di Sanctuary kami.
      </p>

      {/* Summary Box */}
      <div
        style={{
          background: 'var(--white, #ffffff)',
          borderRadius: 'var(--radius-lg, 16px)',
          border: '1px solid var(--grey-100, #EAEAEA)',
          padding: '20px 24px',
          maxWidth: 420,
          margin: '0 auto 28px auto',
          textAlign: 'left',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
          <span style={{ color: 'var(--grey-400)', fontWeight: 500 }}>Merchant</span>
          <strong style={{ color: 'var(--black)', fontWeight: 700 }}>CRYGLE Academy</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
          <span style={{ color: 'var(--grey-400)', fontWeight: 500 }}>Order ID</span>
          <strong style={{ color: 'var(--black)', fontWeight: 700 }}>#CR-99201-AX</strong>
        </div>
        <div style={{ height: 1, background: 'var(--grey-100)', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 4 }}>
          <span style={{ color: 'var(--grey-400)', fontWeight: 500, fontSize: 14 }}>Total</span>
          <strong style={{ color: 'var(--blue-500, #0056F2)', fontSize: 20, fontWeight: 800 }}>
            {formatRupiah(pricing.total)}
          </strong>
        </div>
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          color: 'var(--grey-400)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
        <span>Secured by Encrypted Gateway · Sanctuary Protocol</span>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
