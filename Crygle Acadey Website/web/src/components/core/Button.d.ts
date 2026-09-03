import * as React from 'react';

export type ButtonSize = 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small';
export type ButtonVariant = 'primary' | 'secondary' | 'flat' | 'tertiary' | 'primary-white';
export type ButtonMode = 'rest' | 'hover' | 'active' | 'focus' | 'disabled';

/**
 * Buttons communicate actions that users can take. Five sizes × five styles,
 * transcribed from the Buttons board of the CRYGLE Figma design system.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** 56 / 48 / 40 / 32 / 24 px tall. Default 'large'. */
  size?: ButtonSize;
  variant?: ButtonVariant;
  /** Force a visual state instead of deriving it from pointer events (for specimens). */
  mode?: ButtonMode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Fully-round radius, as used by the marketing-page CTAs. */
  pill?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export declare function Button(props: ButtonProps): JSX.Element;
