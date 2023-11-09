import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

const TURNS = {
  x: "x",
  o: "o",
};

const Square = ({ children, updateBoard, isSelected, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    if (index !== null) {
      updateBoard(index);
    }
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Tiene un estado se vuelve a renderizar cada que cambia ese estado

  const boardV = Array(9).fill(null);
  const [board, setBoard] = useState(boardV);
  const [winner, setWinner] = useState(null);
  /* Turn */

  const [turn, setTurn] = useState(TURNS.x);

  const updateBoard = (index) => {
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;

    if (board[index] || winner) return;
    /* Nunca tratar las props y el estado  */
    /* Puede generar discrepancias en caso de modificarlos  */

    /* Act tablero */
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    /* Act turno */
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner); /* Los estados en React son asincronos */
    } else if (checkEndBoard(newBoard)) {
      setWinner(false);
    }
  };

  const checkEndBoard = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const checkWinnerFrom = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó

    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // si no hay ganador
    return null;
  };

  const resetGame = () => {
    setBoard(boardV);
    setWinner(null);
    setTurn(TURNS.x);
  };

  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Empezar de nuevo</button>

        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {/* Se ejecuta esta funcion cada vez que el usuario de clic */}
                {/* La ejecucion se haga cuando se haga clic */}
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
        </section>

        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner === false ? "Empate" : "Gano"}</h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
                {/* Condicional en linea */}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
