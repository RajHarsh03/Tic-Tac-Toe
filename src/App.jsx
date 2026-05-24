import { useMemo, useState } from "react";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createEmptyBoard = () => Array(9).fill(null);

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        player: board[a],
        line,
      };
    }
  }

  return null;
}

function App() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winner = useMemo(() => getWinner(board), [board]);
  const isDraw = !winner && board.every(Boolean);
  const movesPlayed = board.filter(Boolean).length;
  const movesLeft = 9 - movesPlayed;
  const resultText = winner
    ? `Player ${winner.player} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${currentPlayer}'s turn`;

  function playSquare(index) {
    if (board[index] || winner || isDraw) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    const nextWinner = getWinner(nextBoard);

    setBoard(nextBoard);

    if (nextWinner) {
      setScores((currentScores) => ({
        ...currentScores,
        [nextWinner.player]: currentScores[nextWinner.player] + 1,
      }));
      return;
    }

    setCurrentPlayer((player) => (player === "X" ? "O" : "X"));
  }

  function resetRound() {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
  }

  function resetMatch() {
    resetRound();
    setScores({ X: 0, O: 0 });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,rgba(45,212,191,0.24),transparent_30%),radial-gradient(circle_at_88%_14%,rgba(251,113,133,0.18),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(132,204,22,0.16),transparent_34%),linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#f0fdf4_100%)] px-3 py-4 text-zinc-950 sm:px-5 lg:px-6">
      <section
        className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-4xl content-center gap-4 lg:grid-cols-[minmax(0,520px)_280px] lg:items-start lg:justify-center"
        aria-label="Tic Tac Toe game"
      >
        <div className="rounded-lg border border-teal-100/80 bg-white/90 p-4 shadow-2xl shadow-teal-950/10 backdrop-blur sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-teal-700">
                React game
              </p>
              <h1 className="bg-linear-to-r from-teal-800 via-cyan-700 to-rose-500 bg-clip-text text-4xl font-black leading-none tracking-normal text-transparent sm:text-5xl">
                Tic Tac Toe
              </h1>
            </div>
            <div className="rounded-lg bg-linear-to-br from-teal-700 via-cyan-700 to-emerald-600 px-4 py-3 text-white shadow-lg shadow-teal-900/25 sm:min-w-32">
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cyan-50/80">
                Current
              </span>
              <strong
                className={cx(
                  "text-3xl font-black leading-none sm:text-4xl",
                  currentPlayer === "X" ? "text-cyan-100" : "text-rose-100"
                )}
              >
                {winner || isDraw ? "Done" : currentPlayer}
              </strong>
            </div>
          </div>

          <div
            className="mx-auto grid w-full max-w-80 grid-cols-3 gap-2 rounded-lg bg-linear-to-br from-teal-700 via-cyan-700 to-emerald-600 p-2 shadow-xl shadow-teal-950/20 min-[420px]:max-w-90 sm:max-w-100 sm:gap-3 sm:p-3 lg:max-w-97.5"
            role="grid"
            aria-label="Game board"
          >
            {board.map((value, index) => {
              const isWinningSquare = winner?.line.includes(index);

              return (
                <button
                  aria-label={`Square ${index + 1}${value ? `, marked ${value}` : ""}`}
                  className={cx(
                    "aspect-square rounded-lg border border-teal-50 bg-linear-to-br from-white to-cyan-50/70 text-4xl font-black leading-none shadow-inner shadow-cyan-100 transition duration-200 hover:-translate-y-1 hover:from-white hover:to-emerald-50 hover:shadow-lg hover:shadow-teal-950/10 focus:outline-none focus:ring-4 focus:ring-teal-300/70 disabled:translate-y-0 disabled:cursor-default min-[420px]:text-5xl sm:text-6xl",
                    value === "X" && "text-teal-600",
                    value === "O" && "text-rose-500",
                    isWinningSquare &&
                      "border-lime-300 from-lime-100 to-emerald-200 text-emerald-950 shadow-lg shadow-lime-500/30"
                  )}
                  disabled={Boolean(value) || Boolean(winner) || isDraw}
                  key={index}
                  onClick={() => playSquare(index)}
                  role="gridcell"
                  type="button"
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="grid content-start gap-3">
          <p
            className={cx(
              "rounded-lg border px-4 py-3 text-center text-base font-black shadow-lg sm:text-lg",
              winner &&
                "border-lime-200 bg-lime-100 text-emerald-950 shadow-lime-900/10",
              isDraw &&
                "border-rose-200 bg-rose-100 text-rose-950 shadow-rose-900/10",
              !winner &&
                !isDraw &&
                "border-cyan-100/80 bg-white/90 text-teal-950 shadow-teal-900/10"
            )}
          >
            {resultText}
          </p>

          <div className="grid grid-cols-2 gap-3" aria-label="Scoreboard">
            {["X", "O"].map((player) => {
              const isActive = currentPlayer === player && !winner && !isDraw;
              const playerColor =
                player === "X" ? "text-teal-600" : "text-rose-500";

              return (
                <div
                  className={cx(
                    "rounded-lg border bg-white/90 p-3 shadow-lg backdrop-blur",
                    isActive
                      ? "border-teal-500 shadow-teal-900/15 ring-2 ring-teal-100"
                      : "border-white/80 shadow-teal-900/10"
                  )}
                  key={player}
                >
                  <span className="text-sm font-bold text-slate-500">
                    Player {player}
                  </span>
                  <strong
                    className={cx("block text-3xl font-black leading-none", playerColor)}
                  >
                    {scores[player]}
                  </strong>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg border border-cyan-100/80 bg-white/90 p-3 shadow-lg shadow-teal-900/10 backdrop-blur">
            <div className="flex items-center justify-between text-sm font-bold text-teal-800">
              <span>Moves played</span>
              <span>{movesPlayed}/9</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-cyan-100">
              <div
                className="h-full rounded-full bg-linear-to-r from-teal-500 via-cyan-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${(movesPlayed / 9) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-600">
              {movesLeft} {movesLeft === 1 ? "move" : "moves"} left
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <button
              className="min-h-11 rounded-lg bg-linear-to-r from-teal-600 to-cyan-600 px-4 font-black text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:from-teal-500 hover:to-cyan-500 focus:outline-none focus:ring-4 focus:ring-teal-300/50"
              type="button"
              onClick={resetRound}
            >
              New round
            </button>
            <button
              className="min-h-11 rounded-lg border border-rose-100 bg-white/90 px-4 font-black text-rose-700 shadow-lg shadow-rose-900/10 transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-200/70"
              type="button"
              onClick={resetMatch}
            >
              Reset score
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default App;
