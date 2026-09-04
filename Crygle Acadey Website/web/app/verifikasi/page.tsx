'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout.jsx';
import { Button } from '@/components/core/Button.jsx';

export default function VerifikasiPage() {
  const router = useRouter();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleDigitChange(index: number, value: string) {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const next = [...digits];
    next[index] = value;
    setDigits(next);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push('/login');
  }

  return (
    <AuthLayout>
      <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 28, marginBottom: 8, color: 'var(--black)' }}>
        Verifikasi Email Kamu
      </h1>
      <p style={{ fontFamily: 'var(--font-core)', color: 'var(--grey-500)', marginBottom: 28, fontSize: 14, lineHeight: '22px' }}>
        Masukkan 6 digit kode OTP yang sudah kami kirim ke email kamu.
      </p>

      <form onSubmit={handleSubmit} id="otp-verification-form">
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit OTP ke-${i + 1}`}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: 52,
                height: 56,
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 700,
                borderRadius: 'var(--radius-sm, 8px)',
                border: '1px solid var(--grey-100, #EAEAEA)',
                background: 'var(--white, #ffffff)',
                color: 'var(--black, #111111)',
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
            />
          ))}
        </div>

        <Button type="submit" fullWidth>
          Verifikasi
        </Button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--grey-500)' }}>
        Tidak menerima kode?{' '}
        <button
          type="button"
          style={{
            color: 'var(--blue-500)',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
        >
          Kirim ulang kode
        </button>
      </p>
    </AuthLayout>
  );
}
