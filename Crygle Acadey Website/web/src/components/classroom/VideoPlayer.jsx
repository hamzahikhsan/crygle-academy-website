'use client';

import React, { useState } from 'react';

export function VideoPlayer({ poster = '/dashboard-assets/lesson-video-poster.jpg', title = 'Brainstorming Fitur' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(260); // 04:20
  const totalSeconds = 1205; // 20:05

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function handleRewind() {
    setCurrentSeconds((prev) => Math.max(0, prev - 10));
  }

  function handleForward() {
    setCurrentSeconds((prev) => Math.min(totalSeconds, prev + 10));
  }

  const progressPercent = (currentSeconds / totalSeconds) * 100;

  return (
    <div
      className="video-frame-container"
      id="main-video-player"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        background: '#0F172A',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
      }}
    >
      <img
        src={poster}
        alt={`Video Lesson: ${title}`}
        className="video-poster-img"
        id="player-poster"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isPlaying ? 0.85 : 0.95,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Center Big Play Button */}
      <button
        type="button"
        className="video-center-play-btn"
        id="btn-toggle-play"
        aria-label={isPlaying ? 'Jeda Video' : 'Putar Video'}
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(35, 95, 156, 0.9)',
          border: '3px solid #ffffff',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease',
        }}
      >
        {isPlaying ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>

      {/* Simulated Controls Bar */}
      <div
        className="video-controls-overlay"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
          padding: '24px 20px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Timeline bar */}
        <div
          className="video-timeline-bar"
          id="player-timeline"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setCurrentSeconds(Math.floor(clickPos * totalSeconds));
          }}
          style={{
            width: '100%',
            height: 6,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div
            className="video-timeline-fill"
            id="player-timeline-fill"
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'var(--color-primary, #235F9C)',
              borderRadius: 4,
              position: 'relative',
            }}
          >
            <div
              className="video-timeline-thumb"
              style={{
                position: 'absolute',
                right: -6,
                top: -4,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
              }}
            />
          </div>
        </div>

        {/* Controls Row */}
        <div
          className="video-controls-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff',
          }}
        >
          <div className="video-controls-left" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              className="video-ctrl-btn"
              id="ctrl-play-pause"
              aria-label="Play/Pause"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 4 }}
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>

            <button
              type="button"
              className="video-ctrl-btn"
              id="ctrl-rewind"
              aria-label="Rewind 10s"
              onClick={handleRewind}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 4 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6"></path>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
            </button>

            <button
              type="button"
              className="video-ctrl-btn"
              id="ctrl-forward"
              aria-label="Forward 10s"
              onClick={handleForward}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 4 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6"></path>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            </button>

            <div className="video-time-text" id="player-time-display" style={{ fontSize: 13, fontWeight: 600 }}>
              {formatTime(currentSeconds)} / {formatTime(totalSeconds)}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              className="video-ctrl-btn"
              aria-label="Pengaturan Kualitas"
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 4 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            <button
              type="button"
              className="video-ctrl-btn"
              id="ctrl-fullscreen"
              aria-label="Fullscreen"
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 4 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
