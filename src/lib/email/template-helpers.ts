import { escapeHtml } from "@/lib/escape-html";

/** Shared by every transactional email template (contact, Impact Build, ...) so the plain inline-styled HTML stays visually consistent without a templating dependency. */
export function row(label: string, value: string): string {
  return `<tr><td style="padding:4px 12px 4px 0;color:#6b7580;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#14171a;font-size:13px;">${escapeHtml(value) || "—"}</td></tr>`;
}

export function wrap(title: string, bodyHtml: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
    <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#0f766e;margin:0 0 12px;">Kipeo Digital</p>
    <h1 style="font-size:20px;margin:0 0 16px;color:#14171a;">${escapeHtml(title)}</h1>
    ${bodyHtml}
  </div>`;
}
