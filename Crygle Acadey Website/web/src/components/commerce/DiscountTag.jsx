import React from 'react';

/** Discount pill: rose-tinted plate with the percentage saved. */
export function DiscountTag({ children = '100% off', style, ...rest }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      height: 32, padding: '4px 8px', borderRadius: 'var(--radius-xs)',
      background: 'var(--discount-bg)', color: 'var(--discount-fg)',
      fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 10, lineHeight: '24px',
      whiteSpace: 'nowrap', ...style,
    }} {...rest}>{children}</span>
  );
}
