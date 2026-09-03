import * as React from 'react';

/**
 * The CRYGLE Academy lockup — the open-book mark (yellow pages, nib emblem) next to the wordmark.
 * Both are real SVGs supplied by the brand; never redraw them.
 */
export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'blue' for light backgrounds (blue book, white nib), 'white' for brand-blue grounds. */
  tone?: 'blue' | 'white';
  /** Mark height in px; the wordmark scales with it. Design default 48. */
  size?: number;
  /** Set false for the mark on its own. */
  wordmark?: boolean;
  /** Prefix for the asset URLs, e.g. '../../' when the host page is nested. */
  assetBase?: string;
}

export declare function Logo(props: LogoProps): JSX.Element;
