'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function DashboardHeader({ activeTab = 'courses' }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const titleMap = {
    overview: 'Overview',
    courses: 'Kelas Saya',
    bootcamp: 'Bootcamp Saya',
    explore: 'Explore Kelas',
    chat: 'Chat Mentor',
    affiliate: 'Affiliate',
    setting: 'Pengaturan',
  };

  const currentTitle = titleMap[activeTab] || 'Kelas Saya';

  return (
    <header
      className="dashboard-top-header"
      style={{
        padding: '24px 36px',
        background: 'var(--white, #ffffff)',
        borderBottom: '1px solid var(--grey-100, #EAEAEA)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div
        className="dashboard-title-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1
          id="dashboard-main-title"
          className="dashboard-page-title"
          style={{
            fontFamily: 'var(--font-core)',
            fontSize: 26,
            fontWeight: 800,
            color: 'var(--black, #202020)',
            margin: 0,
          }}
        >
          {currentTitle}
        </h1>

        <div className="dashboard-user-actions" style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
          {/* Notification Button */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="btn-notif-circle"
              id="btn-header-notif"
              aria-label="Notifikasi"
              onClick={() => {
                setShowNotif(!showNotif);
                setShowProfile(false);
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid var(--grey-100, #EAEAEA)',
                background: 'var(--white, #ffffff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                color: 'var(--grey-600, #5A6062)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {hasUnread && (
                <span
                  id="notif-red-dot"
                  className="notif-badge-dot"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#E02B20',
                  }}
                />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotif && (
              <div
                className="header-dropdown-card"
                id="header-notif-dropdown"
                style={{
                  position: 'absolute',
                  top: 54,
                  right: 0,
                  width: 320,
                  background: 'var(--white, #ffffff)',
                  border: '1px solid var(--grey-100, #EAEAEA)',
                  borderRadius: 16,
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                  zIndex: 100,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--grey-100, #EAEAEA)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: 15, color: '#202020' }}>Notifikasi</span>
                  <button
                    type="button"
                    id="btn-mark-all-read"
                    onClick={() => setHasUnread(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: 12,
                      color: 'var(--color-primary, #235F9C)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Tandai Dibaca
                  </button>
                </div>
                <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                  <Link
                    href="/dashboard?tab=bootcamp"
                    onClick={() => setShowNotif(false)}
                    className="notif-item-row unread"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '14px 20px',
                      textDecoration: 'none',
                      borderBottom: '1px solid #F4F4F4',
                      background: hasUnread ? '#F7FAFD' : '#ffffff',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>⭐</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>Tugas Modul 2 Dinilai!</div>
                      <div style={{ fontSize: 12, color: '#797979', marginTop: 2 }}>Mas Dimas memberikan nilai 90/100 pada tugas Design System.</div>
                      <div style={{ fontSize: 11, color: '#A6A6A6', marginTop: 4 }}>10 menit lalu</div>
                    </div>
                  </Link>
                  <Link
                    href="/dashboard?tab=overview"
                    onClick={() => setShowNotif(false)}
                    className="notif-item-row unread"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '14px 20px',
                      textDecoration: 'none',
                      borderBottom: '1px solid #F4F4F4',
                      background: hasUnread ? '#F7FAFD' : '#ffffff',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>🔴</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>Sesi Live Mentoring Hari Ini</div>
                      <div style={{ fontSize: 12, color: '#797979', marginTop: 2 }}>Sesi live review portofolio dimulai pukul 16:00 WIB via Zoom.</div>
                      <div style={{ fontSize: 11, color: '#A6A6A6', marginTop: 4 }}>1 jam lalu</div>
                    </div>
                  </Link>
                  <Link
                    href="/dashboard?tab=affiliate"
                    onClick={() => setShowNotif(false)}
                    className="notif-item-row"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '14px 20px',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>💰</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>Komisi Berhasil Ditambahkan</div>
                      <div style={{ fontSize: 12, color: '#797979', marginTop: 2 }}>Temanmu Ahmad Fauzi mendaftar kelas UI/UX (+Rp 120.000).</div>
                      <div style={{ fontSize: 11, color: '#A6A6A6', marginTop: 4 }}>Kemarin</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              className="user-profile-pill"
              id="btn-header-profile"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotif(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 14px 6px 6px',
                borderRadius: 40,
                border: '1px solid var(--grey-100, #EAEAEA)',
                background: 'var(--white, #ffffff)',
                cursor: 'pointer',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="Dion Ahza Avatar"
                className="user-avatar-img"
                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
              />
              <span className="user-name-label" style={{ fontSize: 14, fontWeight: 700, color: '#202020' }}>
                Dion Ahza
              </span>
              <span style={{ fontSize: 10, color: '#797979' }}>▾</span>
            </div>

            {/* Profile Dropdown */}
            {showProfile && (
              <div
                className="header-dropdown-card"
                id="header-profile-dropdown"
                style={{
                  position: 'absolute',
                  top: 50,
                  right: 0,
                  width: 220,
                  background: 'var(--white, #ffffff)',
                  border: '1px solid var(--grey-100, #EAEAEA)',
                  borderRadius: 16,
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                  zIndex: 100,
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #E9E9E9' }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#202020' }}>Dion Ahza</div>
                  <div style={{ fontSize: 12, color: '#797979', marginTop: 2 }}>SMK N 2 Pekanbaru</div>
                </div>
                <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column' }}>
                  <Link
                    href="/dashboard?tab=setting"
                    onClick={() => setShowProfile(false)}
                    className="notif-item-row"
                    style={{
                      padding: '10px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#202020',
                      textDecoration: 'none',
                    }}
                  >
                    ⚙️ Pengaturan Profil
                  </Link>
                  <Link
                    href="/classroom/ui-ux-menjual-produk-ui-kit"
                    onClick={() => setShowProfile(false)}
                    className="notif-item-row"
                    style={{
                      padding: '10px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#202020',
                      textDecoration: 'none',
                    }}
                  >
                    ▶ Ruang Belajar Aktif
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setShowProfile(false)}
                    className="notif-item-row"
                    style={{
                      padding: '10px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#E02B20',
                      textDecoration: 'none',
                    }}
                  >
                    🚪 Keluar Akun
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search & Filters Bar (Node 814:5939 / dashboard.html lines 185-230) */}
      {(activeTab === 'courses' || activeTab === 'explore') && (
        <div
          className="dashboard-filter-bar"
          id="dashboard-search-bar-wrap"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div
            className="dashboard-search-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 460,
              maxWidth: '100%',
              height: 48,
              border: '1px solid var(--grey-100, #E9E9E9)',
              borderRadius: 12,
              padding: '0 18px',
              background: '#ffffff',
            }}
          >
            <input
              type="text"
              id="dashboard-search-input"
              className="dashboard-search-input"
              placeholder="Search Course Name/Mentor"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 14,
                fontFamily: 'var(--font-family-base, inherit)',
                color: '#202020',
              }}
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <div className="dashboard-filter-group" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div
              className="filter-select-pill"
              id="filter-level"
              style={{
                height: 48,
                padding: '0 18px',
                border: '1px solid var(--grey-100, #E9E9E9)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--grey-600, #5A6062)',
                cursor: 'pointer',
                background: '#ffffff',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="14" width="4" height="8" rx="1"></rect>
                <rect x="10" y="8" width="4" height="14" rx="1"></rect>
                <rect x="18" y="2" width="4" height="20" rx="1"></rect>
              </svg>
              <span>Level</span>
              <span style={{ fontSize: 10, color: '#A6A6A6' }}>▾</span>
            </div>

            <div
              className="filter-select-pill"
              id="filter-category"
              style={{
                height: 48,
                padding: '0 18px',
                border: '1px solid var(--grey-100, #E9E9E9)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--grey-600, #5A6062)',
                cursor: 'pointer',
                background: '#ffffff',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Category</span>
              <span style={{ fontSize: 10, color: '#A6A6A6' }}>▾</span>
            </div>

            <div
              className="filter-select-pill"
              id="filter-sort"
              style={{
                height: 48,
                padding: '0 18px',
                border: '1px solid var(--grey-100, #E9E9E9)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--grey-600, #5A6062)',
                cursor: 'pointer',
                background: '#ffffff',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="14" y2="12"></line>
                <line x1="4" y1="18" x2="8" y2="18"></line>
              </svg>
              <span>Sort By : Popular</span>
              <span style={{ fontSize: 10, color: '#A6A6A6' }}>▾</span>
            </div>
          </div>
        </div>
      )}
    </header>

  );
}
