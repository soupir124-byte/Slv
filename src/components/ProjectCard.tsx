"use client";
import { useState } from "react";
import { deleteProject, duplicateProject, renameProject } from "@/app/tableau-de-bord/actions";
import { timeAgo, type Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const [renaming, setRenaming] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-line bg-ink-2 p-5 transition-colors hover:border-ember/50">
      <div className="mb-4 h-24 rounded-xl bg-gradient-to-br from-ember/25 via-ink-3 to-ink-3" />

      {renaming ? (
        <form action={async (f) => { await renameProject(f); setRenaming(false); }} className="flex gap-2">
          <input type="hidden" name="id" value={project.id} />
          <input name="name" defaultValue={project.name} maxLength={60} autoFocus required
            className="min-w-0 flex-1 rounded-lg border border-line bg-ink px-3 py-1.5 text-sm outline-none focus:border-ember" />
          <button className="rounded-lg bg-ember px-3 text-sm font-semibold text-ink">OK</button>
        </form>
      ) : (
        <h3 className="truncate font-semibold">{project.name}</h3>
      )}
      {project.description && <p className="mt-1 line-clamp-2 text-sm text-fog">{project.description}</p>}
      <p className="mt-3 text-xs text-mist">Modifié {timeAgo(project.updated_at)}</p>

      <div className="mt-4 flex items-center gap-2">
        <span className="flex-1 rounded-full border border-line px-4 py-2 text-center text-xs text-mist">Studio : étape 5</span>
        <button onClick={() => setMenu((v) => !v)} aria-label="Options du projet"
          className="rounded-full border border-line px-3 py-2 text-sm hover:border-ember/60">⋯</button>
      </div>

      {menu && (
        <div className="absolute bottom-16 right-5 z-10 w-44 overflow-hidden rounded-xl border border-line bg-ink-3 text-sm shadow-xl">
          <button onClick={() => { setRenaming(true); setMenu(false); }} className="block w-full px-4 py-2.5 text-left hover:bg-ink-2">Renommer</button>
          <form action={async (f) => { await duplicateProject(f); setMenu(false); }}>
            <input type="hidden" name="id" value={project.id} />
            <button className="block w-full px-4 py-2.5 text-left hover:bg-ink-2">Dupliquer</button>
          </form>
          <form action={deleteProject} onSubmit={(e) => { if (!confirm(`Supprimer « ${project.name} » ? C'est définitif.`)) e.preventDefault(); }}>
            <input type="hidden" name="id" value={project.id} />
            <button className="block w-full px-4 py-2.5 text-left text-red-400 hover:bg-ink-2">Supprimer</button>
          </form>
        </div>
      )}
    </div>
  );
}
