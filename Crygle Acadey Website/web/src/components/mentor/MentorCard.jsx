import React from 'react';

export function MentorCard({ mentor }) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid var(--border-default)',
      }}
    >
      <div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
          <img
            src={mentor.image}
            alt={mentor.name}
            style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h3 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 17, color: 'var(--black)' }}>
              {mentor.name}
            </h3>
            <span style={{ fontFamily: 'var(--font-core)', fontSize: 13, color: 'var(--grey-400)' }}>
              {mentor.role}
            </span>
            <div style={{ display: 'flex', gap: 10, marginTop: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--yellow-500)' }}>⭐ {mentor.rating}</span>
              <span style={{ fontSize: 13, color: 'var(--grey-400)' }}>{mentor.students}</span>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-core)', fontSize: 13.5, color: 'var(--grey-500)', lineHeight: 1.6, marginBottom: 16 }}>
          {mentor.bio}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid var(--border-default)' }}>
        {mentor.skills.map((skill) => (
          <span
            key={skill}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--surface-tint)',
              color: 'var(--blue-500)',
              fontFamily: 'var(--font-core)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
