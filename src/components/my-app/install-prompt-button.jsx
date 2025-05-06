'use client';

import { Button } from '@/components/ui/button';

export default function InstallPromptButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-emerald-600 text-white rounded-2xl shadow-xl px-6 py-3"
    >
      Add to Home Screen
    </Button>
  );
}
