import { Snake } from "./Snake";
import { Food } from "./Food";
import { Direction, Point } from "./types";

export class SnakeGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snake: Snake;
  private food: Food;
  private score: number = 0;
  private gameRunning: boolean = false;
  private gameLoop: number | null = null;
  private lastTime: number = 0;
  private gameSpeed: number = 150; // milliseconds between moves

  private scoreElement: HTMLElement;
  private gameOverElement: HTMLElement;
  private finalScoreElement: HTMLElement;

  constructor(
    canvas: HTMLCanvasElement,
    scoreElement: HTMLElement,
    gameOverElement: HTMLElement,
    finalScoreElement: HTMLElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.scoreElement = scoreElement;
    this.gameOverElement = gameOverElement;
    this.finalScoreElement = finalScoreElement;

    // Initialize game objects
    this.snake = new Snake();
    this.food = new Food(this.canvas.width, this.canvas.height);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    document.addEventListener("keydown", (e) => {
      if (!this.gameRunning) return;

      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          e.preventDefault();
          this.snake.setDirection(Direction.Up);
          break;
        case "s":
        case "arrowdown":
          e.preventDefault();
          this.snake.setDirection(Direction.Down);
          break;
        case "a":
        case "arrowleft":
          e.preventDefault();
          this.snake.setDirection(Direction.Left);
          break;
        case "d":
        case "arrowright":
          e.preventDefault();
          this.snake.setDirection(Direction.Right);
          break;
      }
    });
  }

  public start(): void {
    this.gameRunning = true;
    this.score = 0;
    this.updateScore();
    this.gameOverElement.style.display = "none";
    this.gameLoop = requestAnimationFrame((time) => this.gameUpdate(time));
  }

  public restart(): void {
    this.snake = new Snake();
    this.food = new Food(this.canvas.width, this.canvas.height);
    this.start();
  }

  private gameUpdate(currentTime: number): void {
    if (!this.gameRunning) return;

    if (currentTime - this.lastTime >= this.gameSpeed) {
      this.update();
      this.lastTime = currentTime;
    }

    this.gameLoop = requestAnimationFrame((time) => this.gameUpdate(time));
  }

  private update(): void {
    // Move snake
    this.snake.move();

    // Check wall collision
    if (this.checkWallCollision()) {
      this.gameOver();
      return;
    }

    // Check self collision
    if (this.snake.checkSelfCollision()) {
      this.gameOver();
      return;
    }

    // Check food collision
    if (this.checkFoodCollision()) {
      this.snake.grow();
      this.score += 10;
      this.updateScore();
      this.food.generateNewPosition(this.snake.getBody());

      // Increase game speed slightly
      this.gameSpeed = Math.max(80, this.gameSpeed - 2);
    }

    this.render();
  }

  private checkWallCollision(): boolean {
    const head = this.snake.getHead();
    return (
      head.x < 0 ||
      head.x >= this.canvas.width ||
      head.y < 0 ||
      head.y >= this.canvas.height
    );
  }

  private checkFoodCollision(): boolean {
    const head = this.snake.getHead();
    const foodPos = this.food.getPosition();
    return head.x === foodPos.x && head.y === foodPos.y;
  }

  private render(): void {
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    gradient.addColorStop(0, "#2c3e50");
    gradient.addColorStop(1, "#34495e");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    this.drawGrid();

    // Draw food
    this.food.render(this.ctx);

    // Draw snake
    this.snake.render(this.ctx);
  }

  private drawGrid(): void {
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.lineWidth = 1;

    const cellSize = 20;
    for (let x = 0; x <= this.canvas.width; x += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= this.canvas.height; y += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  private updateScore(): void {
    this.scoreElement.textContent = this.score.toString();
  }

  private gameOver(): void {
    this.gameRunning = false;
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
    }
    this.finalScoreElement.textContent = this.score.toString();
    this.gameOverElement.style.display = "block";
  }
}
