'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../core/Logo.jsx';

const CHEV = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.334" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ROUTE_MAP = {
  'Beranda': '/',
  'Video Kelas': '/kelas',
  'Bootcamp Intensif': '/bootcamp',
  'Mentor': '/mentor',
  'Tentang': '/tentang',
};

/** Marketing header: logo, hairline nav capsule, Masuk / Daftar pair. */
export function NavBar({
  items = [
    { label: 'Beranda' },
    { label: 'Video Kelas', dropdown: true },
    { label: 'Bootcamp Intensif', dropdown: true },
    { label: 'Mentor' },
    { label: 'Tentang' },
  ],
  active = 'Beranda',
  onNavigate,
  onLogin,
  onSignup,
  assetBase = '/',
  style,
  ...rest
}) {
  return (
    <header style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '22px var(--gutter)', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', ...style }} {...rest}>
      <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'flex-end' }} aria-label="Beranda Crygle Academy">
        <Logo tone="blue" size={48.046} assetBase={assetBase} />
      </Link>
      <nav style={{ display: 'flex', flexDirection: 'row', padding: '10px 15px', justifyContent: 'center', alignItems: 'center', borderRadius: 'var(--radius-nav)', boxShadow: 'var(--hairline-nav)', boxSizing: 'border-box' }}>
        {items.map((it) => {
          const on = it.label === active;
          const href = ROUTE_MAP[it.label] || '/';
          return (
            <Link
              key={it.label}
              href={href}
              onClick={(e) => {
                if (onNavigate) {
                  onNavigate(it.label);
                }
              }}
              style={{
                display: 'flex', flexDirection: 'row', gap: it.dropdown ? 6 : 7.568270206451416,
                padding: '8px 18px', justifyContent: 'center', alignItems: 'center',
                border: 0, background: 'transparent', borderRadius: 'var(--radius-nav)', cursor: 'pointer',
                fontFamily: 'var(--font-core)',
                fontWeight: on ? 700 : 400,
                fontSize: 16,
                lineHeight: on ? '100%' : '26px',
                letterSpacing: on ? 'var(--tracking-tight)' : undefined,
                color: on ? 'var(--blue-500)' : 'var(--grey-300)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {it.label}
              {it.dropdown && CHEV}
            </Link>
          );
        })}
      </nav>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
        <Link
          href="/login"
          onClick={(e) => {
            if (onLogin) {
              e.preventDefault();
              onLogin();
            }
          }}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 59, padding: '20px 34px', border: 0, borderRadius: 'var(--radius-pill)',
            background: 'transparent', boxShadow: 'var(--shadow-cta)', cursor: 'pointer',
            fontFamily: 'var(--font-core)', fontWeight: 500, fontSize: 16, lineHeight: '100%',
            color: 'var(--blue-500)', textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Masuk
        </Link>
        <Link
          href="/signup"
          onClick={(e) => {
            if (onSignup) {
              e.preventDefault();
              onSignup();
            }
          }}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 59, padding: '20px 34px', border: 0, borderRadius: 'var(--radius-pill)',
            background: 'var(--blue-500)', boxShadow: 'var(--shadow-cta-brand)', cursor: 'pointer',
            fontFamily: 'var(--font-core)', fontWeight: 500, fontSize: 16, lineHeight: '100%',
            color: 'var(--background-1)', textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Daftar
        </Link>
      </div>
    </header>
  );
}
