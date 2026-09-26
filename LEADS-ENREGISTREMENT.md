# Enregistrer les leads du diagnostic — 5 minutes

Aujourd'hui le code fonctionne déjà sans rien faire : le lead part par email
chez Resend (et le prospect reçoit son rapport), avec une reprise automatique si le premier envoi échoue, et un
repli côté visiteur si tout échoue.

Ce fichier décrit l'étape optionnelle qui rend l'ensemble vraiment solide :
**écrire chaque lead dans un Google Sheet avant même de tenter l'email.**
Aucun compte à créer, aucun service à payer.

---

## 1. Créer la feuille

Un nouveau Google Sheet. Première ligne, les en-têtes, dans cet ordre :

```
Date · Étiquette · Nom · Entreprise · Fonction · Email · Téléphone · Métier · Collaborateurs · Terrain · Pers. admin · H répétitives/pers. · Outils · Outils connectés · Budget logiciels · Score · Niveau · H perdues/sem. · Coût annuel · Frictions · Priorités · Horizon
```

`Étiquette` vaut « Projet < 3 mois », « Problème précis » ou « Veille » :
triez dessus pour savoir qui rappeler en premier.

## 2. Coller le script

Dans la feuille : **Extensions → Apps Script**. Remplace tout par ceci :

```javascript
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const l = d.lead || {}, a = d.answers || {}, r = d.result || {};
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
    d.receivedAt || new Date().toISOString(), d.tag,
    l.name, l.company, l.role, l.email, l.phone,
    a.sector, a.employees, a.fieldTeams, a.adminPeople, a.adminHours,
    (a.tools || []).join(', '), a.toolsIntegrated, a.toolsCost,
    r.score, r.maturity, r.hoursLost, r.annualCost,
    (r.frictions || []).map(f => f.title + ' (~' + f.hours + ' h)').join(' · '),
    (a.priorities || []).join(', '), a.timing,
  ]);
  return ContentService.createTextOutput('ok');
}
```

## 3. Déployer

**Déployer → Nouveau déploiement → Application web.**
Exécuter en tant que **moi**, accès **Tout le monde**. Autorise quand Google
le demande, puis copie l'URL `https://script.google.com/macros/s/…/exec`.

## 4. Brancher

Dans `.env.local` :

```
LEAD_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
```

Redémarre `npm run dev`. C'est tout.

---

## Ce que ça change

| | Sans webhook | Avec webhook |
|---|---|---|
| Lead enregistré durablement | non | **oui, avant l'email** |
| Email en panne | repli visiteur | **le lead est déjà sauvé** |
| Historique consultable | boîte mail | **une feuille triable et exportable** |

La route écrit d'abord, notifie ensuite, et ne renvoie une erreur au visiteur
que si **les deux** ont échoué. Voir `app/api/lead/route.ts`.

## En production

Pense à reporter `LEAD_WEBHOOK_URL` dans les variables d'environnement de ton
hébergeur — `.env.local` ne part pas au déploiement.
