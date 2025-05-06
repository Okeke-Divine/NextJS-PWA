// components/InstallButton.tsx
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';

export default function PWAInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState < BeforeInstallPromptEvent | null > (null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();               // prevent the default prompt
            setDeferredPrompt(e);             // save the event for later
            setVisible(true);                 // show our install button
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();            // show native install prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        setVisible(false);                  // hide button once used
        setDeferredPrompt(null);
    };

    if (!visible) return null;

    return (
        <>
            <Button onClick={handleInstallClick}>
                Install App
            </Button>
        </>
    );
}
