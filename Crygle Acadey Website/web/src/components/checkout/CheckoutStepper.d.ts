import * as React from 'react';

export interface CheckoutStepperProps {
  active?: 'pembayaran' | 'review';
}

export declare function CheckoutStepper(props: CheckoutStepperProps): JSX.Element;
