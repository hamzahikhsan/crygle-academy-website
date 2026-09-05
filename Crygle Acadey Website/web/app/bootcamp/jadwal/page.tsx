import React from 'react';
import { BootcampCohortShell } from '@/components/bootcamp/BootcampCohortShell.jsx';

export default function BootcampJadwalPage() {
  const sessions = [
    {
      session: 'Pekan 1',
      date: '3 Sep 2026 · 19:30 WIB',
      topic: 'Orientasi Santri & Standarisasi Figma Dev Mode',
      mentor: 'Dimas Pradipa',
      linkType: 'recording',
      linkText: 'Rekaman Sesi ↗',
      url: 'https://meet.google.com/demo',
      status: 'attended',
      statusText: '✓ Hadir (100%)',
    },
    {
      session: 'Pekan 2',
      date: '10 Sep 2026 · 19:30 WIB',
      topic: 'User Research & Market Validation Produk UI8',
      mentor: 'Siti Aminah',
      linkType: 'recording',
      linkText: 'Rekaman Sesi ↗',
      url: 'https://meet.google.com/demo',
      status: 'attended',
      statusText: '✓ Hadir (100%)',
    },
    {
      session: 'Pekan 3',
      date: '17 Sep 2026 · 19:30 WIB',
      topic: 'Design Tokens, Auto Layout & Atomic System',
      mentor: 'Dimas Pradipa',
      linkType: 'live',
      linkText: 'Join Live Zoom ↗',
      url: 'https://meet.google.com/demo',
      status: 'scheduled',
      statusText: 'Terjadwal',
    },
    {
      session: 'Pekan 4',
      date: '24 Sep 2026 · 19:30 WIB',
      topic: 'Final Project Review & Mockup Upload Portofolio',
      mentor: 'Dimas Pradipa',
      linkType: 'upcoming',
      linkText: 'Tersedia H-1',
      url: null,
      status: 'scheduled',
      statusText: 'Terjadwal',
    },
  ];

  return (
    <BootcampCohortShell active="jadwal">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#202020', margin: '0 0 6px' }}>
            Jadwal dan Absensi
          </h2>
          <p style={{ fontSize: 14, color: 'var(--grey-500, #797979)', margin: 0 }}>
            Sesi live mentoring mingguan setiap Kamis pukul 19:30 WIB via Zoom/Meet. Kehadiran minimal 80% diperlukan untuk syarat sertifikasi.
          </p>
        </div>

        {/* Schedule & Attendance Table */}
        <div
          className="data-table-container"
          style={{
            background: '#ffffff',
            border: '1px solid var(--grey-100, #EAEAEA)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              className="crygle-data-table"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: '#F8FAFD', borderBottom: '1px solid #EAEAEA' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Sesi</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Tanggal &amp; Jam</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Materi / Topik</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Mentor Fasilitator</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Tautan Meeting</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Status Hadir</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: idx < sessions.length - 1 ? '1px solid #F1F1F1' : 'none',
                    }}
                  >
                    <td style={{ padding: '18px 20px', fontWeight: 700, color: '#202020' }}>
                      {s.session}
                    </td>
                    <td style={{ padding: '18px 20px', color: 'var(--grey-600, #5A6062)' }}>
                      {s.date}
                    </td>
                    <td style={{ padding: '18px 20px', fontWeight: 600, color: '#202020' }}>
                      {s.topic}
                    </td>
                    <td style={{ padding: '18px 20px', color: '#202020' }}>
                      {s.mentor}
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--color-primary, #235F9C)',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          {s.linkText}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--grey-400, #A6A6A6)' }}>{s.linkText}</span>
                      )}
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      {s.status === 'attended' ? (
                        <span
                          className="status-badge-attended"
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: 20,
                            background: '#E8F8EE',
                            color: '#269C45',
                            fontSize: 12,
                            fontWeight: 800,
                          }}
                        >
                          {s.statusText}
                        </span>
                      ) : (
                        <span
                          className="status-badge-scheduled"
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: 20,
                            background: '#F1F6FC',
                            color: 'var(--color-primary, #235F9C)',
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {s.statusText}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BootcampCohortShell>
  );
}
