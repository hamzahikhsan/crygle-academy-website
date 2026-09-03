'use client';

import React from 'react';

const SIZES = {
  'extra-large': { height: 56, padX: 24, font: 18, icon: 24 },
  large: { height: 48, padX: 24, font: 16, icon: 20 },
  medium: { height: 40, padX: 16, font: 14, icon: 20 },
  small: { height: 32, padX: 16, font: 12, icon: 16 },
  'extra-small': { height: 24, padX: 12, font: 12, icon: 12 },
};

const STYLES = {
  primary: {
    rest: { background: 'var(--blue-500)', color: 'var(--white)' },
    hover: { background: 'var(--blue-300)' },
    active: { background: 'var(--blue-400)' },
    disabled: { background: 'var(--border-default)', color: 'var(--white)' },
  },
  secondary: {
    rest: { background: 'transparent', color: 'var(--blue-500)', boxShadow: 'inset 0 0 0 2px var(--blue-500)' },
    hover: { background: 'var(--surface-tint)' },
    active: { background: 'var(--surface-subtle-hover)' },
    disabled: { opacity: 0.5 },
  },
  flat: {
    rest: { background: 'transparent', color: 'var(--blue-500)' },
    hover: { background: 'var(--surface-tint)' },
    active: { background: 'var(--surface-subtle-hover)' },
    disabled: { opacity: 0.5 },
  },
  tertiary: {
    rest: { background: 'var(--surface-subtle)', color: 'var(--blue-500)' },
    hover: { background: 'var(--surface-subtle-hover)' },
    active: { background: 'var(--border-default)' },
    disabled: { opacity: 0.5, background: 'var(--border-default)' },
  },
  'primary-white': {
    rest: { background: 'var(--white)', color: 'var(--blue-500)' },
    hover: { background: 'rgba(255,255,255,0.88)' },
    active: { background: 'var(--surface-subtle-hover)' },
    disabled: { opacity: 0.5 },
  },
};

/** Buttons communicate actions that users can take. */
export function Button({
  children = 'Button',
  size = 'large',
  variant = 'primary',
  mode,
  leadingIcon,
  trailingIcon,
  pill = false,
  disabled = false,
  fullWidth = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.large;
  const v = STYLES[variant] || STYLES.primary;
  const state = mode || (disabled ? 'disabled' : press ? 'active' : hover ? 'hover' : 'rest');

  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: s.height,
    padding: `0 ${s.padX}px`,
    border: 0,
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-control)',
    fontFamily: 'var(--font-control)',
    fontWeight: 'var(--weight-medium)',
    fontSize: s.font,
    lineHeight: 1.4,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
    ...v.rest,
  };
  const applied = state === 'rest' ? {} : state === 'focus'
    ? { boxShadow: `${v.rest.boxShadow ? v.rest.boxShadow + ', ' : ''}inset 0 0 0 2px var(--focus-ring)` }
    : v[state] || {};

  const glyph = (node) => node ? React.createElement('span', {
    style: { display: 'inline-flex', width: s.icon, height: s.icon, flexShrink: 0 },
  }, node) : null;

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...applied, ...style }}
      {...rest}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {glyph(leadingIcon)}
        <span>{children}</span>
        {glyph(trailingIcon)}
      </span>
    </button>
  );
}
