'use client';

import { useEffect, useState } from 'react';

interface Props {
  points: number;
  show: boolean;
}

export default function PointsAnimation({ points, show }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed top-24 right-6 z-50 animate-bounce">
      <div className="bg-orange-500 text-white font-extrabold text-xl rounded-full px-5 py-3 shadow-lg">
        +{points} XP ⚡
      </div>
    </div>
  );
}
