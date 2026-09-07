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

/**
 * Enregistrer d'abord, notifier ensuite.
 *
 * L'email est une notification, pas un support de stockage : s'il échoue, le
 * lead ne doit pas disparaître. Quand LEAD_WEBHOOK_URL est renseigné (un
 * Google Sheet via Apps Script suffit), le lead y est écrit AVANT toute
 * tentative d'envoi. La route dit ensuite honnêtement au client ce qui a
 * réussi, pour qu'il puisse proposer un repli plutôt que de faire semblant.
 */
async function storeLead(payload: unknown): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return true;
  } catch (err) {
    console.error("[lead] écriture webhook échouée", err);
    return false;
  }
}

async function notify(
  lead: LeadPayload,
  answers: AnswersPayload,
  result: ResultPayload,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.error("[lead] RESEND_API_KEY ou LEAD_NOTIFICATION_EMAIL manquant");
    return false;
  }
  const resend = new Resend(apiKey);
  const payload = {
    from: process.env.LEAD_FROM_EMAIL ?? "NeX Diagnostic <onboarding@resend.dev>",
    to,
    replyTo: lead.email,
    subject: `Nouveau lead diagnostic — ${lead.company}`,
    html: renderEmail(lead, answers, result),
  };

  // Une seule reprise : la plupart des échecs Resend sont transitoires.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const { error } = await resend.emails.send(payload);
      if (!error) return true;
      console.error(`[lead] Resend a refusé (tentative ${attempt})`, error);
    } catch (err) {
      console.error(`[lead] envoi impossible (tentative ${attempt})`, err);
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, 600));
  }
  return false;
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

  const stored = await storeLead({ receivedAt: new Date().toISOString(), lead, answers, result });
  const notified = await notify(lead, answers, result);

  if (!stored && !notified) {
    // Dernier recours : la trace serveur, pour pouvoir rattraper à la main.
    console.error("[lead] PERDU — ni enregistré ni notifié", JSON.stringify({ lead, answers, result }));
    return Response.json({ ok: false, stored, notified }, { status: 502 });
  }
  return Response.json({ ok: true, stored, notified });
}
