import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkEndBoard, checkWinnerFrom } from "./logic/board";
import confetti from "canvas-confetti";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  // Tiene un estado se vuelve a renderizar cada que cambia ese estado

  const boardV = Array(9).fill(null);
  const [board, setBoard] = useState(boardV);

  /* Turn */
  //Credentials

  const [turn, setTurn] = useState(TURNS.x);

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(boardV);
    setWinner(null);
    setTurn(TURNS.x);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

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

    /* LocalStorage */
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner); /* Los estados en React son asincronos */
    } else if (checkEndBoard(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>

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
      </main>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </>
  );
}

export default App;
