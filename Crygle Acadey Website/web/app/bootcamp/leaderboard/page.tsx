import React from 'react';
import { BootcampCohortShell } from '@/components/bootcamp/BootcampCohortShell.jsx';

export default function BootcampLeaderboardPage() {
  const rankings = [
    {
      rank: 1,
      medal: '🥇',
      medalBg: '#FFFDF5',
      name: 'Ahmad Fauzi',
      school: 'SMK N 2 Pekanbaru',
      tasksCompleted: '3 dari 3 Tugas',
      points: '485 Poin',
      isCurrentUser: false,
    },
    {
      rank: 2,
      medal: '🥈',
      medalBg: '#F8FAFD',
      name: 'Dion Ahza (Anda)',
      school: 'SMK Telkom / Crygle Boarding',
      tasksCompleted: '2 dari 3 Tugas',
      points: '472 Poin',
      isCurrentUser: true,
    },
    {
      rank: 3,
      medal: '🥉',
      medalBg: '#ffffff',
      name: 'Nabila Putri',
      school: 'Boarding School Solo',
      tasksCompleted: '2 dari 3 Tugas',
      points: '460 Poin',
      isCurrentUser: false,
    },
    {
      rank: 4,
      medal: '4',
      medalBg: '#ffffff',
      name: 'Rizky Ramadhan',
      school: 'SMK Asrama Bogor',
      tasksCompleted: '2 dari 3 Tugas',
      points: '445 Poin',
      isCurrentUser: false,
    },
  ];

  return (
    <BootcampCohortShell active="leaderboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#202020', margin: '0 0 6px' }}>
            Leaderboard Ranking
          </h2>
          <p style={{ fontSize: 14, color: 'var(--grey-500, #797979)', margin: 0 }}>
            Peringkat konsistensi santri berdasarkan penyelesaian tugas, skor penilaian mentor, dan kehadiran live session.
          </p>
        </div>

        {/* Leaderboard Table Container */}
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
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020', width: 100 }}>Peringkat</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Nama Santri / Siswa</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Asal Sekolah / Asrama</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Tugas Selesai</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#202020' }}>Total Akumulasi Poin</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((r, idx) => (
                  <tr
                    key={idx}
                    style={{
                      background: r.isCurrentUser ? '#F8FAFD' : r.medalBg,
                      borderBottom: idx < rankings.length - 1 ? '1px solid #F1F1F1' : 'none',
                    }}
                  >
                    <td style={{ padding: '18px 20px' }}>
                      <span
                        className="rank-badge-medal"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: r.rank === 1 ? '#FFF8E6' : r.rank === 2 ? '#F0F4F8' : r.rank === 3 ? '#FAF0E6' : '#F1F1F1',
                          fontSize: r.rank <= 3 ? 16 : 13,
                          fontWeight: 800,
                          color: '#202020',
                        }}
                      >
                        {r.medal}
                      </span>
                    </td>
                    <td style={{ padding: '18px 20px', fontWeight: 700, color: '#202020' }}>
                      {r.isCurrentUser ? (
                        <span style={{ color: 'var(--color-primary, #235F9C)' }}>
                          <strong>{r.name}</strong>
                        </span>
                      ) : (
                        <span><strong>{r.name}</strong></span>
                      )}
                    </td>
                    <td style={{ padding: '18px 20px', color: 'var(--grey-600, #5A6062)' }}>
                      {r.school}
                    </td>
                    <td style={{ padding: '18px 20px', color: '#202020' }}>
                      {r.tasksCompleted}
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      <strong
                        style={{
                          color: r.rank === 1 ? '#269C45' : r.isCurrentUser ? 'var(--color-primary, #235F9C)' : '#202020',
                        }}
                      >
                        {r.points}
                      </strong>
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
