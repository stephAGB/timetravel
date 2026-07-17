# 🌌 TimeTravel Agency — Conciergerie Temporelle de Luxe

Une application web immersive et futuriste permettant d'explorer et de réserver des voyages à travers les époques. L'expérience est assistée par **Chronos AI**, un concierge temporel intelligent capable de dresser le profil de l'utilisateur via un quiz interactif pour lui recommander la destination idéale.

---

## ✨ Fonctionnalités Clés

*   **🎨 Design Ultra-Premium & Immersif** :
    *   Interface sombre aux accents néons et esthétique haut de gamme.
    *   Animations d'entrée fluides, effets de survol réactifs et transitions délicates propulsées par **Framer Motion** (durées calées entre 0.6s et 0.8s).
*   **⏳ Destinations & Époques Vedettes** :
    *   **Renaissance Florence (1503)** : Explorez l'atelier de Léonard de Vinci et les banquets des Médicis (Risque faible · 62 000 €).
    *   **Paris 1889 (Belle Époque)** : Vivez l'inauguration de la Tour Eiffel et l'Exposition Universelle (Risque faible · 35 000 €).
    *   **Le Crétacé (70M d'années)** : Safari d'observation de T-Rex et vol en Ptéranodon sous bulle blindée (Risque élevé · 95 000 €).
*   **🎥 Expérience Vidéo Lazy-Loaded** :
    *   Chargement différé et lecture automatique des vidéos d'ambiance au survol des cartes pour économiser la bande passante.
    *   Vidéos héroïques intégrées en arrière-plan des fiches de détails de chaque destination.
*   **🤖 Chronos AI (Concierge Intelligent)** :
    *   Bouton d'action rapide permettant de lancer un **profiler interactif en 5 questions** (Atmosphère, Risque, Climat, Durée, Budget).
    *   Les réponses s'affichent sous forme de **boutons d'action cliquables** dynamiques sans saisie manuelle requise.
    *   Génération de recommandations sur mesure par l'IA (**openai/gpt-oss-120b**) via une route API Next.js sécurisée.
*   **📅 Formulaire de Réservation** :
    *   Réservation en ligne instantanée avec feedback utilisateur fluide et confirmation animée.

---

## 🛠️ Stack Technique

*   **Framework** : [Next.js](https://nextjs.org/) (App Router)
*   **Styles** : [Tailwind CSS](https://tailwindcss.com/)
*   **Animations** : [Framer Motion](https://www.framer.com/motion/)
*   **Icônes** : [Lucide React](https://lucide.dev/)
*   **Intégration IA** : Modèle [openai/gpt-oss-120b](https://huggingface.co/openai/gpt-oss-120b) (interrogé via API Groq ou Mistral)

---

## IA Utilisées
- génération des images / vidéos --> voir partie 1
- initialisation du projet --> V0 Vercel
- chatbot --> groq
- code et fonctionnalités --> antigravity


## 🚀 Démarrage Rapide

### 1. Cloner le Projet & Installer les Dépendances
```bash
git clone https://github.com/stephAGB/timetravel.git
cd timetravel
pnpm install
```

### 2. Configurer les Clés API (Environnement)
Créez un fichier `.env.local` à la racine du projet et ajoutez votre clé API :

```env
# Option A : API Groq (Recommandée & ultra-rapide)
GROQ_API_KEY=gsk_votre_cle_ici

```
*(Le fichier `.env.local` est automatiquement ignoré par Git pour sécuriser vos clés privées).*

### 3. Lancer le Serveur de Développement
Si vous utilisez la configuration locale sous Windows via Scoop, lancez le serveur avec la commande suivante :
```powershell
$env:Path = "C:\Users\StéphanieAGBANGLANON\scoop\apps\nodejs\current;" + $env:Path; pnpm dev
```
Ouvrez ensuite **[http://localhost:3001](http://localhost:3001)** sur votre navigateur.

---

## 📂 Structure du Projet

```text
├── app/
│   ├── api/chat/route.ts      # Route API sécurisée pour le chatbot (Groq / Mistral)
│   ├── page.tsx               # Page d'accueil principale avec animations d'entrée
│   └── layout.tsx             # Layout global et métadonnées SEO
├── components/
│   └── site/
│       ├── agency.tsx         # Section de présentation & statistiques animées
│       ├── booking-form.tsx   # Formulaire de réservation interactif
│       ├── chatbot.tsx        # Fenêtre de chat Chronos AI & profiler de destination
│       ├── destinations.tsx   # Grille de cartes 16:9, survol vidéo & modaux détaillés
│       ├── hero.tsx           # Bannière d'accueil animée
│       └── navbar.tsx         # Barre de navigation responsive "TimeTravel Agency"
├── lib/
│   └── destinations.ts        # Données structurées des époques (tarifs, vidéos, etc.)
├── public/
│   └── destinations/          # Fichiers MP4 des époques pour l'immersion vidéo
├── .env.local                 # Clés API locales (non commis)
└── package.json               # Dépendances et scripts de build
```
