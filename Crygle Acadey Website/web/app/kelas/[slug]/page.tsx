import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
  return <SectionHeading title="Course Details" supporting={`Slug: ${params.slug}`} />;
}
