# Tic Tac Toe

A clean and responsive Tic Tac Toe game built with React, Vite, and Tailwind CSS.

The app includes a two-player turn system, winner detection, draw detection, score tracking, move progress, and reset controls.

## Features

- 3x3 interactive game board
- Two-player gameplay: Player X and Player O
- Current turn indicator
- Winner detection
- Draw detection
- Highlighted winning squares
- Score tracking for both players
- Move progress display
- New round and reset score buttons
- Responsive layout for mobile, tablet, and desktop screens
- Styled with Tailwind CSS

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript

## Getting Started

Follow these steps to run the project locally.

## Clone The Repository

```bash
git clone https://github.com/RajHarsh03/Tic-Tac-Toe.git
```

Go inside the project folder:

```bash
cd Tic-Tac-Toe
```

If your folder name has spaces, wrap it in quotes:

```bash
cd "Tic Tac Toe"
```

## Install Dependencies

```bash
npm install
```

## Run The Development Server

```bash
npm run dev
```

After running the command, open the local URL shown in the terminal.

Usually it is:

```bash
http://localhost:5173/
```

## Build For Production

```bash
npm run build
```

This creates a `dist` folder with the optimized production files.

## Preview Production Build

```bash
npm run preview
```

Use this command to preview the production build locally.

## Project Structure

```text
Tic Tac Toe/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
└── dist/
```

## Important Files

- `src/App.jsx`: Main game component, state management, turn logic, winner logic, and UI.
- `src/App.css`: Tailwind CSS import and small global base styles.
- `src/main.jsx`: React app entry point.
- `vite.config.js`: Vite configuration with React and Tailwind plugins.
- `index.html`: Main HTML file used by Vite.
- `dist/`: Generated production build folder. You do not edit this manually.

## Game Rules

1. Player X starts first.
2. Players take turns placing their mark on the board.
3. The first player to get three marks in a row wins.
4. Winning rows can be horizontal, vertical, or diagonal.
5. If all squares are filled and nobody wins, the game is a draw.
6. Use `New round` to clear the board.
7. Use `Reset score` to clear the board and both player scores.


