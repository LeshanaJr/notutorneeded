# No Tutor Needed

SAT study app; successor to PrepSprint.

## Current prototype

This version is a browser-based SAT study dashboard with:

- SAT Math and Reading/Writing category tracking
- Passage-based Reading and Writing questions
- LaTeX-rendered SAT-style math questions and answer choices
- Weakness-based quiz selection
- Daily practice quotas
- Target score and test date goals
- Mini lessons for each SAT domain
- Desmos graphing calculator integration
- Local progress storage for profile and question attempts
- Google sign-in and Firebase-backed user analytics once configured
- Required onboarding before practice: Google account, current score, target score, and daily goal

## Run or deploy

This is a static web app. The files are written with repo-relative imports, so they can be served from GitHub Pages, Firebase Hosting, or any static host.

Do not open `index.html` as a `file://` link. JavaScript modules and Google sign-in need a real web URL.

For GitHub Pages, publish the repository root and open the generated `https://...github.io/.../` URL. Then add that deployed domain in Firebase Authentication > Settings > Authorized domains.

## Google sign-in and analytics

Add your Firebase web app values to `firebase-config.js`, then enable these Firebase products:

- Authentication with Google as a sign-in provider
- Cloud Firestore

Once connected, the app writes:

- `users/{uid}`: student profile, goals, attempts array, and summary metrics
- `users/{uid}/attempts/{attemptId}`: that student's individual question attempts
- `questionAttempts/{attemptId}`: all question attempts across students for easier global analysis
- `usageEvents/{eventId}`: page views, quiz starts, loaded questions, skipped questions, and Google connection events

That structure is meant to make usage statistics easy to query in Firebase without needing access to a student's browser.
