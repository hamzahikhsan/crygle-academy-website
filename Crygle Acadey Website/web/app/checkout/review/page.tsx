'use client';

import React from 'react';
import Link from 'next/link';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper.jsx';
import { useCheckoutState, PaymentMethod } from '@/hooks/useCheckoutState';

const METHOD_LABELS: Record<PaymentMethod, string> = {
  card: 'Debit/Credit Card',
  bni: 'Transfer Bank BNI',
  mandiri: 'Transfer Bank Mandiri',
  bsi: 'Transfer Bank Syariah Indonesia',
  qris: 'QRIS',
};

export default function ReviewPage() {
  const { paymentMethod, scenario, setScenario, pricing } = useCheckoutState();

  const formatRupiah = (val: number) => `Rp${val.toLocaleString('id-ID')}`;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
      <CheckoutStepper active="review" />

      <div
        style={{
          background: 'var(--white, #ffffff)',
          borderRadius: 'var(--radius-lg, 16px)',
          border: '1px solid var(--grey-100, #EAEAEA)',
          padding: '36px 32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-core)',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 28,
            color: 'var(--black)',
            textAlign: 'center',
          }}
        >
          Konfirmasi Pembayaran
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
            <span style={{ color: 'var(--grey-500)', fontWeight: 500 }}>Atas Nama</span>
            <span style={{ fontWeight: 700, color: 'var(--black)' }}>Dion Ahza</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
            <span style={{ color: 'var(--grey-500)', fontWeight: 500 }}>Course</span>
            <span style={{ fontWeight: 700, color: 'var(--black)' }}>UI/UX Design Advanced</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
            <span style={{ color: 'var(--grey-500)', fontWeight: 500 }}>Mentor</span>
            <span style={{ fontWeight: 700, color: 'var(--black)' }}>Dimas Pradipa Abiyuda</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
            <span style={{ color: 'var(--grey-500)', fontWeight: 500 }}>Metode Pembayaran</span>
            <span style={{ fontWeight: 700, color: 'var(--black)' }} id="review-payment-method">
              {METHOD_LABELS[paymentMethod] || 'Debit/Credit Card'}
            </span>
          </div>

          <div style={{ height: 1, background: 'var(--grey-100, #EAEAEA)', margin: '6px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 16, color: 'var(--grey-500)', fontWeight: 600 }}>Total Invest</span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: 'var(--blue-500, #0056F2)',
              }}
              id="review-total-price"
            >
              {formatRupiah(pricing.total)}
            </span>
          </div>
        </div>

        {/* Sandbox Mode */}
        <div
          style={{
            background: 'var(--surface-tint, #f0f4ff)',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: 28,
            border: '1px dashed var(--blue-300, #93c5fd)',
          }}
        >
          <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--blue-500, #0056F2)', marginBottom: 10 }}>
            🧪 Mode Sandbox — Simulasikan Hasil Verifikasi:
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="radio"
                name="payment-scenario"
                value="success"
                checked={scenario === 'success'}
                onChange={() => setScenario('success')}
              />
              <span>✅ Pembayaran Berhasil</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="radio"
                name="payment-scenario"
                value="failed"
                checked={scenario === 'failed'}
                onChange={() => setScenario('failed')}
              />
              <span>❌ Pembayaran Gagal</span>
            </label>
          </div>
        </div>

        {/* Confirm CTA */}
        <Link
          href="/checkout/processing"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 52,
            borderRadius: 'var(--radius-control, 10px)',
            background: 'var(--blue-500, #0056F2)',
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Konfirmasi &amp; Bayar
        </Link>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link
            href="/checkout"
            style={{
              fontSize: 14,
              color: 'var(--grey-400, #797979)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ← Kembali &amp; Ubah Metode Pembayaran
          </Link>
        </div>
      </div>
    </div>
  );
}
