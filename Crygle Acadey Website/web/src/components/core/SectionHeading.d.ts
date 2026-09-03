import * as React from 'react';

/**
 * Section title block used to open every band of the marketing page:
 * a 42px/100% bold Blue 500 heading with -0.01em tracking over an 18px/30 supporting line.
 */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  supporting?: React.ReactNode;
  align?: 'center' | 'left';
  /** 'on-blue' flips the pair to white for the Blue Deep band. */
  tone?: 'brand' | 'on-blue';
  /** Fixed measure — the source constrains these blocks to 502–650px. */
  width?: number | string;
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
