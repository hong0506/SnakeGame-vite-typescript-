import { Point } from "./types";

export class Food {
  private position: Point;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.position = this.generateRandomPosition();
  }

  private generateRandomPosition(): Point {
    const cellSize = 20;
    const maxX = Math.floor(this.canvasWidth / cellSize) - 1;
    const maxY = Math.floor(this.canvasHeight / cellSize) - 1;

    return {
      x: Math.floor(Math.random() * (maxX + 1)) * cellSize,
      y: Math.floor(Math.random() * (maxY + 1)) * cellSize,
    };
  }

  public generateNewPosition(snakeBody: Point[]): void {
    let newPosition: Point;
    do {
      newPosition = this.generateRandomPosition();
    } while (
      snakeBody.some(
        (segment) => segment.x === newPosition.x && segment.y === newPosition.y
      )
    );

    this.position = newPosition;
  }

  public getPosition(): Point {
    return this.position;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;

    // Create pulsing effect
    const time = Date.now() * 0.005;
    const pulse = Math.sin(time) * 0.1 + 0.9;
    const size = 20 * pulse;

    // Draw outer glow
    const gradient = ctx.createRadialGradient(
      x + 10,
      y + 10,
      0,
      x + 10,
      y + 10,
      15
    );
    gradient.addColorStop(0, "rgba(255, 193, 7, 0.8)");
    gradient.addColorStop(0.5, "rgba(255, 152, 0, 0.4)");
    gradient.addColorStop(1, "rgba(255, 193, 7, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x + 10, y + 10, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw main food circle
    const foodGradient = ctx.createRadialGradient(
      x + 10,
      y + 10,
      0,
      x + 10,
      y + 10,
      10
    );
    foodGradient.addColorStop(0, "#FFC107");
    foodGradient.addColorStop(1, "#FF8F00");

    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(x + 10, y + 10, 10, 0, Math.PI * 2);
    ctx.fill();

    // Add sparkle effect
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(x + 6, y + 6, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
