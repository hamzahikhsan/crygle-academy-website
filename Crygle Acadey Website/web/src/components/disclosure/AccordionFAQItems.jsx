'use client';

import React from 'react';

/** The question bar of an FAQ accordion, on its own. */
export function AccordionFAQItems({ question, expanded = false, onToggle, style, ...rest }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex', flexDirection: 'row', gap: 24, padding: 16, alignItems: 'center',
        background: 'var(--blue-500)', boxSizing: 'border-box',
        borderRadius: expanded ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
        cursor: onToggle ? 'pointer' : 'default', ...style,
      }}
      {...rest}
    >
      <span style={{ flexGrow: 1, fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 20, lineHeight: '28px', color: 'var(--white)' }}>{question}</span>
      <span style={{ display: 'flex', width: 24, height: 24, flexShrink: 0, alignItems: 'center', justifyContent: 'center', transform: expanded ? 'none' : 'rotate(180deg)', transition: 'transform 160ms ease' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 15L12 9L18 15" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
