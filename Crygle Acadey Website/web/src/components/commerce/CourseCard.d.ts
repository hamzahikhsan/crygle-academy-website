import * as React from 'react';

/**
 * Course tile from the "Kelas Populer" grid — 384 × 449.8px. A 316px image plate with the
 * 172px white card body overlapping its lower edge; the whole tile carries the soft double shadow.
 */
export interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL of the course thumbnail. */
  image: string;
  title: React.ReactNode;
  /** e.g. "Basic Level Class |" — the trailing pipe is part of the source copy. */
  level?: string;
  rating?: number | string;
  reviews?: string;
  price?: string;
  /** Discount pill copy, e.g. "80% off". Pass null to hide. */
  discount?: string | null;
  /** Struck-through list price. Pass null to hide. */
  originalPrice?: string | null;
}

export declare function CourseCard(props: CourseCardProps): JSX.Element;
