import Phaser from 'phaser';
import BootScene from '../Game/Scenes/BootScene';
import PreloadScene from '../Game/Scenes/PreloadScene'
import StartScene from '../Game/Scenes/StartScene';
import GameScene from '../Game/Scenes/GameScene';
import GameOverScene from '../Game/Scenes/GameOverScene';
import PauseGameScene from '../Game/Scenes/PauseGameScene';
import TutorialGameScene from '../Game/Scenes/TutorialGameScene';


let game;

const GamePage = () => {

  const phaserGame = `
  <div id="gameDiv" class="d-flex justify-content-center">
  </div>`;

  const main = document.querySelector('main');
  main.innerHTML = phaserGame;

  const config = {
    scale: {
      width: 1280,
      height: 868,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      mode: Phaser.Scale.FIT,
      Audio:true
    },
  
    scene: [BootScene,PreloadScene,StartScene, GameScene, GameOverScene,PauseGameScene, TutorialGameScene],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },
    parent: 'gameDiv',
    dom: {
        createContainer: true
    },
  }

  if (game) game.destroy(true);
  game = new Phaser.Game(config);

};

export default GamePage;