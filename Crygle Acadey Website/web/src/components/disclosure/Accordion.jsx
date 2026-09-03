'use client';

import React from 'react';

/** FAQ disclosure row: brand-blue header, white answer panel. */
export function Accordion({ question, answer, open = false, onToggle, style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ...style }} {...rest}>
      <div
        onClick={onToggle}
        style={{
          display: 'flex', flexDirection: 'row', gap: 24, padding: 16, alignItems: 'center',
          alignSelf: 'stretch', background: 'var(--blue-500)', cursor: onToggle ? 'pointer' : 'default',
          borderRadius: open ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ flexGrow: 1, fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 20, lineHeight: '28px', color: 'var(--white)' }}>{question}</span>
        <span style={{ display: 'flex', width: 24, height: 24, flexShrink: 0, alignItems: 'center', justifyContent: 'center', transform: open ? 'none' : 'rotate(180deg)', transition: 'transform 160ms ease' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 15L12 9L18 15" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {open && (
        <div style={{
          display: 'flex', flexDirection: 'row', gap: 10, padding: 16, alignItems: 'center',
          alignSelf: 'stretch', background: 'var(--white)', borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          boxSizing: 'border-box',
        }}>
          <span style={{ flexGrow: 1, fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 18, lineHeight: '24px', color: 'rgb(0,0,0)', whiteSpace: 'pre-line' }}>{answer}</span>
        </div>
      )}
    </div>
  );
}
