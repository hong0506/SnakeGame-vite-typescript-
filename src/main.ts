import { SnakeGame } from "./game/SnakeGame";

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const scoreElement = document.getElementById("score") as HTMLElement;
  const gameOverElement = document.getElementById("gameOver") as HTMLElement;
  const finalScoreElement = document.getElementById(
    "finalScore"
  ) as HTMLElement;

  const game = new SnakeGame(
    canvas,
    scoreElement,
    gameOverElement,
    finalScoreElement
  );

  // Make restart function globally available
  (window as any).restartGame = () => {
    game.restart();
  };

  // Start the game
  game.start();
});
