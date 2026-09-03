import * as React from 'react';

export interface FooterColumn { title: string; links: string[] }

/**
 * Brand-blue site footer: white lockup and contact block on the left, three uppercase
 * link columns on the right, a Blue 100 rule, then the centred copyright line.
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  tagline?: string;
  email?: string;
  address?: string;
  columns?: FooterColumn[];
  copyright?: string;
  assetBase?: string;
}

export declare function Footer(props: FooterProps): JSX.Element;
