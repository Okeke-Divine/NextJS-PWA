'use client';

import { Button } from '@/components/ui/button';

export default function InstallPromptButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
    >
      Add to Home Screen
    </Button>
  );
}
