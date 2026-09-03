'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { programs } from '@/data/programs';

export function ProgramSection() {
  const [activeId, setActiveId] = useState('design');
  const currentProgram = programs.find((p) => p.id === activeId) || programs[1];

  return (
    <section id="program-section" style={{ padding: '60px var(--gutter)' }}>
      <SectionHeading
        title="Rangkaian Program"
        supporting="Pilihan jalur kompetensi digital terstruktur untuk mengasah kreativitas dan keterampilan teknologi santri."
      />
      <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
        {programs.map((program) => {
          const isActive = program.id === activeId;
          return (
            <button
              key={program.id}
              onClick={() => setActiveId(program.id)}
              style={{
                padding: '14px 24px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                background: isActive ? 'var(--blue-500)' : 'var(--surface-tint)',
                color: isActive ? 'var(--white)' : 'var(--black)',
                fontFamily: 'var(--font-core)',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {program.title}
            </button>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 24,
          padding: 32,
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          borderLeft: '4px solid var(--blue-500)',
        }}
      >
        <h3 style={{ fontFamily: 'var(--font-core)', fontSize: 24, fontWeight: 700, color: 'var(--black)', marginBottom: 12 }}>
          {currentProgram.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-core)', fontSize: 16, color: 'var(--grey-500)', lineHeight: 1.6, maxWidth: 640 }}>
          {currentProgram.description}
        </p>
      </div>
    </section>
  );
}
