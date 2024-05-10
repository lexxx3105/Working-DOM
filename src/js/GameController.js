export default class GameController {
    constructor(gamePlay) {
      this.gamePlay = gamePlay;
      this._dead = 0;
      this._lost = 0;
      this.activeHole = -1;
      this.playing = false;
      this.timeActiveHole = 1000;
    }
  
    init() {
      this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  
      this._dead = 0;
      this._lost = 0;
      this.playing = true;
  
      this.gamePlay.drawUi();
  
      this.runMainTimer(this.timeActiveHole);
      this.runInterfaceTimer(100);
    }
  
    runMainTimer(time) {
      this._mainTimer = setInterval(() => {
        if (!this.playing) {
          clearInterval(this._mainTimer);
        } else {
          this.setRandomActiveHole();
        }
      }, time);
    }
  
    runInterfaceTimer(time) {
      const interfaceTimer = setInterval(() => {
        if (!this.playing) {
          clearInterval(interfaceTimer);
        } else {
          this.gamePlay.updateCurrentScore(this._dead, this._lost);
        }
      }, time);
    }
  
    setRandomActiveHole() {
      let newActiveHole = this.activeHole;
      while (newActiveHole === this.activeHole) {
        newActiveHole = Math.floor(Math.random() * this.gamePlay.boardSize ** 2);
      }
  
      this.activeHole = newActiveHole;
      this.gamePlay.replaceMole(this.activeHole);
    }
  
    onCellClick(index) {
      if (this.gamePlay.isActiveHole(index)) {
        this._dead += 1;
      } else {
        this._lost += 1;
      }
      clearInterval(this._mainTimer);
      this.runMainTimer(this.timeActiveHole);
      this.setRandomActiveHole();
    }
  }