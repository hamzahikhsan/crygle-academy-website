import React from 'react';
import { Logo } from '../core/Logo.jsx';

const COLS = [
  { title: 'NAVIGASI', links: ['Beranda', 'E-Learning', 'Courses & Classes', 'Mentor', 'Testimoni'] },
  { title: 'PROGRAM', links: ['Creative Design', 'Creative Coding', 'Creative Robotics', 'Consulting'] },
  { title: 'DUKUNGAN', links: ['Bantuan', 'Kontak Kami', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'FAQ'] },
];

function Pin({ d }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={d} stroke="var(--yellow-500)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Brand-blue site footer: lockup + contact block, three link columns, rule, copyright. */
export function Footer({
  tagline = 'Belajar kreatif digital dari nol untuk masa depan yang lebih siap.',
  email = 'tanya@crygleacademy.com',
  address = 'Jl. Cipta Karya, Sidomulyo Bar., Kec. Tampan, Kota Pekanbaru, Riau 28293',
  columns = COLS,
  copyright = '© 2026 CRYGLE Academy. All rights reserved.',
  assetBase = '',
  style,
  ...rest
}) {
  return (
    <footer style={{ width: '100%', background: 'var(--blue-500)', display: 'flex', flexDirection: 'column', gap: 30, padding: '72px var(--gutter) 30px', alignItems: 'flex-start', boxSizing: 'border-box', ...style }} {...rest}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 161, alignItems: 'flex-start', alignSelf: 'stretch' }}>
        <div style={{ width: 358, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start', flexShrink: 0 }}>
          <Logo tone="white" size={48.046} assetBase={assetBase} />
          <span style={{ width: 353, fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 18, lineHeight: 1.4, color: 'var(--blue-100)' }}>{tagline}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Pin d="M4 5.75h16a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Zm-2 2.5L12 14l10-5.75" />
              <span style={{ fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 16, lineHeight: '26px', color: 'var(--background-1)', whiteSpace: 'nowrap' }}>{email}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-start', alignSelf: 'stretch' }}>
              <Pin d="M12 2c-4.97 0-9 3.79-9 8.47C3 16.4 12 22 12 22s9-5.6 9-11.53C21 5.79 16.97 2 12 2Zm0 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              <span style={{ width: 322, fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 16, lineHeight: '26px', color: 'var(--background-1)' }}>{address}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 130, justifyContent: 'center', alignItems: 'flex-start', flexShrink: 0 }}>
          {columns.map((c) => (
            <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: 20, lineHeight: 1.4, color: 'var(--background-1)', whiteSpace: 'nowrap' }}>{c.title}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                {c.links.map((l) => (
                  <a key={l} href="#" style={{ fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 16, lineHeight: '26px', color: 'var(--blue-100)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center', alignSelf: 'stretch' }}>
        <div style={{ height: 1, background: 'var(--rule-on-blue)', alignSelf: 'stretch' }} />
        <span style={{ alignSelf: 'stretch', fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 16, textAlign: 'center', lineHeight: '26px', color: 'var(--blue-100)' }}>{copyright}</span>
      </div>
    </footer>
  );
}
