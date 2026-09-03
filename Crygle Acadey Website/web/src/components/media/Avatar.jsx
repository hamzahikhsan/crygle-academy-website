import React from 'react';

/** Circular avatar; renders initials when no image is supplied. */
export function Avatar({ src, name = '', size = 44, ring, style, ...rest }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, flexShrink: 0, borderRadius: '50%',
      background: src ? `url(${src}) center / cover no-repeat` : 'var(--blue-100)',
      boxShadow: ring ? `inset 0 0 0 3px ${ring}` : undefined,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-core)', fontWeight: 600, fontSize: size * 0.36, color: 'var(--blue-500)',
      ...style,
    }} {...rest}>{!src && initials}</div>
  );
}

/** Overlapping row of avatars, as on the hero social-proof plate. */
export function AvatarStack({ people = [], size = 44, overlap = 12, ring = 'var(--white)', style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ...style }} {...rest}>
      {people.map((p, i) => (
        <Avatar key={i} src={p.src} name={p.name} size={size} ring={ring} style={{ marginLeft: i === 0 ? 0 : -overlap }} />
      ))}
    </div>
  );
}
