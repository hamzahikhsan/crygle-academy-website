'use client';

import React from 'react';
import { Rating } from './Rating.jsx';
import { DiscountTag } from './DiscountTag.jsx';

/** Course tile from the "Kelas Populer" grid: 384px wide, image plate with a card body overlapping it. */
export function CourseCard({
  image,
  title,
  level = 'Basic Level Class |',
  rating = 4.3,
  reviews = '(1.6K Reviews)',
  price = 'Rp. 0',
  discount = '100% off',
  originalPrice = 'Rp. 159.000',
  onClick,
  style,
  ...rest
}) {
  return (
    <div onClick={onClick} style={{ position: 'relative', width: 384, height: 449.801, overflow: 'hidden', boxShadow: 'var(--shadow-card)', cursor: onClick ? 'pointer' : 'default', ...style }} {...rest}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 384, height: 316, borderRadius: 'var(--radius-xl)', background: `url(${image}) center / cover no-repeat`, backgroundColor: 'var(--blue-100)' }} />
      <div style={{ position: 'absolute', left: 0, top: 277.801, width: 384, height: 172, borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', gap: 22, padding: 16, alignItems: 'flex-start', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', alignSelf: 'stretch' }}>
          <span style={{ alignSelf: 'stretch', fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 18, lineHeight: '24px', color: 'var(--black)' }}>{title}</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-core)', fontWeight: 400, fontSize: 15, lineHeight: '24px', color: 'var(--grey-400)', whiteSpace: 'nowrap' }}>{level}</span>
            <Rating value={rating} reviews={reviews} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 20, lineHeight: '24px', color: 'var(--black)', whiteSpace: 'nowrap' }}>{price}</span>
          {(discount || originalPrice) && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              {discount && <DiscountTag>{discount}</DiscountTag>}
              {originalPrice && (
                <span style={{ fontFamily: 'var(--font-core)', fontWeight: 500, fontSize: 12, lineHeight: '24px', color: 'var(--grey-300)', textDecoration: 'line-through', whiteSpace: 'nowrap' }}>{originalPrice}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
