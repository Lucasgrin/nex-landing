import { Resend } from "resend";

interface LeadPayload {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
}

interface ResultPayload {
  score: number;
  hoursLost: number;
  annualSavings: number;
  automatizable: number;
  maturity: string;
  frictions: string[];
}

interface AnswersPayload {
  employees: string;
  sector: string;
  clients: string;
  digitalUsers: string;
  tools: string[];
  toolsCost: string;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]!));
}

function renderEmail(lead: LeadPayload, answers: AnswersPayload, result: ResultPayload) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#737373;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:4px 0;font-weight:600;color:#0a0a0a">${escapeHtml(value)}</td></tr>`;

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0a0a0a">
      <h2 style="margin-bottom:4px">Nouveau lead — Diagnostic NeX</h2>
      <p style="color:#737373;margin-top:0">${escapeHtml(lead.company)}</p>

      <h3>Contact</h3>
      <table cellpadding="0" cellspacing="0">
        ${row("Nom", lead.name)}
        ${row("Entreprise", lead.company)}
        ${row("Fonction", lead.role || "—")}
        ${row("Email", lead.email)}
        ${row("Téléphone", lead.phone || "—")}
      </table>

      <h3>Résultat du diagnostic</h3>
      <table cellpadding="0" cellspacing="0">
        ${row("Score", `${result.score}/100 (${result.maturity})`)}
        ${row("Heures perdues / semaine", `${result.hoursLost}h`)}
        ${row("Économie annuelle estimée", `CHF ${result.annualSavings.toLocaleString("fr-CH")}`)}
        ${row("Processus automatisables", String(result.automatizable))}
      </table>

      <h3>Frictions prioritaires</h3>
      <ul>${result.frictions.map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>

      <h3>Contexte entreprise</h3>
      <table cellpadding="0" cellspacing="0">
        ${row("Collaborateurs", answers.employees)}
        ${row("Secteur", answers.sector)}
        ${row("Clients actifs", answers.clients)}
        ${row("Utilisateurs numériques", answers.digitalUsers)}
        ${row("Outils utilisés", answers.tools.join(", ") || "—")}
        ${row("Coût mensuel des outils actuels", answers.toolsCost || "—")}
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const lead: LeadPayload | undefined = body?.lead;
  const answers: AnswersPayload | undefined = body?.answers;
  const result: ResultPayload | undefined = body?.result;

  if (!lead?.name?.trim() || !lead?.company?.trim() || !lead?.email?.includes("@")) {
    return Response.json({ error: "Missing or invalid lead fields" }, { status: 400 });
  }
  if (!answers || !result) {
    return Response.json({ error: "Missing answers or result" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.error("Lead email not sent: RESEND_API_KEY or LEAD_NOTIFICATION_EMAIL missing in env");
    return Response.json({ error: "Email service not configured" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL ?? "NeX Diagnostic <onboarding@resend.dev>",
      to,
      replyTo: lead.email,
      subject: `Nouveau lead diagnostic — ${lead.company}`,
      html: renderEmail(lead, answers, result),
    });
    if (error) {
      console.error("Resend error", error);
      return Response.json({ error: "Failed to send" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Failed to send lead email", err);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}
