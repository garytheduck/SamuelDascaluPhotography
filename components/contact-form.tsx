"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type FormState = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPES = [
  "Wedding",
  "Portrait session",
  "Event",
  "Commercial / brand",
  "Travel / editorial",
  "Other",
];

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please email me directly.");
      }
      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-[color:var(--ink)] p-10 md:p-14">
        <p className="eyebrow text-[color:var(--accent)] mb-4">Message sent</p>
        <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4">
          Thank you.
        </h3>
        <p className="text-[color:var(--muted)] leading-relaxed">
          I&apos;ve received your message and will reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />

      <div>
        <label className="eyebrow text-[color:var(--muted)] block mb-3">
          Project type
        </label>
        <select
          name="projectType"
          required
          defaultValue=""
          className="w-full bg-transparent border-b border-[color:var(--line)] py-3 text-base focus:outline-none focus:border-[color:var(--ink)] transition-colors"
        >
          <option value="" disabled>
            Select a type
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <Field label="Approximate date" name="date" placeholder="e.g. Sept 2026, or flexible" />
      <Field label="Location" name="location" placeholder="City / venue / remote" />

      <div>
        <label className="eyebrow text-[color:var(--muted)] block mb-3">
          Tell me about it
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full bg-transparent border-b border-[color:var(--line)] py-3 text-base focus:outline-none focus:border-[color:var(--ink)] transition-colors resize-none"
          placeholder="A few sentences about the project, vibe, guests, or anything that inspires you."
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="pt-4">
        <button
          type="submit"
          disabled={state === "submitting"}
          className={cn(
            "group inline-flex items-center gap-3 font-display text-xl md:text-2xl border-b pb-1 transition-colors",
            state === "submitting"
              ? "border-[color:var(--line)] text-[color:var(--muted)] cursor-wait"
              : "border-[color:var(--ink)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]"
          )}
        >
          {state === "submitting" ? "Sending..." : "Send message"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>

        {state === "error" && (
          <p className="mt-6 text-sm text-red-600">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="eyebrow text-[color:var(--muted)] block mb-3">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[color:var(--line)] py-3 text-base focus:outline-none focus:border-[color:var(--ink)] transition-colors"
      />
    </div>
  );
}
