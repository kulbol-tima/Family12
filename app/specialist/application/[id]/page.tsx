import ApplicationReview from '@/components/specialist/ApplicationReview';

export async function generateStaticParams() {
  return [
    { id: 'APP-2025-001' },
    { id: 'APP-2025-002' },
    { id: 'APP-2025-003' },
  ];
}

export default function ApplicationReviewPage({ params }: PageProps) {
  return <ApplicationReview applicationId={params.id as string} />;
}