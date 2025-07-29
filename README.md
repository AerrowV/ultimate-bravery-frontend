# Ultimate Bravery – Frontend

This is the frontend for **Ultimate Bravery**, a strategy randomizer web app for FPS games like CS2. Choose between serious, average, or troll strategies and shake up your gameplay.

**Live Demo:** [ultimatebravery.yumiya.dk](https://ultimatebravery.yumiya.dk)  
**Backend Repo:** [github.com/AerrowV/ultimate-bravery-backend](https://github.com/AerrowV/ultimate-bravery-backend)

---

## What Is It?

A React-based frontend that connects to a Java REST API. Players can select a game, request a random strategy, and even manage strategies (if logged in as admin). Role-based access is enforced via JWT.

---

## Tech Stack

- React (Vite)
- CSS
- React Router DOM
- JWT-based login and role protection (USER, ADMIN)
- Caddy + Docker for deployment

---

## Features

- Select a game (e.g. CS2)
- Get a randomized strategy (Troll, Average, or Serious)
- Protected admin panel for adding/editing strategies
- Role-based route guarding
- Responsive and mobile-friendly UI*

---

## Testing

- Manual functional testing
- Protected route access
- Token persistence

---

## Getting Started

### Install and run locally

```bash
git clone https://github.com/AerrowV/ultimate-bravery-frontend.git
cd ultimate-bravery-frontend
npm install
npm run dev
```
---


