'use client';

import React, { useState } from 'react';
import { initialChatThreads } from '@/data/chatThreads';

export function ChatMentorPanel() {
  const [threads, setThreads] = useState(initialChatThreads);
  const [activeThreadId, setActiveThreadId] = useState('dimas');
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  function handleSendMessage(e) {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: inputText.trim(),
      time: 'Baru saja',
    };

    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === activeThread.id) {
          return {
            ...thread,
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );

    setInputText('');
  }

  function handleQuickReply(replyText) {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: replyText,
      time: 'Baru saja',
    };

    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === activeThread.id) {
          return {
            ...thread,
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );
  }

  return (
    <section id="panel-chat" className="dashboard-panel" style={{ display: 'block' }}>
      <div
        className="chat-workspace-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          background: '#ffffff',
          borderRadius: 20,
          border: '1px solid #E9E9E9',
          minHeight: 640,
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Left: Mentor Threads Sidebar */}
        <div
          className="chat-threads-sidebar"
          style={{
            borderRight: '1px solid #EAEAEA',
            display: 'flex',
            flexDirection: 'column',
            background: '#FAFBFD',
          }}
        >
          <div
            className="chat-threads-header"
            style={{
              padding: '20px 20px 16px',
              fontSize: 15,
              fontWeight: 800,
              color: '#202020',
              borderBottom: '1px solid #EAEAEA',
            }}
          >
            Pesan Konsultasi Mentor
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {threads.map((thread) => {
              const isActive = thread.id === activeThread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`chat-thread-row ${isActive ? 'active' : ''}`}
                  data-chat={thread.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 20px',
                    cursor: 'pointer',
                    background: isActive ? '#FFFFFF' : 'transparent',
                    borderLeft: isActive ? '4px solid var(--color-primary, #235F9C)' : '4px solid transparent',
                    borderBottom: '1px solid #F0F0F0',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {thread.isCustomAvatarIcon ? (
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: '#EBF3FA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {thread.avatar}
                    </div>
                  ) : (
                    <img
                      src={thread.avatar}
                      alt={thread.name}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#202020' }}>{thread.name}</span>
                      <span
                        style={{
                          fontSize: 11,
                          color: thread.status === 'Online' ? '#31BC53' : '#A6A6A6',
                          fontWeight: 700,
                        }}
                      >
                        {thread.status}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: '#797979',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: 4,
                      }}
                    >
                      {thread.preview}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Conversation Window */}
        <div
          className="chat-conversation-area"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            background: '#ffffff',
          }}
        >
          {/* Active Mentor Header */}
          <div
            className="chat-active-header"
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #EAEAEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {activeThread.isCustomAvatarIcon ? (
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: '#EBF3FA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  {activeThread.avatar}
                </div>
              ) : (
                <img
                  src={activeThread.avatar}
                  alt={activeThread.name}
                  style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
              <div>
                <div
                  id="chat-active-mentor-name"
                  style={{ fontSize: 15, fontWeight: 800, color: '#202020' }}
                >
                  {activeThread.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: activeThread.status === 'Online' ? '#31BC53' : '#797979',
                    fontWeight: 700,
                  }}
                >
                  ● {activeThread.status} · {activeThread.role}
                </div>
              </div>
            </div>

            <a
              href="https://meet.google.com/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: '8px 18px',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                background: 'var(--color-primary, #235F9C)',
                color: '#ffffff',
              }}
            >
              Sesi Live Meet ↗
            </a>
          </div>

          {/* Chat Messages Scroll Container */}
          <div
            className="chat-messages-container"
            id="chat-messages-container"
            style={{
              flex: 1,
              padding: '24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              background: '#F9FBFE',
            }}
          >
            {activeThread.messages.map((msg) => {
              const isStudent = msg.sender === 'student';
              return (
                <div
                  key={msg.id}
                  className={`chat-msg-row ${msg.sender}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    alignSelf: isStudent ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                  }}
                >
                  {!isStudent &&
                    (activeThread.isCustomAvatarIcon ? (
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: '#EBF3FA',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {activeThread.avatar}
                      </div>
                    ) : (
                      <img
                        src={activeThread.avatar}
                        alt={activeThread.name}
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      />
                    ))}

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: isStudent ? 'flex-end' : 'flex-start' }}>
                    <div
                      className={`chat-bubble ${msg.sender}`}
                      style={{
                        padding: '14px 18px',
                        borderRadius: 16,
                        borderBottomLeftRadius: !isStudent ? 4 : 16,
                        borderBottomRightRadius: isStudent ? 4 : 16,
                        background: isStudent ? 'var(--color-primary, #235F9C)' : '#ffffff',
                        color: isStudent ? '#ffffff' : '#202020',
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                        border: isStudent ? 'none' : '1px solid #EAEAEA',
                      }}
                    >
                      {msg.text}
                      {msg.linkPreview && (
                        <div
                          style={{
                            marginTop: 8,
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '6px 12px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontFamily: 'monospace',
                          }}
                        >
                          {msg.linkPreview}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: '#A6A6A6', marginTop: 4, padding: '0 4px' }}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Suggestion Chips */}
          <div
            className="chat-quick-suggestions"
            style={{
              padding: '10px 24px',
              borderTop: '1px solid #EAEAEA',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              overflowX: 'auto',
              background: '#ffffff',
            }}
          >
            <button
              type="button"
              className="quick-reply-btn"
              onClick={() => handleQuickReply('Siap mas Dimas, terima kasih banyak!')}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid #E0E0E0',
                background: '#F7FAFD',
                fontSize: 12,
                color: '#5A6062',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              "Siap mas, terima kasih!"
            </button>
            <button
              type="button"
              className="quick-reply-btn"
              onClick={() => handleQuickReply('Mas, boleh minta feedback untuk palet warna dark mode saya?')}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid #E0E0E0',
                background: '#F7FAFD',
                fontSize: 12,
                color: '#5A6062',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              "Minta feedback warna dark mode"
            </button>
            <button
              type="button"
              className="quick-reply-btn"
              onClick={() => handleQuickReply('Kira-kira produk ini bisa laku berapa dolar di UI8 mas?')}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid #E0E0E0',
                background: '#F7FAFD',
                fontSize: 12,
                color: '#5A6062',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              "Berapa estimasi harga jual di UI8?"
            </button>
          </div>

          {/* Chat Composer Input */}
          <form
            onSubmit={handleSendMessage}
            className="chat-composer-row"
            id="chat-composer-form"
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #EAEAEA',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#ffffff',
            }}
          >
            <input
              type="text"
              id="chat-input-text"
              className="chat-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan konsultasi atau tempel link Figma..."
              required
              autoComplete="off"
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: 50,
                border: '1.5px solid #E0E0E0',
                fontSize: 13.5,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-send-chat"
              aria-label="Kirim Pesan"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--color-primary, #235F9C)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
