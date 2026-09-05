'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VideoPlayer } from '@/components/classroom/VideoPlayer.jsx';
import { ModulesSidebar } from '@/components/classroom/ModulesSidebar.jsx';
import { MentorChatModal } from '@/components/classroom/MentorChatModal.jsx';

export default function ClassroomPage({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState<'pane-resources' | 'pane-ringkasan' | 'pane-review'>('pane-resources');
  const [isMentorChatOpen, setIsMentorChatOpen] = useState(false);
  const [reviewInput, setReviewInput] = useState('');
  const [reviewFeedback, setReviewFeedback] = useState<string | null>(null);

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewInput.trim()) return;
    setReviewFeedback('Ulasan kamu berhasil dikirim ke forum diskusi kelas!');
    setReviewInput('');
    setTimeout(() => setReviewFeedback(null), 4000);
  }

  return (
    <div
      className="classroom-page-container"
      style={{
        minHeight: '100vh',
        background: 'var(--surface-light, #F8FAFC)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. TOP NAVIGATION BAR */}
      <header
        className="classroom-top-nav"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #EAEAEA',
          padding: '16px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/" aria-label="Crygle Academy">
            <img src="/logo/crygle-lockup-blue.png" alt="Crygle Academy" style={{ height: 36, objectFit: 'contain' }} />
          </Link>
          <Link
            href="/dashboard"
            className="btn-back-dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 50,
              background: '#F1F6FC',
              color: 'var(--color-primary, #235F9C)',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="m12 19-7-7 7-7"></path>
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-primary, #235F9C)', background: '#F1F6FC', padding: '3px 10px', borderRadius: 20 }}>
            Play Kelas
          </span>
          <h1
            className="classroom-greeting-title"
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#202020',
              margin: 0,
            }}
          >
            Semangat dan mulai Belajar! 💪
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            className="btn-notif-circle"
            aria-label="Notifikasi"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid #EAEAEA',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#5A6062',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>

          <div
            className="user-profile-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px 4px 4px',
              borderRadius: 40,
              background: '#ffffff',
              border: '1px solid #EAEAEA',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
              alt="Dion Ahza Avatar"
              className="user-avatar-img"
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
            />
            <span className="user-name-label" style={{ fontSize: 13, fontWeight: 700, color: '#202020' }}>
              Dion Ahza
            </span>
          </div>
        </div>
      </header>

      {/* 2. CLASSROOM MAIN GRID */}
      <main
        className="classroom-main-grid"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 28,
          padding: '28px 36px 60px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: SYLLABUS & MODULES SIDEBAR */}
        <ModulesSidebar onOpenMentorChat={() => setIsMentorChatOpen(true)} />

        {/* RIGHT COLUMN: VIDEO PLAYER & TABS */}
        <section
          className="classroom-player-card"
          style={{
            background: '#ffffff',
            border: '1px solid #E9E9E9',
            borderRadius: 20,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
          }}
        >
          {/* Video Player Frame */}
          <VideoPlayer poster="/dashboard-assets/lesson-video-poster.jpg" title="Brainstorming Fitur" />

          {/* Active Lesson Info & Next Modul CTA */}
          <div
            className="lesson-action-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              paddingBottom: 18,
              borderBottom: '1px solid #EAEAEA',
            }}
          >
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary, #235F9C)' }}>
                MODUL 2 · LESSON 2
              </span>
              <h2
                className="active-lesson-title"
                id="current-lesson-heading"
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#202020',
                  margin: '4px 0 0 0',
                }}
              >
                Brainstorming Fitur
              </h2>
            </div>

            <button
              type="button"
              className="btn-next-modul"
              id="btn-next-modul"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 50,
                background: 'var(--color-primary, #235F9C)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span>Next Modul</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Tab Bar */}
          <div
            className="classroom-tabs-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderBottom: '1px solid #EAEAEA',
              paddingBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('pane-resources')}
              className={`classroom-tab-btn ${activeTab === 'pane-resources' ? 'active' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 16px',
                fontSize: 14,
                fontWeight: activeTab === 'pane-resources' ? 800 : 600,
                color: activeTab === 'pane-resources' ? 'var(--color-primary, #235F9C)' : '#797979',
                borderBottom: activeTab === 'pane-resources' ? '2px solid var(--color-primary, #235F9C)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Resources
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pane-ringkasan')}
              className={`classroom-tab-btn ${activeTab === 'pane-ringkasan' ? 'active' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 16px',
                fontSize: 14,
                fontWeight: activeTab === 'pane-ringkasan' ? 800 : 600,
                color: activeTab === 'pane-ringkasan' ? 'var(--color-primary, #235F9C)' : '#797979',
                borderBottom: activeTab === 'pane-ringkasan' ? '2px solid var(--color-primary, #235F9C)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Ringkasan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pane-review')}
              className={`classroom-tab-btn ${activeTab === 'pane-review' ? 'active' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 16px',
                fontSize: 14,
                fontWeight: activeTab === 'pane-review' ? 800 : 600,
                color: activeTab === 'pane-review' ? 'var(--color-primary, #235F9C)' : '#797979',
                borderBottom: activeTab === 'pane-review' ? '2px solid var(--color-primary, #235F9C)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Review
            </button>
          </div>

          {/* TAB CONTENT PANES */}

          {/* Pane 1: Resources */}
          {activeTab === 'pane-resources' && (
            <div className="classroom-pane active" id="pane-resources" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#202020', margin: '0 0 6px 0' }}>
                  Downloadable Assets &amp; Community
                </h3>
                <p style={{ fontSize: 13.5, color: '#797979', margin: 0 }}>
                  Gunakan aset resmi dan bergabunglah dalam diskusi santri &amp; mentor untuk memvalidasi ide desainmu.
                </p>
              </div>

              <div
                className="downloadable-assets-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 16,
                  marginTop: 6,
                }}
              >
                {/* Asset 1: Figma UI Kit File */}
                <a
                  href="/dashboard-assets/ui_kit_cover_asset.jpg"
                  download="UI Kit Asset.fig"
                  className="resource-download-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 14,
                    border: '1px solid #EAEAEA',
                    background: '#FAFBFD',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div className="resource-left-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      className="resource-icon-box"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        overflow: 'hidden',
                        background: '#EAEAEA',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src="/dashboard-assets/ui_kit_cover_asset.jpg"
                        alt="UI Kit Asset Cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div className="resource-title" style={{ fontSize: 14, fontWeight: 700, color: '#202020' }}>
                        UI Kit Asset.fig
                      </div>
                      <div className="resource-subtitle" style={{ fontSize: 12, color: '#797979', marginTop: 2 }}>
                        12.4 MB • Figma Design Package
                      </div>
                    </div>
                  </div>
                  <div className="resource-arrow-icon" style={{ color: 'var(--color-primary, #235F9C)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                </a>

                {/* Asset 2: WhatsApp Community Group */}
                <a
                  href="https://chat.whatsapp.com/demo-crygle-sanctuary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-download-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 14,
                    border: '1px solid #EAEAEA',
                    background: '#FAFBFD',
                    textDecoration: 'none',
                  }}
                >
                  <div className="resource-left-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      className="resource-icon-box"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: '#E8F8EE',
                        color: '#25D366',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.051-.376-.025-.527-.076-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.577-.01c-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.513 0 1.482 1.079 2.913 1.23 3.114.15.2 2.124 3.243 5.145 4.548.719.31 1.28.496 1.718.635.722.23 1.378.198 1.898.12.58-.088 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.429-.075-.125-.276-.2-.577-.35z" />
                      </svg>
                    </div>
                    <div>
                      <div className="resource-title" style={{ fontSize: 14, fontWeight: 700, color: '#202020' }}>
                        Group Community
                      </div>
                      <div className="resource-subtitle" style={{ fontSize: 12, color: '#797979', marginTop: 2 }}>
                        WhatsApp Group Siswa &amp; Mentor
                      </div>
                    </div>
                  </div>
                  <div className="resource-arrow-icon" style={{ color: '#797979' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </a>

                {/* Asset 3: Design Cheatsheet */}
                <a
                  href="#cheatsheet"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Cheatsheet Design System berhasil disiapkan!');
                  }}
                  className="resource-download-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 14,
                    border: '1px solid #EAEAEA',
                    background: '#FAFBFD',
                    textDecoration: 'none',
                  }}
                >
                  <div className="resource-left-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      className="resource-icon-box"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: '#F1F6FC',
                        color: 'var(--color-primary, #235F9C)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div className="resource-title" style={{ fontSize: 14, fontWeight: 700, color: '#202020' }}>
                        Cheatsheet Design System.pdf
                      </div>
                      <div className="resource-subtitle" style={{ fontSize: 12, color: '#797979', marginTop: 2 }}>
                        2.1 MB • Token, Color &amp; Typography
                      </div>
                    </div>
                  </div>
                  <div className="resource-arrow-icon" style={{ color: 'var(--color-primary, #235F9C)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Pane 2: Ringkasan */}
          {activeTab === 'pane-ringkasan' && (
            <div className="classroom-pane" id="pane-ringkasan" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#202020', margin: 0 }}>
                Rangkuman Inti Modul: Brainstorming Fitur
              </h3>

              <div style={{ background: '#F1F6FC', padding: 22, borderRadius: 16 }}>
                <h4 style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--color-primary, #235F9C)', margin: '0 0 10px 0' }}>
                  Key Takeaways:
                </h4>
                <ul style={{ paddingLeft: 20, fontSize: 13.5, color: '#434654', lineHeight: 1.8, margin: 0 }}>
                  <li>
                    <strong>Prinsip Kebutuhan Pasar:</strong> UI Kit yang laris adalah yang menyelesaikan masalah alur kerja tim (misalnya: Dashboard Analytics, E-Commerce, Mobile Banking).
                  </li>
                  <li>
                    <strong>Atomic Design System:</strong> Pisahkan komponen menjadi Atoms (button, icon, input), Molecules (searchbar, card), dan Organisms (navbar, header).
                  </li>
                  <li>
                    <strong>Standardisasi Varian Figma:</strong> Gunakan Boolean, Text properties, dan Instance swap untuk mengurangi kompleksitas komponen.
                  </li>
                  <li>
                    <strong>Checklist Ekspor:</strong> Pastikan seluruh color tokens telah menggunakan variable lokal agar pembeli dapat melakukan re-theming dalam 1 klik.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Pane 3: Review */}
          {activeTab === 'pane-review' && (
            <div className="classroom-pane" id="pane-review" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#202020', margin: 0 }}>
                Diskusi &amp; Ulasan Lesson
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: '#FAFBFD', border: '1px solid #EAEAEA', padding: 18, borderRadius: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 13.5, color: '#202020' }}>
                      Farhan Maulana (SMK N 2 Pekanbaru)
                    </span>
                    <span style={{ color: '#FCC112', fontSize: 13 }}>★★★★★</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#5A6062', lineHeight: 1.6, margin: 0 }}>
                    Penjelasan tentang riset pasar sebelum membuat komponen sangat membuka wawasan. Aset file .fig-nya sangat rapi!
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <textarea
                  placeholder="Tuliskan pertanyaan atau ulasan tentang video modul ini..."
                  rows={3}
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 14,
                    borderRadius: 14,
                    border: '1.5px solid #E0E0E0',
                    fontSize: 13.5,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      padding: '10px 24px',
                      borderRadius: 50,
                      background: 'var(--color-primary, #235F9C)',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    Kirim Ulasan
                  </button>
                  {reviewFeedback && (
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#269C45' }}>{reviewFeedback}</span>
                  )}
                </div>
              </form>
            </div>
          )}
        </section>
      </main>

      {/* 3. MENTOR CHAT MODAL */}
      <MentorChatModal isOpen={isMentorChatOpen} onClose={() => setIsMentorChatOpen(false)} />
    </div>
  );
}
