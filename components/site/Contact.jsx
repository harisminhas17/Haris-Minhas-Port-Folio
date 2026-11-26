"use client";

import { useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export default function Contact({ content }) {
  const { contact } = content;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel>{contact.kicker}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-h1">{contact.title}</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                {contact.intro}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 space-y-5 border-t border-line pt-8">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contact.email}`}
                      className="link-wipe text-sm text-ink"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="link-wipe text-sm text-ink"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    Location
                  </dt>
                  <dd className="mt-1 max-w-xs text-sm text-muted">
                    {contact.location}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {contact.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-wipe label text-muted transition-colors hover:text-ink"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
                {status === "sent" ? (
                  <div className="flex min-h-[360px] flex-col items-start justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-accent">
                      ✓
                    </span>
                    <h3 className="mt-6 font-display text-h3">Message sent.</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                      Thanks for reaching out. I usually reply within one
                      business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-accent link-wipe"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                          Your name
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          className="field-line mt-2"
                        />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                          Email
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          className="field-line mt-2"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                        What are you building
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="A sentence or two about the project."
                        className="field-line mt-2 resize-none"
                      />
                    </label>

                    {status === "error" && (
                      <p
                        role="alert"
                        className="text-sm text-danger"
                      >
                        Something went wrong. Email me directly at{" "}
                        <a href={`mailto:${contact.email}`} className="underline">
                          {contact.email}
                        </a>
                        .
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                        Replies within one business day
                      </p>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-[color:var(--accent-ink)] transition-colors hover:bg-accent-hover disabled:opacity-60"
                      >
                        {status === "loading" ? "Sending…" : "Send message"}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
