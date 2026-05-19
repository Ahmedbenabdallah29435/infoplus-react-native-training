# 📱 InfoPlus App — React Native Training

🌐 **Languages:** **English** · [🇫🇷 Français](README.md)

## 👨‍🏫 Teaching context

> This repository is maintained by **Ahmed Ben Abdallah** as part of a **teaching mission** at the **InfoPlus Bizerte** training center.
>
> I mentor students in their journey to learn **React Native + Expo** through a series of progressive workshops. The content of this repo is the **official corrections of the workshops** I prepare for my students — each branch corresponds to a workshop (see [Git Branches](#-git-branches) section).
>
> Students work on their own fork and may consult this repo (and its branches) as a reference **after** trying the exercise themselves.

---

## 📖 About the project

Mobile app for the **InfoPlus Bizerte** training center (operating since 1995), built with **React Native + Expo**.

The app covers the typical features of a training-center app: catalog of formations, formation details, registration, user profile, dark mode, intro animations, onboarding, Supabase authentication, etc.

---

## 📸 App preview

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native.png" width="200" alt="Screenshot 1" /><br/>
        <sub><b>🏠 Home</b><br/>Stats, testimonials, gallery</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%202.png" width="200" alt="Screenshot 2" /><br/>
        <sub><b>📚 Formations</b><br/>List + search + pull-to-refresh</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%204.png" width="200" alt="Screenshot 3" /><br/>
        <sub><b>🎓 Information</b><br/>Hero image + info + CTA</sub>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%203.png" width="200" alt="Screenshot 4" /><br/>
        <sub><b>👤 Profile</b><br/>Supabase Auth + skills + dark mode</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%205.png" width="200" alt="Screenshot 5" /><br/>
        <sub><b>🔐 Login / Signup</b><br/>Supabase Auth + persistent session</sub>
      </td>
      <td align="center">
        <img src="docs/screenshots/Formation%20React%20Native%206.png" width="200" alt="Screenshot 6" /><br/>
        <sub><b>🎓 Formation detail</b><br/>Hero image + info + CTA</sub>
      </td>
    </tr>
  </table>
</div>

> 📁 Screenshots are stored in [`docs/screenshots/`](docs/screenshots/).

---

## 🛠 Tech stack

- **Expo SDK 54** + **React Native 0.81** + **React 19**
- **Expo Router v6** (file-based, type-safe routing)
- **TypeScript** (strict)
- **react-native-safe-area-context** (iPhone notch / Android nav bar handling)
- **expo-image**, **expo-audio**, **expo-haptics**, **expo-status-bar**
- **Animated** API (splash, onboarding, ripple effect on the logo)
- **React Context** (dark/light theme + global onboarding)
- **Supabase** (authentication + persistent session)

---

## 🗂 Project structure

```
app/
├── _layout.tsx              # Root Stack + SafeAreaProvider + Theme/Onboarding/Auth providers
├── (tabs)/
│   ├── _layout.tsx          # Tab bar (Home / Formation / Profile) safe-area aware
│   ├── index.tsx            # Home — InfoPlus info, stats, gallery, testimonials
│   ├── formations.tsx       # Formations list (FlatList + search + pull-to-refresh)
│   └── profil.tsx           # Profile, skills, useEffect demo, theme toggle, logout
├── formation/[id].tsx       # Formation detail (with hero image)
├── inscription.tsx          # Registration form (email regex, KeyboardAvoidingView)
├── confirmation.tsx         # Confirmation screen
├── login.tsx                # Login screen (Supabase)
└── signup.tsx               # Signup screen (Supabase)
components/
├── AnimatedSplash.tsx       # App entry animation (logo + text)
├── Onboarding.tsx           # 4-step swipe tutorial (skip + dots)
├── AppHeader.tsx            # Custom safe-area-aware header
├── ProfileCard.tsx          # Profile card (photo + name + bio) themed
├── ProfileCardTest.tsx      # Description card themed
└── UserDemo.tsx             # useEffect teaching demo (fetch + timer)
contexts/
├── ThemeContext.tsx         # global dark / toggleDark
└── OnboardingContext.tsx    # global showing / show / hide
lib/
├── supabase.ts              # Supabase client (with SSR-safe storage)
└── AuthContext.tsx          # global Supabase session
hooks/
└── useClickSound.ts         # Click sound via expo-audio
data/
└── formations.json          # Local formations data (id, image, price, level...)
```

---

## 📚 Workshops — what we covered

> 🔖 **Important:** every workshop has its own Git branch with the official
> correction. To inspect the code at a specific point, use `git checkout <branch>`.

### 🌱 Workshop 1 & 2 — React Native basics + components

**Branch: [`ATELIER-1-2`](../../tree/ATELIER-1-2)**

App foundations:

- Setting up the **Expo** environment + first `npx expo start`.
- Core RN components: `View`, `Text`, `Image`, `ScrollView`, `Pressable`, `Button`.
- **Props & TypeScript**: building `ProfileCard` (photo, name, bio) and `ProfileCardTest` (description).
- **`StyleSheet.create`**: style organization, `flex`, `flexDirection`, `justifyContent`.
- First *Profile* screen with photo, bio, and a **list of skills** (colored badges).
- **`useState`**: dynamically add / remove skills, local Light/Dark mode toggle.
- First *Explore / Home* screen showcasing the InfoPlus center.
- Tab-based navigation via **Expo Router** (`app/(tabs)/_layout.tsx`).

### 🚀 Workshop 3 — Navigation, FlatList & API

**Branches:**

- [`ATELIER-3`](../../tree/ATELIER-3) — base version
- [`ATELIER-3-Version-Final`](../../tree/ATELIER-3-Version-Final) — clean final version
- [`Atelier-3-bonus`](../../tree/Atelier-3-bonus) — **with the 5 bonus mini-challenges**

What we added:

- **Advanced Expo Router**: dynamic routes (`app/formation/[id].tsx`), `router.push()`, params via `useLocalSearchParams()`.
- **`FlatList`** with `renderItem`, `keyExtractor`, `ListEmptyComponent`.
- **`useEffect` + `fetch`**: async loading from JSONPlaceholder, then migrated to a local `data/formations.json`.
- **Full registration flow**: list → detail → form → confirmation.
- **Form validation** (name, email, phone) with `Alert`.
- **`ActivityIndicator`** + loading / error state handling.

**Bonus mini-challenges (`Atelier-3-bonus` branch):**

1. 🔄 **Pull-to-refresh** on the FlatList (`refreshing` + `onRefresh`).
2. 🔍 **Search bar** filtering formations by title (`.filter()`).
3. 📄 **Real data** in `data/formations.json` (React Native, Flutter, Python, React JS, Node.js).
4. 📱 **`SafeAreaView`** on the registration screen (iPhone notch).
5. ✉️ **Email regex validation**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)`.

### ✨ Workshop 4 — Supabase Auth, Context & polish

**Branch: [`Atelier-4`](../../tree/Atelier-4)**

What we added:

- **Supabase setup**: project creation, API keys in `.env`, `lib/supabase.ts` with `AsyncStorage` persistence.
- **`AuthContext`**: global `session` + `loading` via `useAuth()`, real-time updates with `onAuthStateChange`.
- **Login / Signup screens** with Supabase (`signInWithPassword`, `signUp`).
- **Tab protection**: redirect to `/login` if no active session.
- **Logout**: `supabase.auth.signOut()` from the Profile screen.
- **Global theming**: `ThemeContext` so dark/light mode applies on every page.
- **Animations** via `Animated`:
  - Animated splash at app entry (logo + text spring-in).
  - 4-step swipe-able onboarding with pagination dots and "Skip" button.
  - **Wave effect** on the Home logo → re-opens the tutorial on tap.
- **`expo-audio`**: click sound on key buttons (`useClickSound` hook).
- **`expo-image`**: optimized images with remote URLs (home gallery, formation hero).
- **Real InfoPlus data**: 5000 graduates, 20 formations, 30 years, real testimonials.
- **Cross-platform polish**:
  - `useSafeAreaInsets()` to handle iPhone notch + Android edge-to-edge.
  - Per-screen `<StatusBar style="light" />` so time/wifi stays readable.
  - Custom `AppHeader` respecting safe area on Android.
  - Tab bar adapted to Android system nav (3-button / gestures).
  - `KeyboardAvoidingView` on the registration form (iOS).

**Bonus mini-challenges:**

1. 🔑 **Forgot password** — `supabase.auth.resetPasswordForEmail()` on the login screen.
2. ✉️ **Email regex validation** on login + signup.
3. ⏳ **Loading splash** — InfoPlus logo + spinner while auth is initializing.
4. 🐙 **GitHub OAuth** — `supabase.auth.signInWithOAuth({ provider: 'github' })` (removed in the final UI, easy to re-enable).

---

## ▶️ Run the project

```bash
# 1. Install dependencies
npm install

# 2. Create the .env file (copy from .env.example)
#    Add your own Supabase URL + anon key

# 3. Start Metro
npx expo start
```

Then:

- 📱 Scan the QR code with **Expo Go** (Android/iOS)
- 🤖 Press `a` to open Android emulator
- 🍎 Press `i` to open iOS simulator
- 🌐 Press `w` to open in the browser

⚠️ **Android note**: because `edgeToEdgeEnabled: true` in `app.json`, the status bar and Android system nav bar overlay the content. Components use `useSafeAreaInsets()` to handle this correctly.

⚠️ **Node.js note**: Supabase requires `WebSocket` which isn't native in Node < 22. If you run the app on web (SSR), use **Node 22 LTS or higher**.

---

## 🔀 Git branches

| Branch                    | Contents                                                |
| ------------------------- | ------------------------------------------------------- |
| `main`                    | Latest version (most up-to-date)                        |
| `ATELIER-1-2`             | Workshops 1 & 2 correction (basics + profile)           |
| `ATELIER-3`               | Workshop 3 correction (base version)                    |
| `ATELIER-3-Version-Final` | Workshop 3 — clean final version                        |
| `Atelier-3-bonus`         | Workshop 3 + 5 bonus mini-challenges                    |
| `Atelier-4`               | Workshop 4 correction (Supabase Auth + Context + bonus) |

To inspect a correction:

```bash
git checkout ATELIER-3-Version-Final
# or
git checkout Atelier-4
```

---

## 👤 Author

**Ahmed Ben Abdallah** — React Native instructor at InfoPlus Bizerte.

This repo is a **teaching resource**: it gathers the official corrections of the workshops used in class. Students are encouraged to try each workshop on their own before consulting the correction in the corresponding branch.

---

## 🏫 The center

**InfoPlus Bizerte** — diploma programs in BTP, BTS,
Commerce, Multimedia Design, Web & Mobile Development since 1995.

🌐 [infoplus.tn](https://infoplus.tn)
