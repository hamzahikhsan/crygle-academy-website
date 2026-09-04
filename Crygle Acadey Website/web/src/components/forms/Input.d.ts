import * as React from 'react';

/**
 * Labelled text field as used on the Login, Signup and Checkout screens:
 * 12px/20 label, then a 56px box with a 10px radius, 16px inset padding and a 1px inset border.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: React.ReactNode;
  status?: 'default' | 'error';
  style?: React.CSSProperties;
}

export declare function Input(props: InputProps): JSX.Element;
