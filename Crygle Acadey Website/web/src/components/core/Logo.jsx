import React from 'react';

const MARKS = {
  blue: { mark: 'assets/logo/book-mark-blue.svg', word: 'assets/logo/crygle-wordmark-blue.svg' },
  white: { mark: 'assets/logo/book-mark-white.svg', word: 'assets/logo/crygle-wordmark-white.svg' },
};

/** The CRYGLE Academy lockup: open-book mark plus wordmark. */
export function Logo({ tone = 'blue', size = 48, wordmark = true, assetBase = '', style, ...rest }) {
  const m = MARKS[tone] || MARKS.blue;
  const k = size / 48.046;
  const p = (u) => `${assetBase}${u}`;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'flex-end', gap: 15.255817413330078 * k, ...style }} {...rest}>
      <img src={p(m.mark)} alt="" style={{ width: size, height: size, flexShrink: 0 }} />
      {wordmark && (
        <img src={p(m.word)} alt="CRYGLE Academy" style={{ width: 99.189 * k, height: 44.228 * k, flexShrink: 0 }} />
      )}
    </div>
  );
}
