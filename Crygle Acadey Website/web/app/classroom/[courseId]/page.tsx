import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function ClassroomPage({ params }: { params: { courseId: string } }) {
  return <SectionHeading title="Play Kelas" supporting={`Course: ${params.courseId}`} />;
}
