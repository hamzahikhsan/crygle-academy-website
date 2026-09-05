'use client';

import React, { useState } from 'react';
import { BootcampCohortShell } from '@/components/bootcamp/BootcampCohortShell.jsx';

export default function BootcampBookingPage() {
  const mentors = [
    {
      id: 'dimas',
      shortName: 'Dimas Pradipa',
      fullName: 'Dimas Pradipa Abiyuda',
      role: 'Lead UI/UX & Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    {
      id: 'randy',
      shortName: 'Randy Pratama',
      fullName: 'Randy Pratama',
      role: 'Mentor 3D Blender & Assets',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    },
  ];

  const slots = [
    '10:00 – 10:45 WIB',
    '14:00 – 14:45 WIB',
    '16:00 – 16:45 WIB',
    '20:00 – 20:45 WIB',
  ];

  const [selectedMentor, setSelectedMentor] = useState(mentors[0].shortName);
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);
  const [confirmed, setConfirmed] = useState(false);

  function handleConfirm() {
    setConfirmed(true);
  }

  return (
    <BootcampCohortShell active="booking">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#202020', margin: '0 0 6px' }}>
            Booking Konsultasi
          </h2>
          <p style={{ fontSize: 14, color: 'var(--grey-500, #797979)', margin: 0 }}>
            Dapatkan evaluasi 1-on-1 langsung terhadap file Figma karyamu. Skema: Rp15.000 / sesi atau Rp150.000 / bulan.
          </p>
        </div>

        {confirmed && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 12,
              background: '#E8F8EE',
              border: '1px solid #B8E8C7',
              color: '#1E7E34',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            ✅ Sesi konsultasi berhasil dipesan bersama {selectedMentor} untuk jam {selectedSlot}! Link Google Meet telah dikirimkan ke email terdaftar.
          </div>
        )}

        <div
          className="booking-grid-wrapper"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {/* Left Column: Mentor Selection & Time Slots */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid var(--grey-100, #EAEAEA)',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#202020', margin: '0 0 12px' }}>
                Pilih Mentor Konsultasi Terjadwal
              </h3>

              <div
                className="booking-mentor-list"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {mentors.map((m) => {
                  const isSelected = selectedMentor === m.shortName;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedMentor(m.shortName);
                        setConfirmed(false);
                      }}
                      className={`booking-mentor-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '14px 18px',
                        borderRadius: 12,
                        border: isSelected ? '2px solid var(--color-primary, #235F9C)' : '1px solid #EAEAEA',
                        background: isSelected ? '#F1F6FC' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <img
                        src={m.avatar}
                        alt={m.shortName}
                        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#202020' }}>
                          {m.shortName}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--grey-500, #797979)' }}>
                          {m.role}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 15, fontWeight: 800, color: '#202020', margin: '0 0 12px' }}>
                Pilih Jam Tersedia (Hari Ini / Besok):
              </h4>
              <div
                className="slot-pills-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: 10,
                }}
              >
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setConfirmed(false);
                      }}
                      className={`slot-time-btn ${isSelected ? 'selected' : ''}`}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: isSelected ? '1.5px solid var(--color-primary, #235F9C)' : '1px solid #EAEAEA',
                        background: isSelected ? 'var(--color-primary, #235F9C)' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#202020',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Summary Card */}
          <div
            className="booking-summary-card"
            data-testid="booking-summary"
            style={{
              background: '#ffffff',
              border: '1px solid var(--grey-100, #EAEAEA)',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h4 style={{ fontSize: 16, fontWeight: 800, color: '#202020', margin: 0 }}>
              Konfirmasi Sesi Konsultasi
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--grey-500, #797979)' }}>Mentor:</span>
                <strong id="summary-mentor-name" style={{ color: '#202020' }}>{selectedMentor}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--grey-500, #797979)' }}>Waktu Sesi:</span>
                <strong id="summary-slot-time" style={{ color: '#202020' }}>{selectedSlot}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--grey-500, #797979)' }}>Biaya Sesi:</span>
                <strong style={{ color: 'var(--color-primary, #235F9C)' }}>Rp 15.000 / sesi</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #EAEAEA', paddingTop: 16 }}>
              <button
                type="button"
                id="btn-confirm-booking"
                onClick={handleConfirm}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  borderRadius: 50,
                  background: 'var(--color-primary, #235F9C)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(35, 95, 156, 0.25)',
                }}
              >
                Konfirmasi Booking Sesi
              </button>
            </div>
          </div>
        </div>
      </div>
    </BootcampCohortShell>
  );
}
