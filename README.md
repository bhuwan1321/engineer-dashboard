<h1 align="center">Engineer Dashboard</h1>

<p align="center"><b>A personal dashboard for fitness, DSA practice, academics and career tasks.</b><br>
Next.js and Firebase. Google sign-in, with each user's data kept private to them.</p>

<p align="center">
  <a href="#quick-start"><b>Quick start</b></a> ·
  <a href="#what-you-can-do"><b>What you can do</b></a> ·
  <a href="#security-and-privacy"><b>Security and privacy</b></a> ·
  <a href="#development"><b>Development</b></a>
</p>

Engineer Dashboard tracks the things a student engineer juggles in one place: daily health logs, workouts,
data-structures practice, exams and engineering tasks. It is a **Next.js 14** app that stores data in **Firestore**
and signs users in with Google, so every user sees only their own records.

## What you can do

| Section | What it tracks |
|---|---|
| **Dashboard** | Weight trend, protein, streaks, high-priority tasks and charts |
| **Diet** | Daily logs (weight, protein, sleep, water), a muesli protein calculator and a meal plan |
| **Workout** | Today's split, weekly plan, workout logging and a consistency chart |
| **DSA** | Daily problem suggestions, an 8-topic curriculum with Striver and NeetCode links, and progress per topic |
| **Engineering** | Tasks with priority, status and due dates, filtered by category |
| **Academics** | Semester exam planner, subject-wise progress and a deadline countdown |
| **Monitor** | Overall health score, streak status, a 30-day heatmap and 12 system checks |

## Quick start

You need **Node.js 18+** and a free **Firebase** account.

### 1. Create a Firebase project

1. Open the [Firebase console](https://console.firebase.google.com) and add a project.
2. Under **Authentication**, enable the **Google** sign-in provider.
3. Under **Firestore Database**, create a database in production mode.
4. In **Project settings**, add a **Web app** and copy its config values.

### 2. Install and configure

```bash
git clone https://github.com/bhuwan1321/engineer-dashboard.git
cd engineer-dashboard
npm install
cp .env.local.example .env.local
```

Open `.env.local` and fill in the values from step 1:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3. Publish the security rules

In the Firebase console, open **Firestore Database**, then **Rules**. Paste the contents of
[`firestore.rules`](firestore.rules) and publish. This limits every collection to the signed-in owner.

### 4. Run it

```bash
npm run dev
```

Open <http://localhost:3000>, sign in with Google and start tracking.

## Deploy

**Vercel:** run `vercel` from the project folder, then add the six `NEXT_PUBLIC_FIREBASE_*` variables under
**Settings, Environment Variables**.

**Firebase Hosting:**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # choose your project and answer yes to the Next.js framework prompt
npm run build
firebase deploy
```

## Security and privacy

- Sign-in is Google only. The app has no passwords of its own.
- [`firestore.rules`](firestore.rules) allow a signed-in user to read and write only documents that carry their own user ID.
- The `NEXT_PUBLIC_FIREBASE_*` values are Firebase web configuration. They are delivered to every visitor's browser by design, so the security rules, not secrecy of these values, protect your data.
- Keep `.env.local` out of git. It is already in `.gitignore`.
- In the Google Cloud console you can also restrict the API key to your own domains.

## Data model

| Collection | Contents |
|---|---|
| `profiles/{uid}` | Profile and body metrics |
| `daily_logs/{uid}_{date}` | Weight, protein, sleep, workout, calories, water and mood |
| `dsa_entries/{auto-id}` | Topic, problem, difficulty, status, date and time spent |
| `topic_tests/{auto-id}` | Quiz scores and weak areas per DSA topic |
| `workout_sessions/{auto-id}` | Exercises, sets and reps |
| `performance_metrics/{uid}_{date}_{category}` | Daily performance numbers |
| `tasks/{auto-id}` | Title, category, priority, status, due date and subject |
| `streaks/{uid}` | Diet, workout, DSA and engineering streaks with last dates |

## Project layout

```
src/app/                 Root page with the sign-in gate, layout and global styles
src/components/          One folder per section: diet, workout, dsa, engineering, academics, monitor, analytics
src/lib/                 Firebase setup, Firestore operations and curriculum data
src/store/               Zustand global state
firestore.rules          Security rules
```

## Development

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts, Zustand and Firebase.

```bash
npm run dev      # development server
npm run lint     # lint
npm run build    # production build; needs the Firebase variables set
```

To add a page, create `src/components/yourpage/YourPage.tsx`, register it in the `pages` map in `src/app/page.tsx`
and add a nav item in `src/components/layout/Sidebar.tsx`. To add a collection, add its CRUD functions in
`src/lib/firestore.ts` and matching rules in `firestore.rules`.
