import { Resend } from "resend";
import { SITE } from "../../content/site";
import {
  type Answers, type Result,
  calc, isAnswers, resultTitle, frequencyLabel,
  FRICTION_QUESTIONS, FRICTIONS, TIMING, TIMING_TAG, FIELD_TEAMS, TOOLS_INTEGRATED, INFO_ACCESS, PROCESSES_DOC,
  HOURLY_COST, WORK_WEEKS,
} from "../../diagnostic/engine";

interface Lead { name: string; company: string; role: string; email: string; phone: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ── Garde-fous ───────────────────────────────────────────────────────────────

/** Coupe et nettoie un champ libre. Les URL sont retirées : ces champs finissent dans un e-mail envoyé en notre nom. */
function clean(v: unknown, max = 120): string {
  if (typeof v !== "string") return "";
  return v.replace(/https?:\/\/\S+|www\.\S+/gi, "").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Limite par IP, en mémoire. Elle ne survit pas à un redémarrage ni ne se
 * partage entre instances : c'est un frein contre le formulaire rejoué en
 * boucle, pas une protection absolue. Le rapport part à l'adresse saisie —
 * sans frein, le formulaire deviendrait un moyen d'envoyer des e-mails en
 * notre nom à n'importe qui.
 */
const hits = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

const label = (pairs: [string, string][], v: string) => pairs.find(([k]) => k === v)?.[1] ?? (v || "—");
const chf = (n: number) => `CHF ${n.toLocaleString("fr-CH")}`;

// ── E-mail pour NeX ──────────────────────────────────────────────────────────

function renderNotification(lead: Lead, a: Answers, r: Result) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 14px 4px 0;color:#737373;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:4px 0;font-weight:600;color:#0a0a0a">${escapeHtml(v)}</td></tr>`;
  const table = (rows: string) => `<table cellpadding="0" cellspacing="0" style="font-size:14px">${rows}</table>`;
  const h = (t: string) => `<h3 style="margin:24px 0 8px;font-size:15px">${t}</h3>`;

  return `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
      <p style="display:inline-block;margin:0 0 8px;padding:3px 10px;border-radius:99px;background:${a.timing === "soon" ? "#dcfce7" : "#f5f5f5"};font-size:12px;font-weight:700">${escapeHtml(label(TIMING, a.timing))}</p>
      <h2 style="margin:0 0 4px">${escapeHtml(lead.company)} — ${escapeHtml(a.sector)}</h2>
      <p style="color:#737373;margin:0">${escapeHtml(lead.name)}${lead.role ? ` · ${escapeHtml(lead.role)}` : ""}</p>

      ${h("Contact")}
      ${table(row("Email", lead.email) + row("Téléphone", lead.phone || "—"))}

      ${h("Résultat")}
      ${table(
        row("Potentiel de gain", `${r.score}/100 · organisation ${r.maturity.toLowerCase()}`) +
        row("Heures perdues / semaine", `${r.hoursLost} h`) +
        row("Coût annuel estimé", chf(r.annualCost)) +
        row("Frictions", r.frictions.map((f) => `${f.title} (~${f.hours} h)`).join(" · "))
      )}

      ${h("Ce qu'il veut régler")}
      ${table(row("Priorités", a.priorities.join(", ") || "—") + row("Horizon", label(TIMING, a.timing)))}

      ${h("Entreprise")}
      ${table(
        row("Collaborateurs", a.employees) +
        row("Équipes terrain", label(FIELD_TEAMS, a.fieldTeams)) +
        row("Personnes sur l'admin", a.adminPeople) +
        row("Heures répétitives / pers.", a.adminHours) +
        row("Outils", a.tools.join(", ") || "—") +
        row("Outils connectés", label(TOOLS_INTEGRATED, a.toolsIntegrated)) +
        row("Budget logiciels / mois", a.toolsCost || "—") +
        row("Accès à l'info", label(INFO_ACCESS, a.infoAccess)) +
        row("Processus écrits", label(PROCESSES_DOC, a.processesDoc))
      )}

      ${h("Le quotidien")}
      ${table(FRICTION_QUESTIONS.map((q) => row(q.label, frequencyLabel(a[q.key]))).join(""))}

      <p style="margin-top:24px;color:#737373;font-size:12px">Répondre à cet e-mail écrit directement à ${escapeHtml(lead.email)}. Une copie du rapport lui a été envoyée.</p>
    </div>`;
}

// ── E-mail pour le prospect ──────────────────────────────────────────────────

function renderReport(lead: Lead, a: Answers, r: Result) {
  const first = escapeHtml(lead.name.split(" ")[0] || "");
  const company = escapeHtml(lead.company);
  const site = SITE.url;

  const frictions = r.frictions.map((f, i) => `
    <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
      <p style="margin:0;font-weight:600">${i + 1}. ${escapeHtml(f.title)} <span style="color:#737373;font-weight:400">· ~${f.hours} h/sem.</span></p>
      ${FRICTIONS[f.title] ? `<p style="margin:4px 0 0;color:#525252;font-size:14px">${escapeHtml(FRICTIONS[f.title].insight)}</p>` : ""}
    </td></tr>`).join("");

  const recos = r.recommendations.map((rec, i) => `
    <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0">
      <p style="margin:0;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:.08em">Priorité ${i + 1}</p>
      <p style="margin:2px 0 0;font-weight:600">${escapeHtml(rec.title)}</p>
      <p style="margin:4px 0 0;color:#525252;font-size:14px">${escapeHtml(rec.action)}</p>
      ${rec.case ? `<p style="margin:6px 0 0;font-size:13px;color:#525252">Déjà fait pour <a href="${site}/realisations/${rec.case.slug}" style="color:#0a0a0a;font-weight:600">${escapeHtml(rec.case.client)}</a> — ${escapeHtml(rec.case.proof)}</p>` : ""}
    </td></tr>`).join("");

  return `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;color:#0a0a0a;line-height:1.5">
      <p>Bonjour ${first},</p>
      <p>Voici le résultat du diagnostic que vous avez fait pour ${company}.</p>

      <h2 style="margin:28px 0 4px;font-size:20px">${escapeHtml(resultTitle(r.score))}</h2>
      <table cellpadding="0" cellspacing="0" style="margin-top:12px;width:100%"><tr>
        <td style="padding:14px;background:#f5f5f5;border-radius:12px;width:33%"><p style="margin:0;font-size:22px;font-weight:700">${r.hoursLost} h</p><p style="margin:0;font-size:12px;color:#737373">perdues par semaine</p></td>
        <td style="width:8px"></td>
        <td style="padding:14px;background:#f5f5f5;border-radius:12px;width:33%"><p style="margin:0;font-size:22px;font-weight:700">${chf(r.annualCost)}</p><p style="margin:0;font-size:12px;color:#737373">par an</p></td>
        <td style="width:8px"></td>
        <td style="padding:14px;background:#f5f5f5;border-radius:12px;width:33%"><p style="margin:0;font-size:22px;font-weight:700">${r.score}/100</p><p style="margin:0;font-size:12px;color:#737373">potentiel de gain</p></td>
      </tr></table>
      <p style="font-size:12px;color:#737373">Estimation : personnes concernées × heures répétitives par personne, sur ${WORK_WEEKS} semaines, au coût complet de CHF ${HOURLY_COST}/h.</p>

      <h3 style="margin:28px 0 4px">Où partent ces heures</h3>
      <table cellpadding="0" cellspacing="0" style="width:100%">${frictions}</table>

      <h3 style="margin:28px 0 4px">Par quoi commencer</h3>
      <table cellpadding="0" cellspacing="0" style="width:100%">${recos}</table>

      <div style="margin:32px 0;padding:24px;border-radius:16px;background:#0a0a0a;color:#fff">
        <p style="margin:0 0 8px;font-size:18px;font-weight:700">${a.timing === "soon" ? "Cadrons votre projet en 30 minutes." : `Récupérer ces ${r.hoursLost} heures, concrètement.`}</p>
        <p style="margin:0 0 18px;color:#d4d4d4;font-size:14px">On part de ce rapport. Vous repartez avec ce qu'on construirait en premier, en combien de temps et pour quel budget. Si le sur-mesure n'est pas la bonne réponse, on vous le dit.</p>
        <a href="${SITE.calUrl}" style="display:inline-block;padding:12px 22px;border-radius:99px;background:#fff;color:#0a0a0a;font-weight:700;text-decoration:none">Réserver un appel de 30 min</a>
      </div>

      <p>Une question sur ce rapport ? Répondez simplement à cet e-mail.</p>
      <p style="margin-top:24px">Lucas<br><span style="color:#737373">Co-fondateur · <a href="${site}" style="color:#737373">NeX</a></span></p>
      <p style="margin-top:32px;font-size:11px;color:#a3a3a3">Vous recevez cet e-mail parce que vous avez fait le diagnostic sur ne-x.ch. Il n'y en aura pas d'autre.</p>
    </div>`;
}

// ── Envois ───────────────────────────────────────────────────────────────────

/**
 * Enregistrer d'abord, notifier ensuite. L'e-mail est une notification, pas
 * un stockage : quand LEAD_WEBHOOK_URL est renseigné (un Google Sheet via
 * Apps Script suffit — voir LEADS-ENREGISTREMENT.md), le lead y est écrit
 * avant toute tentative d'envoi.
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

async function send(resend: Resend, payload: Parameters<Resend["emails"]["send"]>[0], what: string): Promise<boolean> {
  // Une seule reprise : la plupart des échecs Resend sont transitoires.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const { error } = await resend.emails.send(payload);
      if (!error) return true;
      console.error(`[lead] ${what} refusé par Resend (tentative ${attempt})`, error);
    } catch (err) {
      console.error(`[lead] ${what} impossible (tentative ${attempt})`, err);
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, 600));
  }
  return false;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Champ piège rempli : un robot. On lui répond comme à un humain, sans rien envoyer.
  if (body?.hp) return Response.json({ ok: true });

  const lead: Lead = {
    name: clean(body?.lead?.name, 80),
    company: clean(body?.lead?.company, 100),
    role: clean(body?.lead?.role, 80),
    email: clean(body?.lead?.email, 160).toLowerCase(),
    phone: clean(body?.lead?.phone, 40),
  };
  if (!lead.name || !lead.company || !EMAIL_RE.test(lead.email)) {
    return Response.json({ error: "Missing or invalid lead fields" }, { status: 400 });
  }
  if (!isAnswers(body?.answers)) {
    return Response.json({ error: "Missing or invalid answers" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooMany(ip)) return Response.json({ error: "Too many requests" }, { status: 429 });

  const answers: Answers = body.answers;
  // Recalculé ici : ce sont ces chiffres qui partent par e-mail, pas ceux du navigateur.
  const result = calc(answers);
  const tag = TIMING_TAG[answers.timing] ?? "Lead";

  const stored = await storeLead({ receivedAt: new Date().toISOString(), tag, lead, answers, result });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "NeX Diagnostic <onboarding@resend.dev>";
  let notified = false;
  let reportSent = false;

  if (!apiKey || !to) {
    console.error("[lead] RESEND_API_KEY ou LEAD_NOTIFICATION_EMAIL manquant");
  } else {
    const resend = new Resend(apiKey);
    [notified, reportSent] = await Promise.all([
      send(resend, {
        from, to, replyTo: lead.email,
        subject: `[${tag}] ${lead.company} — ${result.hoursLost} h/sem., ${answers.sector}`,
        html: renderNotification(lead, answers, result),
      }, "notification"),
      // Le rapport du prospect : utile, mais jamais bloquant pour la suite.
      send(resend, {
        from, to: lead.email, replyTo: SITE.email,
        subject: `Votre diagnostic — ${result.hoursLost} h perdues par semaine chez ${lead.company}`,
        html: renderReport(lead, answers, result),
      }, "rapport prospect"),
    ]);
  }

  if (!stored && !notified) {
    // Dernier recours : la trace serveur, pour pouvoir rattraper à la main.
    console.error("[lead] PERDU — ni enregistré ni notifié", JSON.stringify({ lead, answers, result }));
    return Response.json({ ok: false, stored, notified, reportSent }, { status: 502 });
  }
  return Response.json({ ok: true, stored, notified, reportSent });
}
