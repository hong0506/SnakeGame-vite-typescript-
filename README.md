# 🐍 Modern Snake Game

A beautiful, modern Snake game built with TypeScript, HTML5 Canvas, and Vite.

![Uploading image.png…]()


## ✨ Features

- **Modern TypeScript** - Type-safe code with excellent developer experience
- **Smooth Animations** - 60fps gameplay with smooth graphics
- **Responsive Design** - Works on desktop and mobile devices
- **Beautiful UI** - Glassmorphism design with gradients and effects
- **Progressive Difficulty** - Game speed increases as you score
- **Touch Controls** - Works with both keyboard and touch input

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

4. **Play the game:**
   - Use **WASD** or **Arrow Keys** to control the snake
   - Eat the golden food to grow and increase your score
   - Avoid hitting walls or yourself!

## 🎮 How to Play

- **W/↑** - Move Up
- **S/↓** - Move Down
- **A/←** - Move Left
- **D/→** - Move Right

The snake will grow each time it eats food, and the game speed will increase to make it more challenging!

## 🛠️ Tech Stack

- **TypeScript** - Type safety and modern JavaScript features
- **Vite** - Lightning-fast build tool and dev server
- **HTML5 Canvas** - Smooth 2D graphics rendering
- **CSS3** - Modern styling with gradients and animations
- **ES Modules** - Modern JavaScript module system

## 📁 Project Structure

```
src/
├── main.ts              # Entry point
├── game/
│   ├── SnakeGame.ts     # Main game controller
│   ├── Snake.ts         # Snake logic and rendering
│   ├── Food.ts          # Food generation and rendering
│   └── types.ts         # TypeScript type definitions
index.html               # HTML template
package.json             # Dependencies and scripts
```

## 🎨 Customization

The game is highly customizable! You can easily modify:

- **Game speed** - Change `gameSpeed` in `SnakeGame.ts`
- **Snake appearance** - Modify colors and effects in `Snake.ts`
- **Food appearance** - Customize food graphics in `Food.ts`
- **UI styling** - Update CSS in `index.html`

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service!

## 🎯 Future Enhancements

- High score persistence with localStorage
- Power-ups and special food types
- Multiplayer support
- Sound effects and background music
- Different game modes

Enjoy playing! 🎮
