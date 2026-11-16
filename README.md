# Engineer OS

Your personal dashboard for fitness, DSA, academics, and career — built with Next.js 14 + Firebase.

## What's inside

| Section | What it tracks |
|---|---|
| **Dashboard** | Weight trend, protein, streaks, high-priority tasks, charts |
| **Diet** | Daily logs (weight, protein, sleep, water), muesli protein calculator, meal plan |
| **Workout** | Today's split, weekly plan, workout logging, consistency chart |
| **DSA** | Daily problem suggestions, full 8-topic curriculum, Striver + NeetCode links, progress per topic |
| **Engineering** | Tasks with priority, status, due dates — filtered by category |
| **Academics** | Sem exam planner, subject-wise progress, deadline countdown |
| **Monitor** | Overall health score, streak status, 30-day heatmap, 12 system checks |

---

## Step 1 — Create Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `engineer-os` → create
3. In the project, click **Authentication** → **Get started** → enable **Google** sign-in
4. Click **Firestore Database** → **Create database** → start in **production mode** → pick a region
5. Click **Project Settings** (gear icon) → **Your apps** → **Add app** → Web
6. Copy the config values — you'll need them in Step 3

---

## Step 2 — Install dependencies

```bash
git clone https://github.com/bhuwan1321/engineer-dashboard.git
cd engineer-dashboard
npm install
```

---

## Step 3 — Configure environment

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=engineer-os-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=engineer-os-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=engineer-os-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## Step 4 — Set Firestore security rules

In Firebase Console → Firestore → **Rules** tab, paste the contents of `firestore.rules` and publish.

This ensures each user can only read and write their own data.

---

## Step 5 — Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in with Google and start tracking.

---

## Step 6 — Deploy to Firebase Hosting

### Install Firebase CLI (first time only)
```bash
npm install -g firebase-tools
firebase login
```

### Initialize Firebase in the project
```bash
firebase init hosting
# Choose: Use an existing project → select engineer-os-xxxxx
# When asked about framework: Yes, it's Next.js
```

### Deploy
```bash
npm run build
firebase deploy
```

Your app will be live at `https://engineer-os-xxxxx.web.app`

---

## Alternative: Deploy to Vercel (easier)

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx          ← main app + auth gate
│   ├── layout.tsx        ← root layout, fonts
│   └── globals.css       ← design system CSS
├── components/
│   ├── layout/
│   │   ├── AuthProvider.tsx   ← Firebase Auth context
│   │   ├── Sidebar.tsx        ← navigation + streaks
│   │   └── Dashboard.tsx      ← overview page
│   ├── diet/
│   │   └── DietTracker.tsx    ← logs + muesli calculator + charts
│   ├── workout/
│   │   └── WorkoutTracker.tsx ← split + logging + consistency
│   ├── dsa/
│   │   └── DSATracker.tsx     ← problems + curriculum + roadmap
│   ├── engineering/
│   │   └── EngineeringTracker.tsx ← tasks + priority + status
│   ├── academics/
│   │   └── AcademicsTracker.tsx   ← exam planner + subject progress
│   └── monitor/
│       └── MonitorPage.tsx    ← health checks + heatmap + streaks
├── lib/
│   ├── firebase.ts        ← Firebase init
│   ├── firestore.ts       ← all DB operations
│   └── curriculum.ts      ← DSA problems + SDE roadmap data
└── store/
    └── index.ts           ← Zustand global state
```

---

## Data model (Firestore collections)

```
daily_logs/{uid}_{date}     weight, protein, sleep, workout, calories, water, mood
dsa_entries/{auto-id}       topic, problem, difficulty, status, date, timeMinutes
tasks/{auto-id}             title, category, priority, status, dueDate, subject
streaks/{uid}               diet, workout, dsa, engineering + last dates
```

---

## Extending the app

**Add a new page:**
1. Create `src/components/yourpage/YourPage.tsx`
2. Add it to the `pages` map in `src/app/page.tsx`
3. Add a nav item in `src/components/layout/Sidebar.tsx`

**Add a new Firestore collection:**
1. Add the interface and CRUD functions in `src/lib/firestore.ts`
2. Add matching security rules in `firestore.rules`

---

## Tech stack

- **Next.js 14** — App Router, React Server/Client components
- **Firebase** — Firestore (DB), Authentication (Google sign-in), Hosting
- **Tailwind CSS** — utility-first styling
- **Recharts** — weight/protein/sleep charts
- **Zustand** — lightweight global state
- **TypeScript** — full type safety throughout
