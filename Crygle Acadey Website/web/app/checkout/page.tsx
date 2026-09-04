'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper.jsx';
import { useCheckoutState, PaymentMethod } from '@/hooks/useCheckoutState';

export default function CheckoutPage() {
  const { paymentMethod, setPaymentMethod, promoCode, applyPromo, pricing } = useCheckoutState();
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ text: string; success: boolean } | null>(null);
  const [copiedVa, setCopiedVa] = useState<string | null>(null);

  // Card fields (empty by default)
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  function handleApplyPromo(e: React.FormEvent) {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput.trim());
    if (ok) {
      setPromoFeedback({ text: 'Kode promo berhasil digunakan! Hemat Rp50.000', success: true });
    } else {
      setPromoFeedback({ text: 'Kode promo tidak valid', success: false });
    }
  }

  function handleCopy(text: string, label: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedVa(label);
      setTimeout(() => setCopiedVa(null), 2500);
    }
  }

  const formatRupiah = (val: number) => `Rp${val.toLocaleString('id-ID')}`;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
      <CheckoutStepper active="pembayaran" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'start' }}>
        {/* Left Column: Payment Methods */}
        <div>
          <h1 style={{ fontFamily: 'var(--font-core)', fontSize: 24, fontWeight: 700, marginBottom: 20, color: 'var(--black)' }}>
            Metode Pembayaran
          </h1>

          <div
            style={{
              background: 'var(--white, #ffffff)',
              borderRadius: 'var(--radius-lg, 16px)',
              border: '1px solid var(--grey-100, #EAEAEA)',
              padding: 24,
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-core)', fontSize: 18, fontWeight: 600, marginBottom: 20, color: 'var(--black)' }}>
              Pilih Metode Pembayaran
            </h2>

            {/* Option 1: Card */}
            <div
              onClick={() => setPaymentMethod('card')}
              style={{
                borderRadius: 'var(--radius-md, 12px)',
                border: `2px solid ${paymentMethod === 'card' ? 'var(--blue-500, #0056F2)' : 'var(--grey-100, #EAEAEA)'}`,
                padding: 16,
                marginBottom: 16,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${paymentMethod === 'card' ? 'var(--blue-500, #0056F2)' : 'var(--grey-200, #C2C2C2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {paymentMethod === 'card' && (
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-500, #0056F2)' }} />
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: 16 }}>Debit/Credit Card</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#0f172a' }}>
                    VISA
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#0f172a' }}>
                    Mastercard
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: paymentMethod === 'card' ? 'block' : 'none',
                  marginTop: 20,
                  borderTop: '1px solid var(--grey-100, #EAEAEA)',
                  paddingTop: 16,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--grey-500)', marginBottom: 6 }}>Card Number</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{
                      width: '100%',
                      height: 44,
                      padding: '0 12px',
                      borderRadius: 8,
                      border: '1px solid var(--grey-100)',
                      fontSize: 14,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--grey-500)', marginBottom: 6 }}>Card Name</label>
                  <input
                    type="text"
                    placeholder="Nama Pemilik Kartu"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    style={{
                      width: '100%',
                      height: 44,
                      padding: '0 12px',
                      borderRadius: 8,
                      border: '1px solid var(--grey-100)',
                      fontSize: 14,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--grey-500)', marginBottom: 6 }}>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      style={{
                        width: '100%',
                        height: 44,
                        padding: '0 12px',
                        borderRadius: 8,
                        border: '1px solid var(--grey-100)',
                        fontSize: 14,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--grey-500)', marginBottom: 6 }}>CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      style={{
                        width: '100%',
                        height: 44,
                        padding: '0 12px',
                        borderRadius: 8,
                        border: '1px solid var(--grey-100)',
                        fontSize: 14,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    padding: '10px 18px',
                    borderRadius: 6,
                    background: 'var(--grey-100, #EAEAEA)',
                    border: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Simpan Kartu
                </button>
              </div>
            </div>

            {/* Option 2: BNI Virtual Account */}
            <div
              onClick={() => setPaymentMethod('bni')}
              style={{
                borderRadius: 'var(--radius-md, 12px)',
                border: `2px solid ${paymentMethod === 'bni' ? 'var(--blue-500, #0056F2)' : 'var(--grey-100, #EAEAEA)'}`,
                padding: 16,
                marginBottom: 16,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${paymentMethod === 'bni' ? 'var(--blue-500, #0056F2)' : 'var(--grey-200, #C2C2C2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {paymentMethod === 'bni' && (
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-500, #0056F2)' }} />
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: 16 }}>BNI Virtual Account</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#e0f2fe', color: '#0284c7' }}>
                  Instant
                </span>
              </div>

              <div
                style={{
                  display: paymentMethod === 'bni' ? 'block' : 'none',
                  marginTop: 20,
                  borderTop: '1px solid var(--grey-100, #EAEAEA)',
                  paddingTop: 16,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <p style={{ fontSize: 13, color: 'var(--grey-500)', marginBottom: 8, fontWeight: 500 }}>
                  Nomor Virtual Account BNI:
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface-tint, #f0f4ff)', borderRadius: 8, marginBottom: 12 }}>
                  <strong style={{ fontSize: 17, letterSpacing: 0.5, color: 'var(--blue-500, #0056F2)' }}>
                    8808 2399 1029 384
                  </strong>
                  <button
                    type="button"
                    onClick={() => handleCopy('880823991029384', 'bni')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 6,
                      background: 'var(--blue-500, #0056F2)',
                      color: 'white',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedVa === 'bni' ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: 'var(--grey-400)', lineHeight: '18px' }}>
                  Pembayaran diverifikasi secara otomatis dalam 1–2 menit setelah transfer dari ATM, Mobile Banking, atau Internet Banking BNI.
                </p>
              </div>
            </div>

            {/* Option 3: Mandiri Virtual Account */}
            <div
              onClick={() => setPaymentMethod('mandiri')}
              style={{
                borderRadius: 'var(--radius-md, 12px)',
                border: `2px solid ${paymentMethod === 'mandiri' ? 'var(--blue-500, #0056F2)' : 'var(--grey-100, #EAEAEA)'}`,
                padding: 16,
                marginBottom: 16,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${paymentMethod === 'mandiri' ? 'var(--blue-500, #0056F2)' : 'var(--grey-200, #C2C2C2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {paymentMethod === 'mandiri' && (
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-500, #0056F2)' }} />
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: 16 }}>Bank Mandiri Virtual Account</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#e0f2fe', color: '#0284c7' }}>
                  Instant
                </span>
              </div>

              <div
                style={{
                  display: paymentMethod === 'mandiri' ? 'block' : 'none',
                  marginTop: 20,
                  borderTop: '1px solid var(--grey-100, #EAEAEA)',
                  paddingTop: 16,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <p style={{ fontSize: 13, color: 'var(--grey-500)', marginBottom: 8, fontWeight: 500 }}>
                  Nomor Virtual Account Mandiri (Livin'):
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface-tint, #f0f4ff)', borderRadius: 8, marginBottom: 12 }}>
                  <strong style={{ fontSize: 17, letterSpacing: 0.5, color: 'var(--blue-500, #0056F2)' }}>
                    8950 8299 4402 119
                  </strong>
                  <button
                    type="button"
                    onClick={() => handleCopy('895082994402119', 'mandiri')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 6,
                      background: 'var(--blue-500, #0056F2)',
                      color: 'white',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedVa === 'mandiri' ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: 'var(--grey-400)', lineHeight: '18px' }}>
                  Gunakan menu Transfer &gt; Virtual Account di aplikasi Livin' by Mandiri atau ATM Mandiri.
                </p>
              </div>
            </div>

            {/* Option 4: BSI Virtual Account */}
            <div
              onClick={() => setPaymentMethod('bsi')}
              style={{
                borderRadius: 'var(--radius-md, 12px)',
                border: `2px solid ${paymentMethod === 'bsi' ? 'var(--blue-500, #0056F2)' : 'var(--grey-100, #EAEAEA)'}`,
                padding: 16,
                marginBottom: 16,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${paymentMethod === 'bsi' ? 'var(--blue-500, #0056F2)' : 'var(--grey-200, #C2C2C2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {paymentMethod === 'bsi' && (
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-500, #0056F2)' }} />
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: 16 }}>BSI Virtual Account</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#e8f7ee', color: '#10b981' }}>
                  Syariah
                </span>
              </div>

              <div
                style={{
                  display: paymentMethod === 'bsi' ? 'block' : 'none',
                  marginTop: 20,
                  borderTop: '1px solid var(--grey-100, #EAEAEA)',
                  paddingTop: 16,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <p style={{ fontSize: 13, color: 'var(--grey-500)', marginBottom: 8, fontWeight: 500 }}>
                  Nomor Virtual Account Bank Syariah Indonesia:
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface-tint, #f0f4ff)', borderRadius: 8, marginBottom: 12 }}>
                  <strong style={{ fontSize: 17, letterSpacing: 0.5, color: 'var(--blue-500, #0056F2)' }}>
                    7029 1190 2839 001
                  </strong>
                  <button
                    type="button"
                    onClick={() => handleCopy('702911902839001', 'bsi')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 6,
                      background: 'var(--blue-500, #0056F2)',
                      color: 'white',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedVa === 'bsi' ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: 'var(--grey-400)', lineHeight: '18px' }}>
                  Metode pembayaran resmi bagi santri, wali santri, dan sekolah asrama mitra Crygle Academy via BSI Mobile.
                </p>
              </div>
            </div>

            {/* Option 5: QRIS */}
            <div
              onClick={() => setPaymentMethod('qris')}
              style={{
                borderRadius: 'var(--radius-md, 12px)',
                border: `2px solid ${paymentMethod === 'qris' ? 'var(--blue-500, #0056F2)' : 'var(--grey-100, #EAEAEA)'}`,
                padding: 16,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${paymentMethod === 'qris' ? 'var(--blue-500, #0056F2)' : 'var(--grey-200, #C2C2C2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {paymentMethod === 'qris' && (
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-500, #0056F2)' }} />
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: 16 }}>QRIS</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#fff9e6', color: '#d97706' }}>
                  E-Wallet
                </span>
              </div>

              <div
                style={{
                  display: paymentMethod === 'qris' ? 'block' : 'none',
                  marginTop: 20,
                  borderTop: '1px solid var(--grey-100, #EAEAEA)',
                  paddingTop: 16,
                  textAlign: 'center',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: 12,
                    background: '#fff',
                    borderRadius: 12,
                    border: '1px solid var(--grey-100)',
                    marginBottom: 12,
                  }}
                >
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=CRYGLE-ACADEMY-UIUX-CLASS-457000"
                    alt="QRIS Crygle Academy"
                    style={{ width: 160, height: 160, display: 'block' }}
                  />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 4 }}>
                  Scan QRIS via GoPay, OVO, Dana, ShopeePay, BCA Mobile
                </p>
                <p style={{ fontSize: 12, color: 'var(--grey-400)' }}>
                  Berlaku selama 15 menit. Verifikasi instan otomatis tanpa konfirmasi manual.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Pricing */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Card 1: Pesanan Saya */}
          <div
            style={{
              background: 'var(--white, #ffffff)',
              borderRadius: 'var(--radius-lg, 16px)',
              border: '1px solid var(--grey-100, #EAEAEA)',
              padding: 20,
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--black)' }}>
              Pesanan Saya
            </h3>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&auto=format&fit=crop&q=80"
                alt="UI/UX Course Thumbnail"
                style={{ width: 80, height: 60, borderRadius: 8, objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue-500, #0056F2)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  KATEGORI KELAS
                </span>
                <h4 style={{ fontFamily: 'var(--font-core)', fontSize: 14, fontWeight: 700, color: 'var(--black)', margin: '4px 0' }}>
                  Advanced UI/UX Design Mastery for SMK Students
                </h4>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--grey-400)' }}>
                  <span>⏱️ 12 Weeks</span>
                  <span>🎓 Certification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Kode Promo */}
          <div
            style={{
              background: 'var(--white, #ffffff)',
              borderRadius: 'var(--radius-lg, 16px)',
              border: '1px solid var(--grey-100, #EAEAEA)',
              padding: 20,
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--black)' }}>
              Kode Promo
            </h3>
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Masukan Kode Promo (Coba: CRYGLE50)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                style={{
                  flex: 1,
                  height: 44,
                  padding: '0 12px',
                  borderRadius: 8,
                  border: '1px solid var(--grey-100)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0 18px',
                  height: 44,
                  borderRadius: 8,
                  background: 'var(--blue-500, #0056F2)',
                  color: 'white',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Pakai
              </button>
            </form>
            {promoFeedback && (
              <p
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  fontWeight: 500,
                  color: promoFeedback.success ? 'var(--color-success, #10b981)' : 'var(--danger-500, #ef4444)',
                }}
              >
                {promoFeedback.text}
              </p>
            )}
            {promoCode && !promoFeedback && (
              <p style={{ marginTop: 10, fontSize: 13, fontWeight: 500, color: 'var(--color-success, #10b981)' }}>
                Kode promo {promoCode} aktif! (-Rp50.000)
              </p>
            )}
          </div>

          {/* Card 3: Rincian Harga */}
          <div
            style={{
              background: 'var(--white, #ffffff)',
              borderRadius: 'var(--radius-lg, 16px)',
              border: '1px solid var(--grey-100, #EAEAEA)',
              padding: 20,
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--black)' }}>
              Rincian Harga
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--grey-500)' }}>
                <span>Invest Ilmu</span>
                <span style={{ fontWeight: 600, color: 'var(--black)' }}>{formatRupiah(pricing.base)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--grey-500)' }}>
                <span>Registration Fee</span>
                <span style={{ fontWeight: 600, color: 'var(--black)' }}>{formatRupiah(pricing.regFee)}</span>
              </div>
              {pricing.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-success, #10b981)' }}>
                  <span>Potongan Promo</span>
                  <span style={{ fontWeight: 600 }}>-{formatRupiah(pricing.discount)}</span>
                </div>
              )}
              <div
                style={{
                  borderTop: '1px dashed var(--grey-100)',
                  paddingTop: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--black)' }}>Total Invest</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-500, #0056F2)' }}>
                  {formatRupiah(pricing.total)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout/review"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 48,
                borderRadius: 'var(--radius-control, 10px)',
                background: 'var(--blue-500, #0056F2)',
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              Bayar Sekarang
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
