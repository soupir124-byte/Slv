"use client";
import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/auth/actions";
import { Logo } from "@/components/Logo";

type Field = { name: string; label: string; type: string; autoComplete: string };

export function AuthForm({
  title, subtitle, fields, submit, action, footer, notice,
}: {
  title: string;
  subtitle?: string;
  fields: Field[];
  submit: string;
  action: (s: AuthState, f: FormData) => Promise<AuthState>;
  footer?: React.ReactNode;
  notice?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <main className="relative grid min-h-screen place-items-center px-4 py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-ember/15 blur-[120px]" />
      <div className="rise relative w-full max-w-md rounded-3xl border border-line bg-ink-2 p-8">
        <Link href="/" className="inline-block"><Logo /></Link>
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-fog">{subtitle}</p>}

        {notice && !state.error && !state.message && (
          <p className="mt-6 rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember-2">{notice}</p>
        )}

        {state.message ? (
          <p className="mt-6 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">{state.message}</p>
        ) : (
          <form action={formAction} className="mt-6 space-y-4">
            {fields.map((f) => (
              <label key={f.name} className="block">
                <span className="mb-1.5 block text-sm text-fog">{f.label}</span>
                <input
                  name={f.name} type={f.type} autoComplete={f.autoComplete} required={f.name !== "pseudo"}
                  minLength={f.type === "password" ? 8 : undefined}
                  className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-white outline-none transition-colors placeholder:text-mist focus:border-ember"
                />
              </label>
            ))}
            {state.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
            <button
              type="submit" disabled={pending}
              className="w-full rounded-full bg-ember py-3 font-semibold text-ink transition-all hover:bg-ember-2 disabled:opacity-60"
            >
              {pending ? "Un instant…" : submit}
            </button>
          </form>
        )}
        {footer && <div className="mt-6 text-center text-sm text-fog">{footer}</div>}
      </div>
    </main>
  );
}
