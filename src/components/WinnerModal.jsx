import { Square } from "./Square";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return;

  const winnerText = winner === false ? "Empate" : "Gana";
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">
          {winner && <Square>{winner}</Square>}
          {/* Condicional en linea */}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
