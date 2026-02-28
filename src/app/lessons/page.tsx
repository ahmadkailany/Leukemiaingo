import { Suspense } from 'react';
import LessonsClient from './LessonsClient';

export default function LessonsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-96"><div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" /></div>}>
      <LessonsClient />
    </Suspense>
  );
}
