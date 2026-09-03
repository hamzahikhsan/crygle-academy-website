import React from 'react';

/** Centred section heading: Blue 500 42px title over a Grey/ink supporting line. */
export function SectionHeading({ title, supporting, align = 'center', tone = 'brand', width, style, ...rest }) {
  const onBlue = tone === 'on-blue';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 20, width,
      alignItems: align === 'center' ? 'center' : 'flex-start', ...style,
    }} {...rest}>
      <span style={{
        fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 42, lineHeight: '100%',
        letterSpacing: 'var(--tracking-display)', color: onBlue ? 'var(--white)' : 'var(--blue-500)',
        textAlign: align,
      }}>{title}</span>
      {supporting && (
        <span style={{
          fontFamily: 'var(--font-core)', fontWeight: onBlue ? 700 : 400, fontSize: 18, lineHeight: '30px',
          color: onBlue ? 'var(--white)' : 'var(--black)', textAlign: align, alignSelf: 'stretch',
        }}>{supporting}</span>
      )}
    </div>
  );
}
