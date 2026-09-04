'use client';

import React from 'react';

/** Square 24px checkbox with an optional label to its right. */
export function Checkbox({ label, checked = false, onChange, disabled = false, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', flexDirection: 'row', gap: 10, alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }} {...rest}>
      <span style={{
        display: 'inline-flex', width: 24, height: 24, flexShrink: 0, alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-xs)',
        background: checked ? 'var(--blue-500)' : 'transparent',
        boxShadow: checked ? 'none' : 'inset 0 0 0 1.5px var(--grey-200)',
        transition: 'background 120ms ease',
      }}>
        {checked && (
          <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
            <path d="M 15.531 2.817 L 7.091 11.517 C 6.466 12.161 5.452 12.161 4.826 11.517 L 0.469 7.025 C -0.156 6.381 -0.156 5.336 0.469 4.691 C 1.094 4.047 2.108 4.047 2.733 4.691 L 5.959 8.016 L 13.267 0.483 C 13.892 -0.161 14.906 -0.161 15.531 0.483 C 16.156 1.128 16.156 2.173 15.531 2.817 Z" fill="var(--white)" fillRule="evenodd" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      {label && (
        <span style={{ fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 16, lineHeight: '26px', color: 'var(--black)', whiteSpace: 'nowrap' }}>{label}</span>
      )}
    </label>
  );
}
