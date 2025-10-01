# 🎬 WatchNext

[![Ionic](https://img.shields.io/badge/Ionic-%230082FC.svg?logo=ionic&logoColor=white)](https://ionicframework.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![Cypress](https://img.shields.io/badge/E2E-Cypress-04C38E?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Vitest](https://img.shields.io/badge/Unit-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

A simple, elegant Ionic React app to discover upcoming movies. Browse what’s coming soon, dive into details, and explore trailers — all in a clean mobile-first UI.

## ✨ Features

- 🏠 Home: Centered hero banner introducing WatchNext with a quick call to action
- 🎞️ Coming Soon: Browse upcoming movies, search by title, filter by year, and toggle “future releases only”
- 🧾 Detail: See synopsis, genres, release date, rating, and watch available trailers
- 📱 Mobile-first UI built with Ionic components
- ⚡ Fast dev experience with Vite

## 🧭 App Pages

- Home: Introductory hero + button to “Coming Soon”
- Coming Soon: Paginated grid of upcoming titles, with filters and search
- Detail: Rich detail page with badges, poster/trailer, metadata, and description

Navigation flow:
Home ➜ Coming Soon ➜ Detail

## 🧱 Tech Stack

- Ionic React components and styling
- React 19 with TypeScript
- Vite for tooling and dev server
- Capacitor for native platform support
- Cypress for E2E tests and Testing Library/JSDOM for component tests
- ESLint for code quality

## Prerequisites

- Node.js 18+ and npm
- Ionic CLI installed globally:
  ```
  npm install -g @ionic/cli
  ```
- For native builds (optional): Android Studio and/or Xcode


## 🚀 Getting Started

1) Prerequisites
- Node.js 18+ and npm

2) Install dependencies
```shell script
npm install
```


3) Use the Ionic CLI to serve the app locally:
```shell script
ionic serve
```
The app will be available at:

- http://localhost:8100/

This command also watches for changes and live‑reloads the app.


4) Open in the browser  
   Vite will print a local URL (typically http://localhost:5173). Open it to view the app.

## 📦 Available Scripts

```shell script
bash
# Start dev server
npm run dev

# Type-check
npm run typecheck

# Lint and fix
npm run lint
npm run lint:fix

# Run unit tests (Vitest / Testing Library)
npm run test
npm run test:watch

# Run E2E tests (Cypress)
npm run cypress:open
npm run cypress:run

# Build for production
npm run build
npm run preview
```


Tip: After building, you can serve the production output locally with:
```shell script
bash
npm run preview
```


## 📁 Project Structure (high-level)

- src/pages
    - Home.tsx — hero landing with CTA to Coming Soon
    - ComingSoon.tsx — list/search/filter upcoming movies
    - Detail.tsx — trailers, genres, release data, and overview
- src/data — data helpers for fetching movie info
- src/theme — Ionic global/theme files
- public — static assets (e.g., images)

## 🧪 Testing

- Unit tests with Vitest + Testing Library
- E2E tests with Cypress

Example commands:
```shell script
bash
# Unit
npm run test

# E2E (interactive)
npm run cypress:open

# E2E (CI)
npm run cypress:run
```


## 📲 Native (optional)

This project is Capacitor-ready.
- To add platforms:
```shell script
bash
npx cap add ios
npx cap add android
```

- Build and sync:
```shell script
bash
npm run build
npx cap sync
```


Then open the native project in Xcode/Android Studio as needed.

## 🔐 API Notes

The data layer integrates with a public movie API to fetch upcoming titles and details. Ensure you configure any necessary API keys or environment variables as required by your data source.

Common places to manage environment variables:
- .env files for Vite (e.g., VITE_ variables)
- capacitor.config.ts for runtime app config

## 🧭 Routing

- / — Home
- /comingsoon — Upcoming list
- /movie/:movie_id — Detail page for a specific movie

## 🎯 Roadmap Ideas

- User watchlist and favorites
- Notifications for release dates
- More advanced filters (streaming providers, languages)
- Offline caching

## 📝 License

This project is provided as-is for learning and demonstration purposes.

---

Made with ❤️ using Ionic + React.