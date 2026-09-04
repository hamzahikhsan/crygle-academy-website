import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCheckoutState } from './useCheckoutState';

describe('useCheckoutState', () => {
  beforeEach(() => sessionStorage.clear());

  it('defaults to base Rp499.000 + Rp8.000 fee = Rp507.000 total', () => {
    const { result } = renderHook(() => useCheckoutState());
    expect(result.current.pricing.total).toBe(507000);
  });

  it('applies the CRYGLE50 promo code for a Rp50.000 discount', () => {
    const { result } = renderHook(() => useCheckoutState());
    act(() => result.current.applyPromo('CRYGLE50'));
    expect(result.current.pricing.discount).toBe(50000);
    expect(result.current.pricing.total).toBe(457000);
  });

  it('rejects an invalid promo code without changing the total', () => {
    const { result } = renderHook(() => useCheckoutState());
    act(() => result.current.applyPromo('INVALID'));
    expect(result.current.pricing.discount).toBe(0);
    expect(result.current.pricing.total).toBe(507000);
  });

  it('persists the selected payment method to sessionStorage', () => {
    const { result } = renderHook(() => useCheckoutState());
    act(() => result.current.setPaymentMethod('bni'));
    expect(JSON.parse(sessionStorage.getItem('crygle-checkout')!).paymentMethod).toBe('bni');
  });
});
