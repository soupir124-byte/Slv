"use client";
import { useEffect, useState } from "react";

// Démonstration animée de l'interface du studio (clairement indiquée comme démo sur la page).
const STEPS = [
  { log: "Analyse de la demande…", file: null },
  { log: "+ Workspace/Foret (24 arbres)", file: "Workspace/Foret" },
  { log: "+ ServerScriptService/TreeService.server.luau", file: "ServerScriptService/TreeService" },
  { log: "+ ReplicatedStorage/Remotes/SellWood", file: "ReplicatedStorage/Remotes" },
  { log: "+ StarterGui/ShopGui", file: "StarterGui/ShopGui" },
  { log: "✓ 5 éléments envoyés au plugin Roblox Studio", file: null },
];

const TREE = ["Workspace/Foret", "ReplicatedStorage/Remotes", "ServerScriptService/TreeService", "StarterGui/ShopGui", "StarterPlayer"];

const CODE = `local Players = game:GetService("Players")

local function onTreeHit(player, tree)
  local stats = player:FindFirstChild("leaderstats")
  stats.Bois.Value += tree:GetAttribute("Rendement")
  tree:Destroy()
end`;

export function StudioDemo() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v + 1) % (STEPS.length + 3)), 1100);
    return () => clearInterval(t);
  }, []);
  const done = STEPS.slice(0, Math.min(n, STEPS.length));
  const created = new Set(done.map((s) => s.file).filter(Boolean));

  return (
    <div className="glow overflow-hidden rounded-2xl border border-line bg-ink-2 text-left text-sm">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#3a3a44]" />
        <span className="h-3 w-3 rounded-full bg-[#3a3a44]" />
        <span className="h-3 w-3 rounded-full bg-[#3a3a44]" />
        <span className="ml-3 text-xs text-mist">Studio — Simulateur de bûcheron</span>
      </div>
      <div className="grid md:grid-cols-[180px_1fr_260px]">
        <aside className="hidden border-r border-line p-3 md:block">
          <p className="mb-2 text-[11px] uppercase tracking-wider text-mist">Explorateur</p>
          {TREE.map((f) => (
            <div key={f} className={`truncate rounded px-2 py-1 font-mono text-xs transition-colors ${created.has(f) ? "bg-ember/10 text-ember-2" : "text-fog"}`}>
              {f.split("/").pop()}
            </div>
          ))}
        </aside>
        <div className="border-b border-line p-4 md:border-b-0">
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-fog"><code>{CODE}</code></pre>
          <div className="mt-4 rounded-lg bg-ink p-3 font-mono text-xs">
            {done.length === 0 && <span className="caret text-mist" />}
            {done.map((s, i) => (
              <div key={i} className={s.log.startsWith("✓") ? "text-green-400" : "text-fog"}>{s.log}</div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-line p-3 md:border-l">
          <div className="ml-6 rounded-xl rounded-tr-sm bg-ember px-3 py-2 text-xs text-ink">
            Crée un jeu où on coupe des arbres, vend le bois et améliore sa hache.
          </div>
          <div className="mr-6 rounded-xl rounded-tl-sm bg-ink-3 px-3 py-2 text-xs text-fog">
            {n >= STEPS.length ? "C'est prêt ! Ouvre Roblox Studio et appuie sur Play pour tester." : "Je construis la forêt, l'économie et la boutique…"}
          </div>
        </div>
      </div>
    </div>
  );
}
