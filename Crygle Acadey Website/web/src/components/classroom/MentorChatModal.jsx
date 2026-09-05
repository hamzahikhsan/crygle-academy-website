'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function MentorChatModal({ isOpen, onClose }) {
  const [topic, setTopic] = useState('Review Portofolio & UI Kit Produk');

  if (!isOpen) return null;

  const waUrl = `https://wa.me/6282283901120?text=${encodeURIComponent(
    `Halo Mas Dimas, saya Dion Ahza siswa kelas UI/UX Design Crygle Academy. Mau konsultasi modul Brainstorming Fitur (Topik: ${topic}).`
  )}`;

  return (
    <div
      className="receipt-modal-backdrop"
      id="mentor-chat-modal"
      aria-hidden={!isOpen}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 20,
      }}
    >
      <div
        className="receipt-modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: 20,
          maxWidth: 480,
          width: '100%',
          padding: 28,
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
        }}
      >
        <button
          type="button"
          className="receipt-modal-close-btn"
          id="btn-close-mentor-chat"
          aria-label="Tutup"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: '#F1F6FC',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 800,
            color: '#797979',
          }}
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="Dimas Pradipa Abiyuda"
            id="modal-mentor-avatar"
            style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h3
              id="modal-mentor-heading"
              style={{ fontSize: 17, fontWeight: 800, color: '#202020', margin: '0 0 4px 0' }}
            >
              Konsultasi Mentor: Dimas Pradipa
            </h3>
            <span
              style={{
                fontSize: 11,
                color: '#188749',
                fontWeight: 700,
                background: '#DBFBD6',
                padding: '2px 10px',
                borderRadius: 20,
              }}
            >
              ONLINE · CEPAT MERESPONS
            </span>
          </div>
        </div>

        <p
          id="modal-mentor-intro"
          style={{ fontSize: 13.5, color: '#5A6062', lineHeight: 1.6, margin: '0 0 18px 0' }}
        >
          Punya kendala saat mengikuti modul <em>Brainstorming Fitur</em> atau ingin mereview file Figma hasil karyamu? Sampaikan langsung pada sesi konsultasi santri.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>Pilih Topik Konsultasi:</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: '1.5px solid var(--color-primary, #235F9C)',
              fontSize: 13.5,
              outline: 'none',
              background: '#FAFBFD',
            }}
          >
            <option>Review Portofolio &amp; UI Kit Produk</option>
            <option>Kendala Teknis Auto Layout &amp; Varian Figma</option>
            <option>Strategi Pendaftaran Seller di UI8</option>
            <option>Jadwal Bimbingan Khusus Sekolah Asrama</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="modal-wa-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '13px 20px',
              borderRadius: 50,
              textDecoration: 'none',
              fontSize: 13.5,
              fontWeight: 700,
              background: '#25D366',
              color: '#ffffff',
            }}
          >
            <span>Buka Chat WhatsApp Mentor</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>

          <Link
            href="/dashboard?tab=chat"
            onClick={onClose}
            className="btn-success-outline"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 50,
              textDecoration: 'none',
              fontSize: 13.5,
              fontWeight: 700,
              border: '1.5px solid var(--color-primary, #235F9C)',
              color: 'var(--color-primary, #235F9C)',
            }}
          >
            <span>Buka Workspace Chat di Dashboard</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
