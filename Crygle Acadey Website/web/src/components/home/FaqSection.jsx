'use client';

import React from 'react';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { AccordionsContent } from '@/components/disclosure/AccordionsContent.jsx';
import { faqItems } from '@/data/faq';

export function FaqSection() {
  const left = faqItems.slice(0, 4);
  const right = faqItems.slice(4, 8);

  return (
    <section id="faq-section" style={{ padding: '100px var(--gutter)' }}>
      <SectionHeading
        title="Frequently Asked Questions"
        supporting="Pertanyaan yang sering diajukan seputar kelas, kurikulum, dan sistem belajar di Crygle Academy."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginTop: 48 }}>
        <AccordionsContent items={left} defaultOpenIndex={0} />
        <AccordionsContent items={right} defaultOpenIndex={-1} />
      </div>
    </section>
  );
}
