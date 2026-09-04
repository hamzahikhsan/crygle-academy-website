import React from 'react';

export function CheckoutStepper({ active = 'pembayaran' }) {
  const isPembayaranActive = active === 'pembayaran';
  const isReviewActive = active === 'review';

  return (
    <div
      aria-label="Proses Checkout"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 480,
        margin: '0 auto 40px auto',
        padding: '0 16px',
      }}
    >
      {/* Step 1: Login (Done) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--blue-500, #0056F2)',
            color: 'var(--white, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-500, #0056F2)' }}>Login</span>
      </div>

      <div
        style={{
          flex: 1,
          height: 2,
          background: 'var(--blue-500, #0056F2)',
          margin: '0 8px 24px 8px',
        }}
      />

      {/* Step 2: Pembayaran */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: isReviewActive
              ? 'var(--blue-500, #0056F2)'
              : 'var(--blue-500, #0056F2)',
            color: 'var(--white, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isPembayaranActive ? '0 0 0 4px rgba(0, 86, 242, 0.2)' : 'none',
          }}
        >
          {isReviewActive ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
          )}
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: isPembayaranActive || isReviewActive ? 'var(--blue-500, #0056F2)' : 'var(--grey-400, #A6A6A6)',
          }}
        >
          Pembayaran
        </span>
      </div>

      <div
        style={{
          flex: 1,
          height: 2,
          background: isReviewActive ? 'var(--blue-500, #0056F2)' : 'var(--grey-100, #EAEAEA)',
          margin: '0 8px 24px 8px',
        }}
      />

      {/* Step 3: Review */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: isReviewActive ? 'var(--blue-500, #0056F2)' : 'var(--grey-100, #EAEAEA)',
            color: isReviewActive ? 'var(--white, #ffffff)' : 'var(--grey-400, #A6A6A6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isReviewActive ? '0 0 0 4px rgba(0, 86, 242, 0.2)' : 'none',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: isReviewActive ? 'var(--blue-500, #0056F2)' : 'var(--grey-400, #A6A6A6)',
          }}
        >
          Review
        </span>
      </div>
    </div>
  );
}
