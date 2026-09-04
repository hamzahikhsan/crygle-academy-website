'use client';

import React from 'react';

/** Labelled text field: 12px label above a 56px box with a 10px radius and a 1px inset border. */
export function Input({ label, value, placeholder, type = 'text', status = 'default', onChange, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const stroke = status === 'error' ? 'var(--danger-500)' : focus ? 'var(--blue-500)' : 'var(--grey-100)';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start', width: '100%', ...style }}>
      {label && (
        <span style={{ fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 12, lineHeight: '20px', color: 'var(--black)' }}>{label}</span>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', height: 56, padding: '0 16px', boxSizing: 'border-box',
          border: 0, borderRadius: 10, background: 'var(--white)',
          boxShadow: `inset 0 0 0 1px ${stroke}`,
          fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 16, lineHeight: '26px',
          color: 'var(--black)', outline: 'none',
        }}
        {...rest}
      />
    </label>
  );
}
