import * as React from 'react';

export interface NavItem { label: string; dropdown?: boolean }

/**
 * Marketing site header — logo left, a hairline pill capsule of nav links centre,
 * Masuk / Daftar pair right. 103.789px tall with 120px page gutters.
 */
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  /** Label of the current page — renders bold Blue 500 instead of Grey 300 regular. */
  active?: string;
  onNavigate?: (label: string) => void;
  onLogin?: () => void;
  onSignup?: () => void;
  assetBase?: string;
}

export declare function NavBar(props: NavBarProps): JSX.Element;
