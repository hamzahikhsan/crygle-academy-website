import * as React from 'react';

/**
 * 24px checkbox with an optional 16px label. Unchecked = 1.5px Grey 200 outline;
 * checked = Blue 500 plate with the white tick path from the source component.
 */
export interface CheckboxProps extends React.HTMLAttributes<HTMLLabelElement> {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
