import React from 'react';
import Link from 'next/link';

export function AuthLayout({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="auth-layout-root">
      <aside
        aria-label="Crygle Academy Showcase"
        style={{
          background: 'var(--surface-tint, #f0f4ff)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 48,
        }}
      >
        <div style={{ maxWidth: 520, width: '100%' }}>
          <img
            src="/illustrations/design-1-login-page.svg"
            alt="Crygle Academy Digital Learning Illustration"
            style={{ width: '100%', height: 'auto', marginBottom: 32 }}
          />
          <img
            src="/illustrations/design-bawah-login.svg"
            alt="Pilar Pembelajaran: Robotic, Coding, dan UI/UX Design"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </aside>
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ maxWidth: 440, width: '100%' }}>
          <Link href="/" aria-label="Kembali ke Beranda Crygle Academy" style={{ display: 'inline-block', marginBottom: 32 }}>
            <img src="/logo/crygle-lockup-blue.png" alt="Crygle Academy" style={{ height: 40, width: 'auto' }} />
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
