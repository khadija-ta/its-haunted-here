# It's Haunted Here

A mobile-first website for discovering and sharing ghost stories and local legends pinned to real places in **Ann Arbor** and **Lahore**. Final project for SI 535.

## What to install
- [Node.js](https://nodejs.org) (version 20 or newer)

## Set up (once)
1. Open a terminal in this folder and run: `npm install`
2. Copy the example keys file: `cp .env.example .env`
3. Open `.env` and replace `your-carto-key-here` with your free CARTO key (`VITE_CARTO_KEY`).
   `.env` is private and is never committed to git.

## Run it
```
npm run dev
```
Then open the address it prints (usually http://localhost:5173). For phone view, use your browser's device toolbar (Chrome: View → Developer → Developer Tools, then the phone/tablet icon; pick a 390px-wide phone).

## Status
Step 1: map home screen with placeholder pins (fake data in `src/fakeData.js`). No database or accounts yet.

Map tiles © CARTO, map data © OpenStreetMap contributors.
