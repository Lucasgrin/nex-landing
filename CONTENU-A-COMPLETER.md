# Ce qu'il reste à fournir

Tout le site est construit et fonctionne. Ce fichier liste ce qui manque pour
qu'il soit crédible en production et exploitable par Google.

Classé par impact réel, du plus urgent au moins urgent.

---

## 🔴 1. Urgent — tes leads partent probablement à la poubelle

Le domaine `ne-x.ch` n'est pas vérifié chez Resend (c'est écrit dans ton
`.env.local`). `app/api/lead/route.ts` n'envoie les leads que par email : tant
que la vérification n'est pas faite, **chaque diagnostic rempli est perdu, sans
que personne s'en rende compte**.

1. Resend → Domains → `ne-x.ch` → ajouter les 3 enregistrements DNS (TXT DKIM,
   MX, TXT SPF) chez le registrar du domaine.
2. Attendre le passage au statut « Verified ».
3. Remplir le diagnostic en conditions réelles et vérifier la réception.

À envisager ensuite : enregistrer aussi les leads ailleurs que dans un email
(une ligne dans une base, un webhook). Un email raté est un lead perdu
définitivement.

---

## 🔴 2. Coordonnées — bloquent le référencement local

Fichier : **`app/content/site.ts`**

| Champ | Pourquoi c'est important |
|---|---|
| `street` | Sans rue, Google ne peut pas rattacher le site à ta fiche Google Business. C'est le signal n°1 du pack local. |
| `phone` | Format international : `+41 26 000 00 00`. Affiché en cliquable sur mobile. |
| `email` | Utilisé dans le footer, les mentions légales et la politique de confidentialité. |
| `googleBusinessUrl` | Le lien « Partager » de ta fiche. Alimente le champ `sameAs` du schema. |
| `linkedinUrl` | Page entreprise. Même rôle. |
| `foundingYear` | Vérifier l'année de création de Scale X Sàrl. |

⚠️ **Le NAP doit être stricto sensu identique** partout : ici, sur la fiche
Google Business, sur LinkedIn, et sur tout annuaire. Une virgule ou une
abréviation différente (« Rue » vs « Rte ») affaiblit le signal local.

---

## 🟠 3. L'équipe — la section qui convertit tes cold calls

Fichier : **`app/content/team.ts`**

Pour chacune des 2 personnes : `name`, `role`, `bio` (2-3 phrases),
`linkedin`, `photo`.

La bio n'est pas un CV. Elle doit répondre à « à qui je parle et pourquoi
lui faire confiance ». Ton direct, pas de jargon, cohérent avec le reste du
site.

**Photos équipe** — `public/equipe/prenom-nom.jpg`
- Format portrait **4:5**, minimum **800 × 1000 px**
- Fond neutre et cadrage identiques pour les deux, sinon la grille se déséquilibre
- Vrais visages, pas de photo de banque d'images : sur un site de PME, ça se voit
  immédiatement et l'effet est inverse de celui recherché

Ensuite : renseigner `photo: "/equipe/prenom-nom.jpg"`.

---

## 🟠 4. Photos des locaux

Fichier : **`app/content/team.ts`** (constante `LOCAUX`)

- `public/locaux/bureau.jpg` — paysage **16:9**, min. **1400 px** de large
- `public/locaux/equipe-au-travail.jpg` — **4:3**, min. **1000 px**
- `public/locaux/atelier-client.jpg` — **4:3**, min. **1000 px**

Prises au téléphone en lumière du jour, c'est suffisant. L'objectif est de
prouver que le bureau existe, pas de faire un reportage.

En attendant, un cadre gris neutre s'affiche — la page reste présentable, rien
n'est cassé.

---

## 🟡 5. Études de cas — témoignages et captures

Fichier : **`app/content/cases.ts`**

**Témoignages** (`quote`) — le champ est volontairement à `null`. Un témoignage
doit venir du client, jamais être écrit à sa place. Une phrase suffit, avec le
nom et la fonction. C'est le contenu qui rassure le plus un prospect appelé à
froid, et personne d'autre ne peut te le fournir.

**Captures** (`photo`) — `public/realisations/<slug>.jpg`, paysage **16:10**,
min. **1200 px**. Une capture de l'outil livré, floutée si nécessaire.

**Chiffres** (`metrics`, `gains`) — vérifier ceux déjà en ligne avant mise en
production. « Temps de traitement divisé par deux » et « ROI mesurable dès le
premier mois » sont affirmés sur le site : s'ils ne sont pas défendables devant
le client concerné, il faut les retirer. Un chiffre faux se retourne contre toi
au premier rendez-vous.

---

## 🟡 6. Mentions légales

Fichier : **`app/mentions-legales/page.tsx`**

- Numéro IDE / registre du commerce → à récupérer sur **zefix.ch**
- Numéro de TVA, le cas échéant
- Hébergeur : raison sociale et adresse (Vercel Inc., Infomaniak…)

Fichier : **`app/politique-de-confidentialite/page.tsx`**
- Nommer les sous-traitants (hébergeur, Resend, Cal.com) et le pays
  d'hébergement des données. La LPD révisée impose cette transparence.

---

## 🟢 7. Google — les actions hors du code

Le site ne se référencera pas tout seul, même parfaitement construit.

1. **Google Search Console** — créer la propriété `ne-x.ch`, puis soumettre
   `https://ne-x.ch/sitemap.xml`. Sans ça, l'indexation des 26 URLs peut prendre
   des semaines au lieu de quelques jours.
2. **Fiche Google Business** — vérifier que le NAP correspond exactement à
   `site.ts`, ajouter les photos des locaux et de l'équipe, publier les
   catégories d'activité. Pour une agence locale, la fiche pèse souvent plus
   lourd que le site lui-même.
3. **Backlinks** — c'est le facteur qui manque le plus à un domaine neuf :
   annuaires romands, chambre de commerce, associations professionnelles,
   partenaires, et surtout les clients dont tu as fait le site ou l'outil.
   Quatre liens depuis des sites suisses réels valent mieux que cent liens
   d'annuaires génériques.

⚠️ **Sur les pages villes** : chaque page a un contenu économique propre,
volontairement. Si tu en ajoutes une, écris un vrai paragraphe local — ne
duplique pas un texte existant. Des pages quasi identiques sont traitées par
Google comme des « doorway pages » et peuvent être pénalisées.

---

## 🟢 8. Composants inutilisés

Six composants ne sont plus affichés nulle part et font doublon :

| Composant | Doublon de |
|---|---|
| `Problems.tsx` | `Transformation.tsx` |
| `Solution.tsx` | `Method.tsx` |
| `Expertises.tsx` | `WhatWeBuild.tsx` + pages service |
| `TwoOffers.tsx` | `WhatWeBuild.tsx` |
| `WhyCustom.tsx` | FAQ (question sur le sur-mesure) |
| `AiStats.tsx` | — pas un doublon : chiffres sourcés (McKinsey, Deloitte) |

`AiStats` reste un vrai candidat pour renforcer `Benefits`, dont les chiffres
(5h, 1, 0) ne sont sourcés par rien. Les cinq autres peuvent être supprimés.

---

## 🖼️ Captures des outils — pages métier

Les pages métier vivent déjà sans captures : chaque module affiche une
illustration animée qui tient sa place. Les captures viennent **enrichir**,
elles ne débloquent rien.

Trois emplacements, par ordre d'impact :

**1. Un gros plan par module** — `app/content/metiers.ts`, champ `visual` de
chaque module. C'est le plus rentable : trois images par métier, chacune
cadrée sur **un seul écran, trois à cinq éléments maximum**. Pense photo de
détail, pas photo d'ensemble. Format 16/10, 760 × 475 minimum.

```ts
visual: { src: "/metiers/nettoyage-planning.jpg", alt: "Le planning des tournées" },
```

**2. Le rail « l'outil en images »** — champ `gallery` du métier. Deux à
quatre captures plus larges avec une légende chacune. La section reste
masquée tant que le tableau est vide.

```ts
gallery: [
  { src: "/metiers/nettoyage-rentabilite.jpg", alt: "…", caption: "La rentabilité, contrat par contrat, en cours de mois." },
],
```

**3. La capture large du métier** — champ `visual` du métier lui-même, sous
les trois modules.

### Deux règles

**Anonymiser.** Un planning de 1pecc affiche des PPE, des gérances et des
noms d'employés. Remplace-les par des noms neutres avant la capture, ou cadre
sur une zone qui n'en contient pas. Ça t'évite d'avoir à demander une
autorisation à chacun.

**Lisibilité.** Si un texte fait moins de 14 px dans la capture d'origine, il
sera illisible une fois réduit. Zoome.

Sur les pages **projection**, la mention `MAQUETTE — CE QUE NOUS
CONSTRUIRIONS, PAS DES CAPTURES D'UN OUTIL EXISTANT` s'affiche
automatiquement. Ne l'enlève pas.
