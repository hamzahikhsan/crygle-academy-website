'use client';

import React, { useState } from 'react';

export function ModulesSidebar({ onOpenMentorChat }) {
  const [openModuleId, setOpenModuleId] = useState('modul-2');

  const modules = [
    {
      id: 'modul-1',
      title: 'MODUL 1: Perkenalan',
      lessons: [
        { title: 'Pengenalan Ekosistem UI Kit', time: '08:30', status: 'done' },
        { title: 'Peluang Jual Desain di UI8', time: '11:15', status: 'done' },
      ],
    },
    {
      id: 'modul-2',
      title: 'MODUL 2: Research Pasar',
      lessons: [
        { title: 'Meriset pasar produk', time: '12:45', status: 'done' },
        { title: 'Brainstorming Fitur', time: '20:05', status: 'active' },
      ],
    },
    {
      id: 'modul-3',
      title: 'MODUL 3: UI Design Practice',
      lessons: [
        { title: 'Menyusun Design System', time: '24:10', status: 'locked' },
        { title: 'Auto Layout & Varian', time: '18:40', status: 'locked' },
      ],
    },
    {
      id: 'modul-4',
      title: 'MODUL 4: Monetization',
      lessons: [
        { title: 'Packaging File .fig', time: '15:20', status: 'locked' },
        { title: 'Pendaftaran Author UI8', time: '14:50', status: 'locked' },
      ],
    },
  ];

  function toggleModule(id) {
    setOpenModuleId((prev) => (prev === id ? null : id));
  }

  return (
    <aside
      className="classroom-sidebar-card"
      style={{
        background: '#ffffff',
        border: '1px solid #E9E9E9',
        borderRadius: 20,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Course Summary */}
      <div className="classroom-course-summary" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h2
          className="classroom-course-title"
          id="classroom-course-title"
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#202020',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit
        </h2>
        <div
          className="dashboard-progress-track"
          style={{
            width: '100%',
            height: 6,
            background: '#EAEAEA',
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <div
            className="dashboard-progress-fill progress-green"
            id="classroom-progress-fill"
            style={{ width: '60%', height: '100%', background: '#31BC53', borderRadius: 20 }}
          />
        </div>
        <div
          className="dashboard-card-meta-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            fontWeight: 700,
            color: '#797979',
          }}
        >
          <span id="classroom-progress-modul">5/8 Modul</span>
          <span style={{ color: '#31BC53' }} id="classroom-progress-percent">
            60%
          </span>
        </div>
      </div>

      {/* Modules Accordion */}
      <div className="classroom-modules-accordion" id="classroom-modules-accordion" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {modules.map((mod) => {
          const isOpen = openModuleId === mod.id;
          return (
            <div
              key={mod.id}
              className={`classroom-modul-block ${isOpen ? 'open' : ''}`}
              id={mod.id}
              style={{
                border: '1px solid #EAEAEA',
                borderRadius: 14,
                overflow: 'hidden',
                background: '#FAFBFD',
              }}
            >
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="classroom-modul-header"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  background: '#FAFBFD',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span className="classroom-modul-name" style={{ fontSize: 13, fontWeight: 800, color: '#202020' }}>
                  {mod.title}
                </span>
                <span className="classroom-modul-toggle-icon" style={{ fontSize: 12, color: '#797979' }}>
                  {isOpen ? '▴' : '▾'}
                </span>
              </button>

              {isOpen && (
                <div className="classroom-lessons-panel" style={{ background: '#ffffff', padding: '6px 0', borderTop: '1px solid #EAEAEA' }}>
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.status === 'active';
                    const isDone = lesson.status === 'done';

                    return (
                      <div
                        key={lesson.title}
                        className={`classroom-lesson-row ${isActive ? 'active' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 16px',
                          background: isActive ? '#F1F6FC' : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <div className="classroom-lesson-left" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {isDone ? (
                            <svg className="lesson-status-icon done" width="18" height="18" viewBox="0 0 24 24" fill="#31BC53">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          ) : isActive ? (
                            <svg className="lesson-status-icon active" width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary, #235F9C)">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          ) : (
                            <svg className="lesson-status-icon" width="18" height="18" viewBox="0 0 24 24" fill="#C4D5E8">
                              <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                          )}
                          <span
                            className="lesson-title-text"
                            style={{
                              fontSize: 13,
                              fontWeight: isActive ? 700 : 500,
                              color: isActive ? 'var(--color-primary, #235F9C)' : '#202020',
                            }}
                          >
                            {lesson.title}
                          </span>
                        </div>
                        <span
                          className="lesson-duration-badge"
                          style={{
                            fontSize: 12,
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? 'var(--color-primary, #235F9C)' : '#797979',
                          }}
                        >
                          {lesson.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mentor Profile Card */}
      <div
        className="classroom-mentor-card"
        style={{
          background: '#F9FAFC',
          borderRadius: 16,
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          border: '1px solid #EAEAEA',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="Dimas Pradipa Abiyuda"
            className="mentor-avatar-medium"
            id="classroom-mentor-avatar"
            style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div className="classroom-mentor-name" id="classroom-mentor-name" style={{ fontSize: 13.5, fontWeight: 800, color: '#202020' }}>
              Dimas Pradipa Abiyuda
            </div>
            <div className="classroom-mentor-role" id="classroom-mentor-role" style={{ fontSize: 11.5, color: '#797979' }}>
              Founder &amp; CEO Crygle Academy
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn-chat-mentor"
          id="btn-chat-mentor"
          onClick={onOpenMentorChat}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 50,
            background: 'var(--color-primary, #235F9C)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Chat Mentor Terkait</span>
        </button>
      </div>
    </aside>
  );
}
