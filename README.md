# Smart Intern — Adaptive Learning Platform

A React and TypeScript prototype for students preparing for internships and entry-level technology roles. It brings study planning, topic revision, progress views, opportunity listings, and interview-practice screens into one application.

## What is included

- Onboarding and a learner dashboard
- A study planner with weekly steps and a focus timer
- Topic pages, flashcards, revision quizzes, and sample course content
- Practice questions and interview prompts for several role types
- Internship, job, and hackathon listings backed by local data files
- Profile settings and a community-style discussion view

## Current scope

This version is a **frontend prototype**. The content in `src/data` is bundled with the app, and some screens use sample data. The sign-in and profile flows are not connected to an authentication provider or backend service. The quick-help panel uses local rules rather than a generative AI service. Do not describe these parts as production integrations.

## Run locally

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (the dev server is configured for port `3000`).

```bash
npm run lint    # TypeScript check
npm run build   # Create the production frontend bundle
npm run preview # Preview the built bundle
```

## Project layout

```text
src/
├── components/   # Pages, navigation, modals, and feature views
├── context/      # Shared application state
├── data/         # Sample courses, opportunities, and practice questions
├── i18n/         # UI translations
├── types/        # Shared TypeScript types
├── App.tsx
└── main.tsx
```

There is no automated test suite in this repository yet. Before extending the app, check whether a feature is backed by local sample data or an actual service, and add tests around any new logic that needs to be reliable.
