'use client';

import React, { Suspense } from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell.jsx';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Memuat Dashboard...</div>}>
      <DashboardShell />
    </Suspense>
  );
}
