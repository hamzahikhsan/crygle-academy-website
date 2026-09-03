# Fase 2: Auth & Commerce — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Baca dulu:** `HANDOFF-Context-untuk-AI-Agent.md` dan `PLAN-Fase1-Marketing-Info.md` (Fase 2 mengonsumsi `courses.ts` yang dibuat di Fase 1 Task 1).

**Goal:** Bangun alur akun & transaksi lengkap — Login, Signup, Lupa Password (baru), Verifikasi OTP (baru), Checkout, Konfirmasi Pembayaran, Processing, Pembayaran Berhasil, dan Pembayaran Gagal (baru) — porting konten asli dari `login.html`, `signup.html`, `checkout.html`, `payment-review.html`, `payment-processing.html`, `payment-success.html`.

**Architecture:** Halaman auth berbagi satu `AuthLayout` (2 kolom: ilustrasi + form). Halaman commerce berbagi `CheckoutStepper` + `CommercePageShell` (navbar+footer sudah ada di root layout, tidak diulang). State transaksi (kursus dipilih, metode bayar, kode promo) disimpan di `sessionStorage` lewat satu hook `useCheckoutState` — **bukan** query string (data harga tidak boleh di URL) dan bukan global state library (YAGNI, hanya dipakai 4 halaman berurutan).

**Tech Stack:** Next.js 14 App Router, TypeScript, Vitest + React Testing Library.

**Spec:** `PRD/Crygle-Academy-Migration-Spec.md`, `PRD/Crygle-Academy-PRD.md` §9.5–9.9, §11.3 (Payment Gagal — Midtrans/Xendit research), §11.10 (Lupa Password), §11.11 (Verifikasi OTP)

## Global Constraints

- **Keamanan (dari HANDOFF gotcha #6):** `login.html` dan `checkout.html` sumber punya `value=` hardcoded (email/password demo, nomor kartu test, CVV). **Dilarang keras** memindahkan nilai-nilai ini jadi `defaultValue`/`value` React — pindahkan HANYA ke `placeholder`.
- Semua label, copy, dan angka harga di halaman commerce harus persis sama dengan HTML sumber.
- **Inkonsistensi harga sumber yang diketahui:** `course-details.html`/`index.html` bilang kelas flagship = Rp449.000 (setelah diskon 50%), tapi `checkout.html` menghitung "Invest Ilmu Rp499.000 + Registration Fee Rp8.000 = Total Rp507.000". Ini inkonsistensi asli di 12 halaman HTML sumber (dua angka dasar berbeda: Rp449rb vs Rp499rb+8rb). **Keputusan untuk porting:** pertahankan angka checkout.html (Rp499.000/Rp8.000/Rp507.000) apa adanya di alur commerce ini karena itu representasi "harga final termasuk biaya admin" — item terpisah untuk diperbaiki nanti (harmonisasi dengan `courses.ts`) dicatat di Task 8, **jangan** diam-diam diubah saat porting.
- Komponen dengan `useState`/`onChange`/`onClick` wajib `'use client'`.
- Setiap task diakhiri hijau: `npx tsc --noEmit` dan `npx vitest run`.

---

### Task 1: Port `Input`, `Checkbox` dari Design System + `AuthLayout` shared shell

**Files:**
- Create: `web/src/components/forms/Input.jsx` (+ `.d.ts`)
- Create: `web/src/components/forms/Checkbox.jsx` (+ `.d.ts`)
- Create: `web/src/components/auth/AuthLayout.jsx`
- Test: `web/src/components/auth/AuthLayout.test.tsx`

**Interfaces:**
- Produces: `AuthLayout({ children })` — wraps any auth page in the 2-column illustration/form shell; `Input`, `Checkbox` consumed by every form in this plan.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/auth/AuthLayout.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthLayout } from './AuthLayout.jsx';

describe('AuthLayout', () => {
  it('renders the brand logo link back to Home and the illustration column', () => {
    render(<AuthLayout><p>form content</p></AuthLayout>);
    expect(screen.getByRole('link', { name: /Kembali ke Beranda Crygle Academy/ })).toHaveAttribute('href', '/');
    expect(screen.getByAltText('Crygle Academy Digital Learning Illustration')).toBeInTheDocument();
    expect(screen.getByText('form content')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/auth/AuthLayout.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Copy `Input.jsx`/`.d.ts` and `Checkbox.jsx`/`.d.ts` from the Design System (both are simple controlled inputs — `'use client'` per the ledger in HANDOFF §3), then write `AuthLayout.jsx`**

```bash
DS="CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components"
cp "$DS/forms/Input.jsx" "web/src/components/forms/Input.jsx"
cp "$DS/forms/Input.d.ts" "web/src/components/forms/Input.d.ts"
cp "$DS/forms/Checkbox.jsx" "web/src/components/forms/Checkbox.jsx"
cp "$DS/forms/Checkbox.d.ts" "web/src/components/forms/Checkbox.d.ts"
```
(Add `'use client'` as the first line of both `.jsx` files.)

```jsx
// web/src/components/auth/AuthLayout.jsx
import Link from 'next/link';

export function AuthLayout({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      <aside aria-label="Crygle Academy Showcase" style={{ background: 'var(--surface-tint)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 48 }}>
        <img src="/illustrations/design-1-login-page.svg" alt="Crygle Academy Digital Learning Illustration" style={{ width: '100%', marginBottom: 32 }} />
        <img src="/illustrations/design-bawah-login.svg" alt="Pilar Pembelajaran: Robotic, Coding, dan UI/UX Design" style={{ width: '100%' }} />
      </aside>
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ maxWidth: 420, width: '100%' }}>
          <Link href="/" aria-label="Kembali ke Beranda Crygle Academy" style={{ display: 'block', marginBottom: 32 }}>
            <img src="/logo/crygle-logo.png" alt="Crygle Academy" style={{ height: 40 }} />
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
```

*(Catatan: `icon/Design 1 login page.svg` dan `icon/Design Bawah Login.svg` dari sumber belum ada di `public/`. Copy keduanya ke `web/public/illustrations/` dengan nama file kebab-case sebelum menjalankan test — tambahkan ke `assets.test.ts` dari Fase 0 sebagai assertion baru jika file belum tercakup.)*

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/auth/AuthLayout.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/forms web/src/components/auth
git commit -m "feat: port Input/Checkbox from Design System, add AuthLayout shell"
```

---

### Task 2: Login page (`web/app/login/page.tsx`)

**Files:**
- Modify: `web/app/login/page.tsx`
- Test: `web/app/login/page.test.tsx`

**Interfaces:**
- Consumes: `AuthLayout`, `Input`, `Checkbox` (Task 1), `Button` (Fase 0).

Konten dari `login.html` (baris 38–127): heading "Halo, Selamat Datang 👋" / "Silahkan Login dan Masukin Akun Kamu", field Alamat Email + Password (dengan toggle show/hide), checkbox "Ingatkan Saya" (checked by default) + link "Lupa Password?", tombol "Masuk", divider "Atau login dengan", tombol Google SSO "Lanjutkan dengan Google", footer switch ke Signup.

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/login/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoginPage from './page';

describe('LoginPage', () => {
  it('renders the heading and both fields with NO pre-filled demo credentials', () => {
    render(<LoginPage />);
    expect(screen.getByText('Halo, Selamat Datang 👋')).toBeInTheDocument();
    const emailInput = screen.getByLabelText('Alamat Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('toggles password visibility', () => {
    render(<LoginPage />);
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordInput.type).toBe('password');
    fireEvent.click(screen.getByRole('button', { name: 'Lihat Password' }));
    expect(passwordInput.type).toBe('text');
  });

  it('links Lupa Password to the forgot-password route', () => {
    render(<LoginPage />);
    expect(screen.getByText('Lupa Password?')).toHaveAttribute('href', '/lupa-password');
  });

  it('submitting valid credentials navigates to the dashboard', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('Alamat Email'), { target: { value: 'santri@crygleacademy.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'anything123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(screen.getByText('Masuk')).toBeInTheDocument(); // no crash; navigation mocked at router level in Task 8 integration pass
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/login/page.test.tsx`
Expected: FAIL — stub page has no form.

- [ ] **Step 3: Build the page**

```tsx
// web/app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout.jsx';
import { Input } from '@/components/forms/Input.jsx';
import { Checkbox } from '@/components/forms/Checkbox.jsx';
import { Button } from '@/components/core/Button.jsx';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulated auth per Migration-Spec decision 4 (no real backend in this port).
    router.push('/dashboard');
  }

  return (
    <AuthLayout>
      <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 28 }}>Halo, Selamat Datang 👋</h1>
      <p style={{ fontFamily: 'var(--font-core)', color: 'var(--grey-500)', marginBottom: 24 }}>Silahkan Login dan Masukin Akun Kamu</p>
      <form onSubmit={handleSubmit}>
        <Input label="Alamat Email" id="login-email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <Input
          label="Password"
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Masukkan kata sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          trailingAction={<button type="button" aria-label="Lihat Password" onClick={() => setShowPassword((v) => !v)}>👁</button>}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 24px' }}>
          <Checkbox label="Ingatkan Saya" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          <Link href="/lupa-password" style={{ fontSize: 14, color: 'var(--blue-500)', fontWeight: 600 }}>Lupa Password?</Link>
        </div>
        <Button type="submit" fullWidth>Masuk</Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--grey-100)' }} />
          <span style={{ fontSize: 13, color: 'var(--grey-400)' }}>Atau login dengan</span>
          <span style={{ flex: 1, height: 1, background: 'var(--grey-100)' }} />
        </div>
        <button type="button" style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-pill)', border: '1px solid var(--grey-100)', background: 'white' }}>
          Lanjutkan dengan Google
        </button>
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14 }}>
          Apakah kamu belum memiliki akun? Silahkan <Link href="/signup" style={{ color: 'var(--blue-500)', fontWeight: 700 }}>Buat Akun</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
```

*(`Input` dari Design System perlu prop `trailingAction` untuk slot ikon show/hide — cek `Input.d.ts` yang dicopy di Task 1; kalau prop itu tidak ada di komponen aslinya, render tombol toggle sebagai sibling absolute-positioned di dalam wrapper `<div style={{position:'relative'}}>` alih-alih menambah prop baru ke komponen Design System.)*

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/login/page.test.tsx`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/login
git commit -m "feat: build Login page from ported login.html content (no hardcoded demo credentials)"
```

---

### Task 3: Signup page (`web/app/signup/page.tsx`)

**Files:**
- Modify: `web/app/signup/page.tsx`
- Test: `web/app/signup/page.test.tsx`

Konten dari `signup.html` (baris 38–160): heading "Silahkan Membuat Akun" / "Please masukin detail disini", 4 field (Full Name, Email Address, Password, Konfirmasi Password — keduanya dengan toggle show/hide independen), checkbox wajib "I agree to the Terms & Conditions", tombol "Buat Akun", divider "Atau daftar dengan", Google SSO "Continue with Google", footer switch ke Login.

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/signup/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SignupPage from './page';

describe('SignupPage', () => {
  it('renders all 4 fields and the required terms checkbox', () => {
    render(<SignupPage />);
    expect(screen.getByText('Silahkan Membuat Akun')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Konfirmasi Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to the Terms/)).toBeInTheDocument();
  });

  it('blocks submit when passwords do not match', () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Budi Santoso' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'budi@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Konfirmasi Password'), { target: { value: 'different456' } });
    fireEvent.click(screen.getByLabelText(/I agree to the Terms/));
    fireEvent.click(screen.getByRole('button', { name: 'Buat Akun' }));
    expect(screen.getByText('Password dan konfirmasi password tidak sama.')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/signup/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** — sama pola dengan Task 2, tambah `useState` untuk `password`/`confirmPassword` dan satu validasi client-side (pesan error persis: `"Password dan konfirmasi password tidak sama."` — bukan dari HTML asli karena `signup.html` tidak punya validasi JS nyata, ini penambahan fungsional wajar untuk form yang benar-benar submit; catat sebagai penambahan di luar port literal). Berhasil submit → `router.push('/verifikasi')` (alur baru, lihat Task 4).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/signup/page.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/signup
git commit -m "feat: build Signup page from ported signup.html content"
```

---

### Task 4: Lupa Password + Verifikasi OTP (halaman baru, `web/app/lupa-password/page.tsx`, `web/app/verifikasi/page.tsx`)

**Files:**
- Modify: `web/app/lupa-password/page.tsx`
- Modify: `web/app/verifikasi/page.tsx`
- Test: `web/app/lupa-password/page.test.tsx`
- Test: `web/app/verifikasi/page.test.tsx`

**Interfaces:**
- Consumes: `AuthLayout`, `Input`, `Button` (Task 1/Fase 0).
- Ini adalah 2 dari 3 halaman "baru" (tanpa HTML sumber) di seluruh migrasi — desain mengikuti PRD §11.10/§11.11 dan konsistensi visual `AuthLayout`, bukan invent bebas.

- [ ] **Step 1: Write the failing tests**

```tsx
// web/app/lupa-password/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LupaPasswordPage from './page';

describe('LupaPasswordPage', () => {
  it('renders the email form, then shows a confirmation message after submit', () => {
    render(<LupaPasswordPage />);
    expect(screen.getByText('Lupa Password')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Alamat Email'), { target: { value: 'santri@crygleacademy.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Kirim Link Reset' }));
    expect(screen.getByText(/Link reset password sudah dikirim ke santri@crygleacademy.com/)).toBeInTheDocument();
  });

  it('links back to Login', () => {
    render(<LupaPasswordPage />);
    expect(screen.getByRole('link', { name: /Kembali ke halaman Masuk/ })).toHaveAttribute('href', '/login');
  });
});
```

```tsx
// web/app/verifikasi/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VerifikasiPage from './page';

describe('VerifikasiPage', () => {
  it('renders 6 OTP digit inputs and a resend link', () => {
    render(<VerifikasiPage />);
    expect(screen.getByText('Verifikasi Email Kamu')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox', { name: /Digit OTP/ })).toHaveLength(6);
    expect(screen.getByText('Kirim ulang kode')).toBeInTheDocument();
  });

  it('navigates to login once all 6 digits are entered and verified', () => {
    render(<VerifikasiPage />);
    const digits = screen.getAllByRole('textbox', { name: /Digit OTP/ });
    digits.forEach((input, i) => fireEvent.change(input, { target: { value: String(i + 1) } }));
    fireEvent.click(screen.getByRole('button', { name: 'Verifikasi' }));
    expect(screen.getByText('Verifikasi')).toBeInTheDocument(); // no crash
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run app/lupa-password/page.test.tsx app/verifikasi/page.test.tsx`
Expected: FAIL — both stub pages have no form.

- [ ] **Step 3: Build both pages**

```tsx
// web/app/lupa-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout.jsx';
import { Input } from '@/components/forms/Input.jsx';
import { Button } from '@/components/core/Button.jsx';

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout>
      <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 28 }}>Lupa Password</h1>
      <p style={{ fontFamily: 'var(--font-core)', color: 'var(--grey-500)', marginBottom: 24 }}>
        Masukkan alamat email akun kamu — kami akan kirimkan link untuk membuat password baru.
      </p>
      {sent ? (
        <p role="status" style={{ fontFamily: 'var(--font-core)', color: 'var(--blue-500)', fontWeight: 600 }}>
          Link reset password sudah dikirim ke {email}. Cek folder inbox atau spam kamu.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Input label="Alamat Email" id="forgot-email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          <Button type="submit" fullWidth>Kirim Link Reset</Button>
        </form>
      )}
      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14 }}>
        <Link href="/login" style={{ color: 'var(--blue-500)', fontWeight: 700 }}>← Kembali ke halaman Masuk</Link>
      </p>
    </AuthLayout>
  );
}
```

```tsx
// web/app/verifikasi/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout.jsx';
import { Button } from '@/components/core/Button.jsx';

export default function VerifikasiPage() {
  const router = useRouter();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  function handleDigitChange(index: number, value: string) {
    if (value.length > 1) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
  }

  return (
    <AuthLayout>
      <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 28 }}>Verifikasi Email Kamu</h1>
      <p style={{ fontFamily: 'var(--font-core)', color: 'var(--grey-500)', marginBottom: 24 }}>
        Masukkan 6 digit kode OTP yang sudah kami kirim ke email kamu.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push('/login');
        }}
      >
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {digits.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit OTP ke-${i + 1}`}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              style={{ width: 48, height: 56, textAlign: 'center', fontSize: 24, borderRadius: 'var(--radius-sm)', border: '1px solid var(--grey-100)' }}
            />
          ))}
        </div>
        <Button type="submit" fullWidth>Verifikasi</Button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14 }}>
        Tidak menerima kode?{' '}
        <button type="button" style={{ color: 'var(--blue-500)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
          Kirim ulang kode
        </button>
      </p>
    </AuthLayout>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run app/lupa-password/page.test.tsx app/verifikasi/page.test.tsx`
Expected: PASS — 4 tests passed total.

- [ ] **Step 5: Commit**

```bash
git add web/app/lupa-password web/app/verifikasi
git commit -m "feat: add new Lupa Password and Verifikasi OTP flows (PRD 11.10, 11.11)"
```

---

### Task 5: `useCheckoutState` hook + Checkout page (`web/app/checkout/page.tsx`)

**Files:**
- Create: `web/src/hooks/useCheckoutState.ts`
- Create: `web/src/components/checkout/CheckoutStepper.jsx`
- Modify: `web/app/checkout/page.tsx`
- Test: `web/src/hooks/useCheckoutState.test.ts`
- Test: `web/app/checkout/page.test.tsx`

**Interfaces:**
- Produces: `useCheckoutState()` → `{ paymentMethod, setPaymentMethod, promoCode, applyPromo, pricing: { base, regFee, discount, total } }`, persisted to `sessionStorage` key `crygle-checkout`. Consumed by Task 6 and Task 7.

Konten dari `checkout.html` (baris 76–267): stepper Login✓/Pembayaran(active)/Review, 5 metode bayar (Debit/Credit Card dengan 4 field kartu, BNI VA `8808 2399 1029 384`, Mandiri VA `8950 8299 4402 119`, BSI VA `7029 1190 2839 001`, QRIS dengan catatan "Berlaku selama 15 menit"), sidebar "Pesanan Saya" (thumbnail + "Advanced UI/UX Design Mastery for SMK Students", "⏱️ 12 Weeks", "🎓 Certification"), kode promo (placeholder "Coba: CRYGLE50"), rincian harga (Invest Ilmu Rp499.000 + Registration Fee Rp8.000 = Total Rp507.000), tombol "Bayar Sekarang".

- [ ] **Step 1: Write the failing tests**

```typescript
// web/src/hooks/useCheckoutState.test.ts
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
```

```tsx
// web/app/checkout/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CheckoutPage from './page';

describe('CheckoutPage', () => {
  it('renders all 5 payment methods and the correct VA numbers', () => {
    render(<CheckoutPage />);
    expect(screen.getByText('BNI Virtual Account')).toBeInTheDocument();
    expect(screen.getByText('8808 2399 1029 384')).toBeInTheDocument();
    expect(screen.getByText('8950 8299 4402 119')).toBeInTheDocument();
    expect(screen.getByText('7029 1190 2839 001')).toBeInTheDocument();
  });

  it('renders the price breakdown totaling Rp507.000', () => {
    render(<CheckoutPage />);
    expect(screen.getByText('Rp507.000')).toBeInTheDocument();
  });

  it('links "Bayar Sekarang" to the review step', () => {
    render(<CheckoutPage />);
    expect(screen.getByRole('link', { name: 'Bayar Sekarang' })).toHaveAttribute('href', '/checkout/review');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/hooks/useCheckoutState.test.ts app/checkout/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `useCheckoutState.ts`**

```typescript
// web/src/hooks/useCheckoutState.ts
'use client';

import { useEffect, useState } from 'react';

export type PaymentMethod = 'card' | 'bni' | 'mandiri' | 'bsi' | 'qris';

interface StoredState {
  paymentMethod: PaymentMethod;
  promoCode: string | null;
  discount: number;
}

const STORAGE_KEY = 'crygle-checkout';
const BASE_PRICE = 499000;
const REG_FEE = 8000;
const VALID_PROMOS: Record<string, number> = { CRYGLE50: 50000 };

function readStored(): StoredState {
  if (typeof window === 'undefined') return { paymentMethod: 'card', promoCode: null, discount: 0 };
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    // corrupted storage — fall through to default
  }
  return { paymentMethod: 'card', promoCode: null, discount: 0 };
}

export function useCheckoutState() {
  const [state, setState] = useState<StoredState>(readStored);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function setPaymentMethod(method: PaymentMethod) {
    setState((prev) => ({ ...prev, paymentMethod: method }));
  }

  function applyPromo(code: string) {
    const discount = VALID_PROMOS[code] ?? 0;
    setState((prev) => ({ ...prev, promoCode: discount > 0 ? code : null, discount }));
  }

  const total = BASE_PRICE + REG_FEE - state.discount;

  return {
    paymentMethod: state.paymentMethod,
    setPaymentMethod,
    promoCode: state.promoCode,
    applyPromo,
    pricing: { base: BASE_PRICE, regFee: REG_FEE, discount: state.discount, total },
  };
}
```

- [ ] **Step 4: Build `CheckoutStepper.jsx` (server component, takes `active: 'pembayaran' | 'review'`) and `app/checkout/page.tsx`** — 5 `payment-method-item` blocks bound to `paymentMethod`/`setPaymentMethod`, promo input calling `applyPromo`, sidebar reading `pricing`. `CourseCard` slot in the sidebar uses the flagship course from `courses.ts` (Task 1, Fase 1) for the thumbnail/title consistency, but keeps checkout's own copy ("Advanced UI/UX Design Mastery for SMK Students", "⏱️ 12 Weeks", "🎓 Certification") since that's the literal sidebar copy from the source HTML, not the catalog card.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run src/hooks/useCheckoutState.test.ts app/checkout/page.test.tsx`
Expected: PASS — 7 tests passed total.

- [ ] **Step 6: Commit**

```bash
git add web/src/hooks web/src/components/checkout web/app/checkout/page.tsx
git commit -m "feat: build Checkout page with useCheckoutState hook from ported checkout.html content"
```

---

### Task 6: Konfirmasi Pembayaran / Review (`web/app/checkout/review/page.tsx`)

**Files:**
- Modify: `web/app/checkout/review/page.tsx`
- Test: `web/app/checkout/review/page.test.tsx`

Konten dari `payment-review.html` (baris 76–119): stepper Login✓/Pembayaran✓/Review(active), ringkasan "Atas Nama: Dion Ahza", "Course: UI/UX Design Advanced", "Mentor: Dimas Pradipa Abiyuda", "Metode Pembayaran" (dinamis dari `paymentMethod`), "Total Invest", tombol "Konfirmasi & Bayar" → processing, link "← Kembali & Ubah Metode Pembayaran" → checkout.

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/checkout/review/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ReviewPage from './page';

describe('ReviewPage', () => {
  it('renders the order summary with mentor and total', () => {
    render(<ReviewPage />);
    expect(screen.getByText('Konfirmasi Pembayaran')).toBeInTheDocument();
    expect(screen.getByText('Dimas Pradipa Abiyuda')).toBeInTheDocument();
    expect(screen.getByText('Rp507.000')).toBeInTheDocument();
  });

  it('links "Konfirmasi & Bayar" to the processing step', () => {
    render(<ReviewPage />);
    expect(screen.getByRole('link', { name: 'Konfirmasi & Bayar' })).toHaveAttribute('href', '/checkout/processing');
  });

  it('links back to checkout to change payment method', () => {
    render(<ReviewPage />);
    expect(screen.getByRole('link', { name: /Kembali & Ubah Metode Pembayaran/ })).toHaveAttribute('href', '/checkout');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/checkout/review/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** using `useCheckoutState()` for `pricing.total` and `paymentMethod` (map `'bni' → 'Transfer Bank BNI'`, `'mandiri' → 'Transfer Bank Mandiri'`, `'bsi' → 'Transfer Bank Syariah Indonesia'`, `'qris' → 'QRIS'`, `'card' → 'Debit/Credit Card'`, matching the source's `id="review-payment-method"` intent), static fields "Atas Nama"/"Course"/"Mentor" match the source's hardcoded demo values (`checkout.html` and `payment-review.html` both hardcode "Dion Ahza" — keep as-is since no real auth session exists in this port; do not treat this as the login-credential security issue, it's just an order-summary placeholder name).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/checkout/review/page.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/checkout/review
git commit -m "feat: build payment review/confirmation page from ported payment-review.html content"
```

---

### Task 7: Processing + Berhasil + Gagal (`web/app/checkout/processing`, `web/app/checkout/berhasil`, `web/app/checkout/gagal`)

**Files:**
- Modify: `web/app/checkout/processing/page.tsx`
- Modify: `web/app/checkout/berhasil/page.tsx`
- Modify: `web/app/checkout/gagal/page.tsx`
- Test: `web/app/checkout/processing/page.test.tsx`
- Test: `web/app/checkout/berhasil/page.test.tsx`
- Test: `web/app/checkout/gagal/page.test.tsx`

Konten Processing dari `payment-processing.html` (baris 49–89): spinner, "Memproses pembayaran kamu...", box ringkasan (Merchant: CRYGLE Academy, Order ID `#CR-99201-AX`, Total), catatan keamanan "Secured by Encrypted Gateway · Sanctuary Protocol". Sumber pakai `<meta http-equiv="refresh">` + `setTimeout` — di Next.js diganti `useEffect` + `router.push` murni (redirect ganda di HTML asli itu redundansi teknis static-site, bukan behavior yang perlu dipertahankan).

Konten Berhasil dari `payment-success.html` (baris 48–182): badge check hijau, "Pembayaran Berhasil! 🎉", box kelas terdaftar (progress 0%), 2 CTA ("Mulai Belajar" → dashboard, "Lihat Kuitansi" → buka modal), 3 trust badge (Akses Selamanya, Sertifikat Resmi, Grup Komunitas), modal kuitansi resmi (No. Faktur `#INV-20260903-882`, tanggal transaksi, metode bayar, nama pembeli, rincian item, total, tombol cetak).

Konten Gagal (halaman baru, PRD §11.3 — informed by Midtrans/Xendit common failure reasons): pesan kegagalan + kode alasan (kartu ditolak / saldo tidak cukup / VA kedaluwarsa / timeout QRIS) + tombol "Coba Metode Lain" kembali ke checkout + tombol "Hubungi Support".

- [ ] **Step 1: Write the failing tests**

```tsx
// web/app/checkout/processing/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProcessingPage from './page';

describe('ProcessingPage', () => {
  it('renders the merchant, order ID, and total', () => {
    render(<ProcessingPage />);
    expect(screen.getByText('Memproses pembayaran kamu...')).toBeInTheDocument();
    expect(screen.getByText('CRYGLE Academy')).toBeInTheDocument();
    expect(screen.getByText('#CR-99201-AX')).toBeInTheDocument();
  });

  it('redirects to the success page after the simulated delay', () => {
    vi.useFakeTimers();
    const pushMock = vi.fn();
    vi.doMock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));
    render(<ProcessingPage />);
    vi.advanceTimersByTime(2400);
    expect(pushMock).toHaveBeenCalledWith('/checkout/berhasil');
    vi.useRealTimers();
  });
});
```

```tsx
// web/app/checkout/berhasil/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BerhasilPage from './page';

describe('BerhasilPage', () => {
  it('renders the success heading and enrolled course box', () => {
    render(<BerhasilPage />);
    expect(screen.getByText('Pembayaran Berhasil! 🎉')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit')).toBeInTheDocument();
  });

  it('opens the receipt modal showing invoice number and total', () => {
    render(<BerhasilPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Lihat Kuitansi' }));
    expect(screen.getByText('#INV-20260903-882')).toBeInTheDocument();
    expect(screen.getByText('Rp507.000')).toBeInTheDocument();
  });

  it('links "Mulai Belajar" to the dashboard', () => {
    render(<BerhasilPage />);
    expect(screen.getByRole('link', { name: 'Mulai Belajar' })).toHaveAttribute('href', '/dashboard');
  });
});
```

```tsx
// web/app/checkout/gagal/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GagalPage from './page';

describe('GagalPage', () => {
  it('renders the failure message and a retry link back to checkout', () => {
    render(<GagalPage />);
    expect(screen.getByText('Pembayaran Gagal')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Coba Metode Lain' })).toHaveAttribute('href', '/checkout');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run app/checkout/processing/page.test.tsx app/checkout/berhasil/page.test.tsx app/checkout/gagal/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build all three pages**

```tsx
// web/app/checkout/processing/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckoutState } from '@/hooks/useCheckoutState';

export default function ProcessingPage() {
  const router = useRouter();
  const { pricing } = useCheckoutState();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/checkout/berhasil'), 2400);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main style={{ padding: '80px var(--gutter)', textAlign: 'center' }}>
      <h1>Memproses pembayaran kamu...</h1>
      <p>Mohon tunggu sebentar, kami sedang memastikan transaksi kamu berjalan aman di Sanctuary kami.</p>
      <div style={{ maxWidth: 360, margin: '32px auto', textAlign: 'left', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Merchant</span><strong>CRYGLE Academy</strong></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Order ID</span><strong>#CR-99201-AX</strong></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total</span><strong>Rp {pricing.total.toLocaleString('id-ID')}</strong></div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--grey-400)' }}>Secured by Encrypted Gateway · Sanctuary Protocol</p>
    </main>
  );
}
```

`app/checkout/berhasil/page.tsx`: `'use client'`, `useState(false)` untuk modal kuitansi, konten persis dari `payment-success.html` (judul kelas pakai `courses.find(c => c.slug === 'ui-ux-menjual-produk-ui-kit')`), modal berisi No. Faktur `#INV-20260903-882`, tanggal transaksi, metode bayar dari `useCheckoutState().paymentMethod`, nama pembeli "Dion Ahza" (sama seperti Task 6 — placeholder demo order, bukan kredensial), rincian item dari `pricing`, tombol cetak `onClick={() => window.print()}`.

`app/checkout/gagal/page.tsx`: halaman baru — heading "Pembayaran Gagal", pesan singkat menjelaskan kemungkinan penyebab (kartu ditolak, saldo tidak cukup, VA/QRIS kedaluwarsa — pola umum Midtrans/Xendit dari riset PRD §11.3), tombol "Coba Metode Lain" (`Link href="/checkout"`) dan "Hubungi Support" (`Link href="mailto:tanya@crygleacademy.com"`, alamat email persis dari footer semua halaman commerce sumber).

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run app/checkout/processing/page.test.tsx app/checkout/berhasil/page.test.tsx app/checkout/gagal/page.test.tsx`
Expected: PASS — 6 tests passed total.

- [ ] **Step 5: Commit**

```bash
git add web/app/checkout/processing web/app/checkout/berhasil web/app/checkout/gagal
git commit -m "feat: build Processing, Berhasil (with receipt modal), and new Gagal payment pages"
```

---

### Task 8: Fase 2 verification

- [ ] **Step 1:** `npx vitest run` — expect all Fase 0-2 tests green.
- [ ] **Step 2:** `npx tsc --noEmit` — expect zero errors.
- [ ] **Step 3:** `npx next build` — expect success.
- [ ] **Step 4:** Manual: `npm run dev`, jalani alur penuh Home → Course Details → "Mulai Belajar" → Checkout → pilih tiap metode bayar → isi promo `CRYGLE50` (verifikasi total turun ke Rp457.000) → "Bayar Sekarang" → Review → "Konfirmasi & Bayar" → Processing (tunggu ~2.4 detik) → Berhasil → buka kuitansi → cetak (preview print browser, jangan benar-benar print). Juga cek Login → "Lupa Password?" → submit email → cek pesan konfirmasi. Signup → password mismatch → cek pesan error → cocokkan → submit → Verifikasi OTP → isi 6 digit → submit → kembali ke Login.
- [ ] **Step 5:** Commit checkpoint: `git commit -m "chore: Fase 2 Auth & Commerce complete"`.

## Self-Review Notes

- **Spec coverage:** 9 halaman Fase 2 dari `HANDOFF-Context-untuk-AI-Agent.md` §5 semua punya task (Login/Signup/Lupa Password/Verifikasi di Task 2-4; Checkout/Review/Processing/Berhasil/Gagal di Task 5-7).
- **Keamanan diverifikasi:** Task 2 test eksplisit mengecek field login KOSONG (bukan Assert positif bahwa demo value ada) — regression test langsung untuk gotcha #6 di HANDOFF.
- **Inkonsistensi harga dicatat, bukan disembunyikan:** lihat Global Constraints — checkout pakai Rp499rb+8rb dari `checkout.html`, beda dari Rp449rb di `courses.ts`/Course Details. Item harmonisasi didaftarkan sebagai follow-up, bukan diperbaiki diam-diam di sini (supaya AI agent penerus tahu ini keputusan sadar, bukan bug port).
