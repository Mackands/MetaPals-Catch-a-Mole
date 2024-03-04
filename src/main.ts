import './css/style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { gameEngine } from './gameEngine.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <div class="container container__narrow">
    <a href="https://vitejs.dev" target="_blank">
    <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <br />
    <h1 class="title">MetaPals Catch a Mole!</h1>
    <br />
    <div class="flex justify-center">
      <div class="px-4">
        <div class="hole"></div>
      </div>
      <div class="px-4">
          <div class="hole"></div>
      </div>
      <div class="px-4">
          <div class="hole"></div>
      </div>
      
    </div>
    <div class="win-message text-green text-center py-4">
    </div>
    <div class="clicks text-center py-4">
    </div>
    <div class="time text-center py-4">
    </div>
    <div class="text-center py-4">
      <button class="start-button button">Start</button>
  </div>

`
gameEngine(document.querySelector<HTMLButtonElement>('#gameEngine')!)