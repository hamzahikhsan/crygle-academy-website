'use client';

import React from 'react';
import { AccordionFAQItems } from './AccordionFAQItems.jsx';
import { AccordionsAnswer } from './AccordionsAnswer.jsx';

/** A full FAQ list: question bars with at most one answer panel open. */
export function AccordionsContent({ items = [], openIndex, defaultOpenIndex = 0, onOpenChange, gap = 24, style, ...rest }) {
  const [internal, setInternal] = React.useState(defaultOpenIndex);
  const current = openIndex === undefined ? internal : openIndex;
  const set = (i) => {
    const next = current === i ? -1 : i;
    if (openIndex === undefined) setInternal(next);
    if (onOpenChange) onOpenChange(next);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, alignItems: 'stretch', ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
          <AccordionFAQItems question={it.question} expanded={current === i} onToggle={() => set(i)} />
          {current === i && <AccordionsAnswer>{it.answer}</AccordionsAnswer>}
        </div>
      ))}
    </div>
  );
}
