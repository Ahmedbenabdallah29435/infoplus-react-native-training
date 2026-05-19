# 📱 InfoPlus App — Formation React Native

🌐 **Langues :** **Français** · [🇬🇧 English](README.en.md)

## 👨‍🏫 Contexte pédagogique

> Ce dépôt est maintenu par **Ahmed Ben Abdallah**, dans le cadre d'une **mission d'enseignement** au centre **InfoPlus Bizerte**.
>
> J'encadre les étudiants dans leur apprentissage de **React Native + Expo** à travers une série d'ateliers progressifs. Le contenu de ce repo représente **les corrections officielles des ateliers** que je prépare pour mes étudiants — chaque branche correspond à un atelier (voir section [Branches Git](#-branches-git)).
>
> Les étudiants travaillent sur leur propre fork et peuvent consulter ce repo (et ses branches) comme référence après avoir tenté l'exercice eux-mêmes.

---

## 📖 À propos du projet

Application mobile pour le centre de formation **InfoPlus Bizerte** (depuis 1995), construite avec **React Native + Expo**.

L'app couvre les fonctionnalités classiques d'une app de centre de formation :
catalogue de formations, détails, inscription, profil utilisateur, mode sombre,
animations d'entrée, onboarding, authentification Supabase, etc.

---

## 📸 Aperçu de l'application

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native.png" width="200" alt="Capture 1" /><br/>
        <sub><b>🏠 Accueil</b><br/>Stats, témoignages, galerie</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%202.png" width="200" alt="Capture 2" /><br/>
        <sub><b>📚 Formations</b><br/>Liste + recherche + pull-to-refresh</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%204.png" width="200" alt="Capture 3" /><br/>
        <sub><b>🎓 Information</b><br/>Image hero + infos + CTA</sub>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%203.png" width="200" alt="Capture 4" /><br/>
        <sub><b>👤 Profil</b><br/>Auth Supabase + compétences + dark mode</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%205.png" width="200" alt="Capture 5" /><br/>
        <sub><b>🔐 Login / Signup</b><br/>Supabase Auth + session persistante</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%206.png" width="200" alt="Capture 5" /><br/>
<sub><b>🎓 Détail formation/b><br/>Image hero + infos + CTA</sub>
      </td>
    </tr>
  </table>
</div>

> 📁 Les captures d'écran sont stockées dans [`docs/screenshots/`](docs/screenshots/).

---

## 🛠 Stack technique

- **Expo SDK 54** + **React Native 0.81** + **React 19**
- **Expo Router v6** (navigation par fichiers, type-safe routes)
- **TypeScript** (strict)
- **react-native-safe-area-context** (gestion notch / encoche / nav bar Android)
- **expo-image**, **expo-audio**, **expo-haptics**, **expo-status-bar**
- **Animated** API (animations splash, onboarding, ripple sur le logo)
- **React Context** (theme dark/light + onboarding global)

---

## 🗂 Structure du projet

```
app/
├── _layout.tsx              # Stack racine + SafeAreaProvider + Theme/Onboarding providers
├── (tabs)/
│   ├── _layout.tsx          # Tab bar (Home / Formation / Profil) safe-area aware
│   ├── index.tsx            # Home — infos InfoPlus, stats, galerie, témoignages
│   ├── formations.tsx       # Liste des formations (FlatList + search + pull-to-refresh)
│   └── profil.tsx           # Profil, compétences, démo useEffect, toggle thème
├── formation/[id].tsx       # Détail d'une formation (avec image hero)
├── inscription.tsx          # Formulaire d'inscription (regex email, KeyboardAvoidingView)
└── confirmation.tsx         # Écran de confirmation
components/
├── AnimatedSplash.tsx       # Animation de démarrage (logo + texte)
├── Onboarding.tsx           # Tutorial 4 étapes (swipe + skip + dots)
├── AppHeader.tsx            # Header custom respectant la safe area
├── ProfileCard.tsx          # Carte profil (photo + nom + bio) themed
├── ProfileCardTest.tsx      # Carte description themed
└── UserDemo.tsx             # Démo pédagogique de useEffect (fetch + timer)
contexts/
├── ThemeContext.tsx         # dark / toggleDark global
└── OnboardingContext.tsx    # showing / show / hide global
hooks/
└── useClickSound.ts         # Son au clic via expo-audio
data/
└── formations.json          # Données locales des formations (id, image, prix, niveau...)
```

---

## 📚 Ateliers — résumé de ce qu'on a appris

> 🔖 **Important :** chaque atelier a sa propre branche Git contenant la
> correction de cet atelier. Pour consulter le code à un moment précis du
> parcours, utilise `git checkout <branche>`.

### 🌱 Atelier 1 & 2 — Bases de React Native + composants

**Branche : [`ATELIER-1-2`](../../tree/ATELIER-1-2)**

Fondations de l'app :

- Installation de l'environnement **Expo** + premier `npx expo start`.
- Composants RN de base : `View`, `Text`, `Image`, `ScrollView`, `Pressable`, `Button`.
- **Props & TypeScript** : création de `ProfileCard` (photo, nom, bio) et `ProfileCardTest` (description).
- **`StyleSheet.create`** : organisation des styles, `flex`, `flexDirection`, `justifyContent`.
- Premier écran _Profil_ avec photo, bio, et **liste des compétences** (badges colorés).
- **`useState`** : ajouter / supprimer dynamiquement des compétences, toggle Mode Clair/Sombre local.
- Premier écran _Explore / Accueil_ présentant le centre InfoPlus.
- Navigation par onglets (Tabs) via **Expo Router** (`app/(tabs)/_layout.tsx`).

### 🚀 Atelier 3 — Navigation, FlatList & API

**Branches :**

- [`ATELIER-3`](../../tree/ATELIER-3) — version de base
- [`ATELIER-3-Version-Final`](../../tree/ATELIER-3-Version-Final) — version finale propre
- [`Atelier-3-bonus`](../../tree/Atelier-3-bonus) — **avec les 5 mini-défis bonus**

Ce qu'on a ajouté :

- **Expo Router avancé** : routes dynamiques `app/formation/[id].tsx`, navigation par `router.push()`, paramètres avec `useLocalSearchParams()`.
- **`FlatList`** avec `renderItem`, `keyExtractor`, `ListEmptyComponent`.
- **`useEffect` + `fetch`** : chargement asynchrone depuis JSONPlaceholder puis migration vers un fichier local `data/formations.json`.
- **Flow complet d'inscription** : liste → détail → formulaire → confirmation.
- **Validation de formulaire** (nom, email, téléphone) avec `Alert`.
- **`ActivityIndicator`** + gestion d'état de chargement + erreurs.

**Mini-défis bonus (branche `Atelier-3-bonus`) :**

1. 🔄 **Pull-to-refresh** sur la FlatList (`refreshing` + `onRefresh`).
2. 🔍 **Barre de recherche** filtrant les formations par titre (`.filter()`).
3. 📄 **Vraies données** dans `data/formations.json` (React Native, Flutter, Python, React JS, Node.js).
4. 📱 **`SafeAreaView`** sur l'écran d'inscription (notch iPhone).
5. ✉️ **Validation email regex** : `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)`.

### ✨ Atelier 4 — Contexte global, animations & polish (EN COURS)

**Branche : sera créée pour la correction**

> Cet atelier sera travaillé maintenant — la branche correspondante sera
> créée pour y placer la correction.

Sujets visés :

- **`React Context`** pour partager l'état entre écrans :
  - `ThemeContext` → mode sombre/clair appliqué sur **toutes** les pages.
  - `OnboardingContext` → contrôle global du tutorial (re-déclenchable).
- **Animations** avec `Animated` :
  - Splash animé à l'entrée de l'app (logo + texte qui apparaissent en spring).
  - Onboarding 4 étapes swipe-able avec dots de pagination et bouton "Passer".
  - **Effet wave** sur le logo Home → re-ouvre le tutorial au clic.
- **`expo-audio`** : son au clic sur les boutons importants (hook `useClickSound`).
- **`expo-image`** : images optimisées avec URL distantes (galerie home, hero formation).
- **Vraies données InfoPlus** : 5000 diplômés, 20 formations, 30 ans, témoignages réels.
- **Cross-platform polish** :
  - `useSafeAreaInsets()` pour gérer notch iPhone + edge-to-edge Android.
  - `<StatusBar style="light" />` par écran pour que time/wifi reste lisible.
  - Header custom `AppHeader` qui respecte la safe area sur Android.
  - Tab bar adaptée à la taille de la nav system Android (3 boutons / gestures).
  - `KeyboardAvoidingView` sur le formulaire d'inscription (iOS).

---

## ▶️ Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer Metro
npx expo start
```

Puis :

- 📱 Scanner le QR avec **Expo Go** (Android/iOS)
- 🤖 `a` pour ouvrir sur émulateur Android
- 🍎 `i` pour ouvrir sur simulateur iOS
- 🌐 `w` pour ouvrir dans le navigateur

⚠️ **Note Android** : à cause de `edgeToEdgeEnabled: true` dans `app.json`, la
status bar et la nav bar système overlay le contenu. Les composants utilisent
`useSafeAreaInsets()` pour gérer ça correctement.

---

## 🔀 Branches Git

| Branche                   | Contenu                                                     |
| ------------------------- | ----------------------------------------------------------- |
| `main`                    | Version actuelle (la plus à jour)                           |
| `ATELIER-1-2`             | Correction des ateliers 1 et 2 (bases + profil)             |
| `ATELIER-3`               | Correction de l'atelier 3 (version de base)                 |
| `ATELIER-3-Version-Final` | Atelier 3 — version finale propre                           |
| `Atelier-3-bonus`         | Atelier 3 + les 5 mini-défis bonus                          |
| `Atelier-4`               | Correction de l'atelier 4 (Supabase Auth + Context + bonus) |

Pour consulter une correction :

```bash
git checkout ATELIER-3-Version-Final
# ou
git checkout Atelier-3-bonus
```

---

## 👤 Auteur

**Ahmed Ben Abdallah** — Enseignant React Native chez InfoPlus Bizerte.

Ce dépôt sert de **support pédagogique** : il regroupe les corrections officielles des ateliers utilisés en cours. Les étudiants sont invités à essayer chaque atelier par eux-mêmes avant de consulter la correction sur la branche correspondante.

---

## 🏫 Le centre

Centre de formation **InfoPlus Bizerte** — formations diplômantes BTP, BTS,
Commerce, Infographie, Développement Web & Mobile depuis 1995.

🌐 [infoplus.tn](https://infoplus.tn)
