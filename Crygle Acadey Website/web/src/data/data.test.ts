import { describe, expect, it } from 'vitest';
import { courses } from './courses';
import { mentors } from './mentors';
import { testimonials } from './testimonials';
import { faqItems } from './faq';
import { alumniWork } from './alumniWork';
import { programs } from './programs';

describe('shared data layer', () => {
  it('has 6 popular courses with the flagship UI/UX course priced correctly', () => {
    expect(courses).toHaveLength(6);
    const flagship = courses.find((c) => c.slug === 'ui-ux-menjual-produk-ui-kit');
    expect(flagship?.price).toBe('Rp. 449.000');
    expect(flagship?.originalPrice).toBe('Rp. 899.000');
    expect(flagship?.discount).toBe('50% off');
  });

  it('has 7 mentors including founder Dimas Pradipa Abiyuda', () => {
    expect(mentors).toHaveLength(7);
    const dimas = mentors.find((m) => m.slug === 'dimas-pradipa-abiyuda');
    expect(dimas?.role).toBe('Founder & CEO Crygle Academy');
  });

  it('has 1 testimonial from Andi Hidayat', () => {
    expect(testimonials).toHaveLength(1);
    expect(testimonials[0].name).toBe('Andi Hidayat');
  });

  it('has 8 FAQ items, first one about who can join', () => {
    expect(faqItems).toHaveLength(8);
    expect(faqItems[0].question).toBe('Siapa saja yang bisa ikut kelas di CRYGLE Academy?');
  });

  it('has 6 alumni work items', () => {
    expect(alumniWork).toHaveLength(6);
  });

  it('has 4 program cards with Kreatif Design active by default', () => {
    expect(programs).toHaveLength(4);
    expect(programs.find((p) => p.id === 'design')?.active).toBe(true);
  });
});
