// app/components/PWAInstaller.tsx
'use client';

import { useEffect, useState } from 'react';
import InstallPromptButton from './install-prompt-button.jsx'; // Your custom ShadCN button

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('SW registered', reg))
        .catch((err) => console.error('SW registration failed:', err));
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosModal(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('User response to install prompt:', outcome);
      setDeferredPrompt(null);
    } else {
      alert('App already installed or not supported.');
    }
  };

  return (
    <>
      <InstallPromptButton onClick={handleInstallClick} />
      {showIosModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">Add to Home Screen</h2>
            <p className="mb-4">
              To install this app on your iOS device, tap the share icon <strong>Safari → Share → Add to Home Screen</strong>.
            </p>
            <button
              onClick={() => setShowIosModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
