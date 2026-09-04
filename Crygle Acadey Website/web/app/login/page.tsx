'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout.jsx';
import { Input } from '@/components/forms/Input.jsx';
import { Checkbox } from '@/components/forms/Checkbox.jsx';
import { Button } from '@/components/core/Button.jsx';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <AuthLayout>
      <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 28, marginBottom: 8, color: 'var(--black)' }}>
        Halo, Selamat Datang 👋
      </h1>
      <p style={{ fontFamily: 'var(--font-core)', color: 'var(--grey-500)', marginBottom: 28, fontSize: 14 }}>
        Silahkan Login dan Masukin Akun Kamu
      </p>

      <form onSubmit={handleSubmit} id="login-form">
        <div style={{ marginBottom: 16 }}>
          <Input
            label="Alamat Email"
            id="login-email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div style={{ position: 'relative', width: '100%', marginBottom: 16 }}>
          <Input
            label="Password"
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            aria-label="Lihat Password"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: 'absolute',
              right: 16,
              top: 36,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              color: 'var(--grey-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Checkbox label="Ingatkan Saya" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          <Link href="/lupa-password" style={{ fontSize: 14, color: 'var(--blue-500)', fontWeight: 600, textDecoration: 'none' }}>
            Lupa Password?
          </Link>
        </div>

        <Button type="submit" fullWidth>
          Masuk
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--grey-100)' }} />
          <span style={{ fontSize: 13, color: 'var(--grey-400)', whiteSpace: 'nowrap' }}>Atau login dengan</span>
          <span style={{ flex: 1, height: 1, background: 'var(--grey-100)' }} />
        </div>

        <button
          type="button"
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--grey-100)',
            background: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontFamily: 'var(--font-core)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--black)',
            cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.43 7.37 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.57 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
          <span>Lanjutkan dengan Google</span>
        </button>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--grey-500)' }}>
          Apakah kamu belum memiliki akun? Silahkan{' '}
          <Link href="/signup" style={{ color: 'var(--blue-500)', fontWeight: 700, textDecoration: 'none' }}>
            Buat Akun
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
