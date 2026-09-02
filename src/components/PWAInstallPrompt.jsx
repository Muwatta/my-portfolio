import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

/**
 * PWA Install Prompt Component
 * Shows install prompt on Android and some desktop browsers
 * Automatically dismisses after 8 seconds or when closed
 */
export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);

      // Auto-dismiss after 8 seconds
      setTimeout(() => setShowPrompt(false), 8000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log("✓ App installed as PWA");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-xl p-4 flex items-center justify-between gap-4 z-40 animate-slideUp">
      <div className="flex items-center gap-3">
        <FaDownload className="text-lg" />
        <div>
          <p className="text-sm font-bold">Install App</p>
          <p className="text-xs opacity-90">Fast access offline</p>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={handleDismiss}
          className="text-xs px-3 py-1 rounded hover:bg-blue-700 transition-colors"
        >
          Dismiss
        </button>
        <button
          onClick={handleInstall}
          className="text-xs px-3 py-1 bg-white text-blue-600 rounded font-bold hover:bg-gray-100 transition-colors"
        >
          Install
        </button>
      </div>
    </div>
  );
}

export default PWAInstallPrompt;
