import { Direction, Point } from "./types";

export class Snake {
  private body: Point[];
  private direction: Direction;
  private nextDirection: Direction;

  constructor() {
    this.body = [
      { x: 200, y: 200 },
      { x: 180, y: 200 },
      { x: 160, y: 200 },
    ];
    this.direction = Direction.Right;
    this.nextDirection = Direction.Right;
  }

  public move(): void {
    this.direction = this.nextDirection;
    const head = { ...this.body[0] };

    switch (this.direction) {
      case Direction.Up:
        head.y -= 20;
        break;
      case Direction.Down:
        head.y += 20;
        break;
      case Direction.Left:
        head.x -= 20;
        break;
      case Direction.Right:
        head.x += 20;
        break;
    }

    this.body.unshift(head);
    this.body.pop();
  }

  public grow(): void {
    const tail = this.body[this.body.length - 1];
    this.body.push({ ...tail });
  }

  public setDirection(newDirection: Direction): void {
    // Prevent snake from going backwards into itself
    if (
      (this.direction === Direction.Up && newDirection === Direction.Down) ||
      (this.direction === Direction.Down && newDirection === Direction.Up) ||
      (this.direction === Direction.Left && newDirection === Direction.Right) ||
      (this.direction === Direction.Right && newDirection === Direction.Left)
    ) {
      return;
    }
    this.nextDirection = newDirection;
  }

  public getHead(): Point {
    return this.body[0];
  }

  public getBody(): Point[] {
    return this.body;
  }

  public checkSelfCollision(): boolean {
    const head = this.getHead();
    return this.body
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    this.body.forEach((segment, index) => {
      if (index === 0) {
        // Draw head with gradient
        const gradient = ctx.createRadialGradient(
          segment.x + 10,
          segment.y + 10,
          0,
          segment.x + 10,
          segment.y + 10,
          10
        );
        gradient.addColorStop(0, "#4CAF50");
        gradient.addColorStop(1, "#2E7D32");
        ctx.fillStyle = gradient;
      } else {
        // Draw body segments
        const gradient = ctx.createLinearGradient(
          segment.x,
          segment.y,
          segment.x + 20,
          segment.y + 20
        );
        gradient.addColorStop(0, "#66BB6A");
        gradient.addColorStop(1, "#4CAF50");
        ctx.fillStyle = gradient;
      }

      // Draw rounded rectangle
      this.drawRoundedRect(ctx, segment.x, segment.y, 20, 20, 5);

      // Add highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      this.drawRoundedRect(ctx, segment.x + 2, segment.y + 2, 16, 8, 3);
    });
  }

  private drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }
}
