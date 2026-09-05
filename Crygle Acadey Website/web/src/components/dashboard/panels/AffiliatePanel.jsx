'use client';

import React, { useState } from 'react';

export function AffiliatePanel() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'CRYGLE-DION-SMK';

  function handleCopy() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  const commissionHistory = [
    {
      name: 'Ahmad Fauzi',
      course: 'UI/UX Design Flagship',
      date: '2 Sep 2026',
      commission: 'Rp 52.500',
      status: '✓ Sudah Cair',
      statusType: 'paid',
    },
    {
      name: 'Rian Hidayat',
      course: '3D Blender Animation',
      date: '1 Sep 2026',
      commission: 'Rp 48.000',
      status: '✓ Sudah Cair',
      statusType: 'paid',
    },
    {
      name: 'Muhammad Fikri',
      course: 'UI/UX Design Flagship',
      date: '3 Sep 2026',
      commission: 'Rp 52.500',
      status: 'Diproses',
      statusType: 'pending',
    },
  ];

  return (
    <section id="panel-affiliate" className="dashboard-panel" style={{ display: 'block' }}>
      <div className="affiliate-content-body" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Referral Code Banner */}
        <div
          className="referral-box-card"
          style={{
            background: 'linear-gradient(135deg, #184370 0%, #235F9C 100%)',
            borderRadius: 20,
            padding: 32,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 12px 30px rgba(35, 95, 156, 0.15)',
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <span
              style={{
                background: '#FCC112',
                color: '#202020',
                fontSize: 11,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 20,
                display: 'inline-block',
                marginBottom: 8,
              }}
            >
              PROGRAM RUJUKAN SANTRI &amp; SEKOLAH
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.3 }}>
              Bagikan Ilmu &amp; Dapatkan Komisi 15%
            </h2>
            <p style={{ fontSize: 13.5, opacity: 0.9, margin: 0 }}>
              Ajak teman sekolah atau adik kelas asrama untuk belajar skill digital di Crygle Academy.
            </p>
          </div>

          <div
            className="referral-pill-input"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '10px 18px',
              borderRadius: 50,
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <div>
              <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 700 }}>
                Kode Referral Anda:
              </div>
              <div id="affiliate-code-text" style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', letterSpacing: '0.05em' }}>
                {referralCode}
              </div>
            </div>
            <button
              type="button"
              id="btn-copy-affiliate"
              onClick={handleCopy}
              style={{
                background: '#ffffff',
                color: 'var(--color-primary, #235F9C)',
                borderRadius: 50,
                fontWeight: 800,
                padding: '8px 18px',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12.5,
              }}
            >
              {copied ? '✓ Tersalin!' : 'Salin Kode'}
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div
          className="bento-kpi-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
              Total Klik Link
            </span>
            <div className="kpi-value-number" style={{ fontSize: 26, fontWeight: 800, color: '#202020' }}>
              142 Klik
            </div>
            <span style={{ fontSize: 12, color: '#797979' }}>Dari WhatsApp &amp; Media Sosial</span>
          </div>

          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
              Teman Mendaftar
            </span>
            <div className="kpi-value-number" style={{ fontSize: 26, fontWeight: 800, color: '#202020' }}>
              8 Siswa
            </div>
            <span
              className="kpi-trend-pill"
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 20,
                background: '#E8F8EE',
                color: '#269C45',
                alignSelf: 'flex-start',
              }}
            >
              +3 Siswa bulan ini
            </span>
          </div>

          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
              Komisi Dicairkan
            </span>
            <div className="kpi-value-number" style={{ fontSize: 26, fontWeight: 800, color: '#269C45' }}>
              Rp 480.000
            </div>
            <span style={{ fontSize: 12, color: '#797979' }}>Ditransfer ke Rekening/E-Wallet</span>
          </div>

          <div
            className="kpi-metric-card"
            style={{
              background: '#FCFCFC',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span className="kpi-label-text" style={{ fontSize: 13, fontWeight: 700, color: '#797979' }}>
              Menunggu Pencairan
            </span>
            <div className="kpi-value-number" style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-primary, #235F9C)' }}>
              Rp 120.000
            </div>
            <span style={{ fontSize: 12, color: '#797979' }}>Jadwal cair: 10 September 2026</span>
          </div>
        </div>

        {/* Commission History Table */}
        <div
          className="data-table-container"
          style={{
            background: '#ffffff',
            border: '1px solid #E9E9E9',
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '18px 24px',
              borderBottom: '1px solid #E9E9E9',
              fontSize: 16,
              fontWeight: 800,
              color: '#202020',
            }}
          >
            Riwayat Pendaftaran Teman Rujukan
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table
              className="crygle-data-table"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: 13.5,
              }}
            >
              <thead>
                <tr style={{ background: '#FAFBFD', borderBottom: '1px solid #E9E9E9' }}>
                  <th style={{ padding: '14px 24px', fontWeight: 700, color: '#797979' }}>Nama Teman</th>
                  <th style={{ padding: '14px 24px', fontWeight: 700, color: '#797979' }}>Kelas yang Diambil</th>
                  <th style={{ padding: '14px 24px', fontWeight: 700, color: '#797979' }}>Tanggal Gabung</th>
                  <th style={{ padding: '14px 24px', fontWeight: 700, color: '#797979' }}>Komisi (15%)</th>
                  <th style={{ padding: '14px 24px', fontWeight: 700, color: '#797979' }}>Status Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {commissionHistory.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F4F4F4' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#202020' }}>{row.name}</td>
                    <td style={{ padding: '16px 24px', color: '#5A6062' }}>{row.course}</td>
                    <td style={{ padding: '16px 24px', color: '#797979' }}>{row.date}</td>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#202020' }}>{row.commission}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                          background: row.statusType === 'paid' ? '#E8F8EE' : '#FFF9E6',
                          color: row.statusType === 'paid' ? '#269C45' : '#D9A000',
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
