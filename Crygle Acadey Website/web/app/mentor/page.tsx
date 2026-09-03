import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { MentorCard } from '@/components/mentor/MentorCard.jsx';
import { mentors } from '@/data/mentors';

export default function MentorPage() {
  const directoryMentors = mentors.filter((m) => m.slug !== 'dimas-pradipa-abiyuda');

  return (
    <section style={{ padding: '60px var(--gutter)' }}>
      <SectionHeading
        title="Para Mentor Praktisi Industri"
        supporting="Belajar langsung dari praktisi yang aktif berkarya di studio 3D, agency desain global, dan tech startup. Dapatkan bimbingan 1-on-1, code review, dan kurasi karir."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginTop: 48 }}>
        {directoryMentors.map((mentor) => (
          <MentorCard key={mentor.slug} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}
