import React from 'react';

/** The white answer panel of an FAQ accordion, on its own. */
export function AccordionsAnswer({ children, style, ...rest }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', gap: 10, padding: 16, alignItems: 'center', justifyContent: 'center',
      background: 'var(--white)', borderRadius: '0 0 var(--radius-md) var(--radius-md)', boxSizing: 'border-box', ...style,
    }} {...rest}>
      <span style={{ flexGrow: 1, fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 18, lineHeight: '24px', color: 'rgb(0,0,0)', whiteSpace: 'pre-line' }}>{children}</span>
    </div>
  );
}
