'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GazettePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/updates?tab=gazette');
  }, [router]);
  return (
    <div className="p-10 text-center text-slate-500 text-sm">Redirecting to Gazette Notifications...</div>
  );
}
