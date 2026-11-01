"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { createProject, type ActionState } from "@/app/tableau-de-bord/actions";

export function NewProjectForm() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<ActionState, FormData>(createProject, {});
  const ref = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  // Ferme le formulaire après une création réussie.
  useEffect(() => {
    if (wasPending.current && !pending && !state.error) { ref.current?.reset(); setOpen(false); }
    wasPending.current = pending;
  }, [pending, state.error]);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-ember-2">
        + Nouveau jeu
      </button>
    );
  }

  return (
    <form ref={ref} action={action} className="rise w-full space-y-3 rounded-2xl border border-ember/40 bg-ink-2 p-5">
      <input name="name" required maxLength={60} autoFocus placeholder="Nom du jeu (ex. Simulateur de bûcheron)"
        className="w-full rounded-xl border border-line bg-ink px-4 py-3 outline-none focus:border-ember" />
      <textarea name="description" maxLength={300} rows={2} placeholder="Ton idée en une phrase (facultatif)"
        className="w-full resize-none rounded-xl border border-line bg-ink px-4 py-3 outline-none focus:border-ember" />
      {state.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
      <div className="flex gap-2">
        <button disabled={pending} className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ember-2 disabled:opacity-60">
          {pending ? "Création…" : "Créer"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-ember/60">
          Annuler
        </button>
      </div>
    </form>
  );
}
