import LessonQuizClient from './LessonQuizClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  return <LessonQuizClient lessonId={id} />;
}
