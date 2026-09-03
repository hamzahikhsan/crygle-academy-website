import React from 'react';

const STAR = 'M8.132 0.88 L10.02 4.706 L14.24 5.32 L11.186 8.294 L11.906 12.5 L8.132 10.508 L4.358 12.5 L5.078 8.294 L2.024 5.32 L6.244 4.706 Z';

function Star({ size = 16, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={STAR} fill={filled ? 'var(--yellow-500)' : 'var(--grey-200)'} />
    </svg>
  );
}

/** Star + score + review count, as used on course cards and the hero social-proof plate. */
export function Rating({ value = 4.3, reviews, stars = 1, size = 16, style, ...rest }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'row', gap: 4, alignItems: 'center', ...style }} {...rest}>
      <span style={{ display: 'inline-flex', gap: 2.6728439331054688, alignItems: 'center' }}>
        {Array.from({ length: stars }).map((_, i) => <Star key={i} size={size} filled={i < Math.round(Number(value))} />)}
      </span>
      <span style={{ fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: 'var(--black)', whiteSpace: 'nowrap' }}>{value}</span>
      {reviews && (
        <span style={{ fontFamily: 'var(--font-core)', fontWeight: 500, fontSize: 15, lineHeight: '26px', color: 'var(--grey-400)', whiteSpace: 'nowrap' }}>{reviews}</span>
      )}
    </div>
  );
}
