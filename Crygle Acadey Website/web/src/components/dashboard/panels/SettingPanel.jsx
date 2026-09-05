'use client';

import React, { useState } from 'react';

export function SettingPanel() {
  const [activeSubtab, setActiveSubtab] = useState('profil');
  const [toastMessage, setToastMessage] = useState(null);

  // Form state pre-filled with demo student data
  const [name, setName] = useState('Dion Ahza');
  const [email, setEmail] = useState('dion.ahza@smk.sch.id');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [school, setSchool] = useState('SMK N 2 Boarding School Pekanbaru');
  const [bio, setBio] = useState(
    'Santri jurusan Rekayasa Perangkat Lunak. Fokus mendalami UI/UX design tokens dan monetisasi produk di UI8.'
  );

  const subtabs = [
    { id: 'profil', label: 'Profil Siswa' },
    { id: 'akademik', label: 'Akademik & Asrama' },
    { id: 'keamanan', label: 'Keamanan Sandi' },
    { id: 'notifikasi', label: 'Notifikasi' },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setToastMessage('✅ Perubahan profil siswa berhasil disimpan!');
    setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <section id="panel-setting" className="dashboard-panel" style={{ display: 'block' }}>
      <div className="setting-content-body" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Settings Subtabs Nav */}
        <div
          className="setting-subtabs-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid #EAEAEA',
            paddingBottom: 14,
            flexWrap: 'wrap',
          }}
        >
          {subtabs.map((tab) => {
            const isActive = activeSubtab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubtab(tab.id)}
                className={`setting-subtab-link ${isActive ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? 'var(--color-primary, #235F9C)' : '#797979',
                  borderBottom: isActive ? '2px solid var(--color-primary, #235F9C)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profil Siswa Form */}
        {activeSubtab === 'profil' ? (
          <form
            onSubmit={handleSubmit}
            className="settings-card-form"
            id="form-setting-profile"
            style={{
              background: '#ffffff',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
            }}
          >
            {/* Avatar Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                paddingBottom: 20,
                borderBottom: '1px solid #E9E9E9',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                alt="Avatar Dion"
                style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    padding: '8px 20px',
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 700,
                    background: 'var(--color-primary, #235F9C)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Ganti Foto
                </button>
                <span style={{ fontSize: 12, color: '#797979', marginLeft: 12 }}>
                  Format JPG/PNG maks. 2 MB
                </span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div
              className="settings-form-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20,
              }}
            >
              <div className="settings-input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="set-name" style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>
                  Nama Lengkap Siswa
                </label>
                <input
                  type="text"
                  id="set-name"
                  className="settings-input-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    border: '1.5px solid #E0E0E0',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div className="settings-input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="set-email" style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>
                  Email Terdaftar
                </label>
                <input
                  type="email"
                  id="set-email"
                  className="settings-input-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    border: '1.5px solid #E0E0E0',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div className="settings-input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="set-phone" style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>
                  Nomor WhatsApp Siswa / Asrama
                </label>
                <input
                  type="tel"
                  id="set-phone"
                  className="settings-input-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    border: '1.5px solid #E0E0E0',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div className="settings-input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="set-school" style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>
                  Asal Sekolah / Pesantren Asrama
                </label>
                <input
                  type="text"
                  id="set-school"
                  className="settings-input-control"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    border: '1.5px solid #E0E0E0',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div className="settings-input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="set-bio" style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>
                Bio / Minat Karir
              </label>
              <textarea
                id="set-bio"
                className="settings-input-control"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '1.5px solid #E0E0E0',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '12px 32px',
                  borderRadius: 50,
                  fontWeight: 800,
                  fontSize: 14,
                  background: 'var(--color-primary, #235F9C)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Simpan Perubahan
              </button>
              {toastMessage && (
                <span style={{ fontSize: 13, fontWeight: 700, color: '#269C45' }}>{toastMessage}</span>
              )}
            </div>
          </form>
        ) : (
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #E9E9E9',
              borderRadius: 20,
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#202020', marginBottom: 8 }}>
              Segera hadir: Pengaturan {subtabs.find((s) => s.id === activeSubtab)?.label}
            </h3>
            <p style={{ fontSize: 14, color: '#797979', maxWidth: 480, margin: '0 auto' }}>
              Fitur ini sedang disiapkan oleh tim akademik Crygle Academy untuk mempermudah manajemen akun santri secara menyeluruh.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
