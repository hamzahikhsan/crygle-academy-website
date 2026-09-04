'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout.jsx';
import { Input } from '@/components/forms/Input.jsx';
import { Button } from '@/components/core/Button.jsx';

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout>
      <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 28, marginBottom: 8, color: 'var(--black)' }}>
        Lupa Password
      </h1>
      <p style={{ fontFamily: 'var(--font-core)', color: 'var(--grey-500)', marginBottom: 24, fontSize: 14, lineHeight: '22px' }}>
        Masukkan alamat email akun kamu — kami akan kirimkan link untuk membuat password baru.
      </p>

      {sent ? (
        <p role="status" style={{ fontFamily: 'var(--font-core)', color: 'var(--blue-500)', fontWeight: 600, marginBottom: 24 }}>
          Link reset password sudah dikirim ke {email}. Cek folder inbox atau spam kamu.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          id="forgot-password-form"
        >
          <div style={{ marginBottom: 24 }}>
            <Input
              label="Alamat Email"
              id="forgot-email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <Button type="submit" fullWidth>
            Kirim Link Reset
          </Button>
        </form>
      )}

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14 }}>
        <Link href="/login" style={{ color: 'var(--blue-500)', fontWeight: 700, textDecoration: 'none' }}>
          ← Kembali ke halaman Masuk
        </Link>
      </p>
    </AuthLayout>
  );
}
