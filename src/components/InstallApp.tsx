"use client";
import { useEffect, useState } from "react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Enregistre le service worker et propose un bouton « Installer l'app »
// (Android/ordinateur). Sur iPhone, affiche la marche à suivre.
export function InstallApp() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [installed, setInstalled] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    try { setHidden(localStorage.getItem("embr-install-hidden") === "1"); } catch {}

    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e as BIPEvent); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || hidden || (!deferred && !ios)) return null;

  const close = () => { setHidden(true); try { localStorage.setItem("embr-install-hidden", "1"); } catch {} };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-ember/40 bg-ink-2/95 p-3 shadow-2xl backdrop-blur-xl">
      <img src="/icon-192.png" alt="" className="h-11 w-11 rounded-xl" />
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-semibold">Installer l&apos;app Embr</p>
        <p className="text-xs text-fog">
          {deferred ? "Accès direct depuis ton écran d'accueil." : "Appuie sur Partager, puis « Sur l'écran d'accueil »."}
        </p>
      </div>
      {deferred && (
        <button
          onClick={async () => { await deferred.prompt(); await deferred.userChoice; setDeferred(null); }}
          className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-ink"
        >
          Installer
        </button>
      )}
      <button onClick={close} aria-label="Fermer" className="px-1 text-lg text-mist">×</button>
    </div>
  );
}
