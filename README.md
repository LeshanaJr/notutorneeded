# No Tutor Needed

SAT study app; successor to PrepSprint.

## Current prototype

This version is a browser-based SAT study dashboard with:

- SAT Math and Reading/Writing category tracking
- Weakness-based quiz selection
- Daily practice quotas
- Target score and test date goals
- Mini lessons for each SAT domain
- Local progress storage for profile and question attempts
- Google sign-in and Firebase-backed user analytics once configured

## Run locally

Serve the folder with any static web server, then open `index.html`.

Because the app uses JavaScript modules, opening the file directly may not work in every browser. A local static server or GitHub Pages is recommended.

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
