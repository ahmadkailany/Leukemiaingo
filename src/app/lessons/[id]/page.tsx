import LessonQuizClient from './LessonQuizClient';

export default function LessonPage({ params }: { params: { id: string } }) {
  return <LessonQuizClient lessonId={params.id} />;
}
