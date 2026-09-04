'use client';

import { useEffect, useState } from 'react';

export type PaymentMethod = 'card' | 'bni' | 'mandiri' | 'bsi' | 'qris';
export type PaymentScenario = 'success' | 'failed';

interface StoredState {
  paymentMethod: PaymentMethod;
  promoCode: string | null;
  discount: number;
  scenario: PaymentScenario;
}

const STORAGE_KEY = 'crygle-checkout';
const BASE_PRICE = 499000;
const REG_FEE = 8000;
const VALID_PROMOS: Record<string, number> = { CRYGLE50: 50000 };

function readStored(): StoredState {
  if (typeof window === 'undefined') {
    return { paymentMethod: 'card', promoCode: null, discount: 0, scenario: 'success' };
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        paymentMethod: parsed.paymentMethod || 'card',
        promoCode: parsed.promoCode ?? null,
        discount: typeof parsed.discount === 'number' ? parsed.discount : 0,
        scenario: parsed.scenario || 'success',
      };
    }
  } catch {
    // corrupted storage - fall back to default
  }
  return { paymentMethod: 'card', promoCode: null, discount: 0, scenario: 'success' };
}

export function useCheckoutState() {
  const [state, setState] = useState<StoredState>(readStored);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable
    }
  }, [state]);

  function setPaymentMethod(method: PaymentMethod) {
    setState((prev) => ({ ...prev, paymentMethod: method }));
  }

  function applyPromo(code: string) {
    const discount = VALID_PROMOS[code.toUpperCase()] ?? 0;
    setState((prev) => ({
      ...prev,
      promoCode: discount > 0 ? code.toUpperCase() : null,
      discount,
    }));
    return discount > 0;
  }

  function setScenario(scenario: PaymentScenario) {
    setState((prev) => ({ ...prev, scenario }));
  }

  const total = BASE_PRICE + REG_FEE - state.discount;

  return {
    paymentMethod: state.paymentMethod,
    setPaymentMethod,
    promoCode: state.promoCode,
    applyPromo,
    scenario: state.scenario,
    setScenario,
    pricing: {
      base: BASE_PRICE,
      regFee: REG_FEE,
      discount: state.discount,
      total,
    },
  };
}
