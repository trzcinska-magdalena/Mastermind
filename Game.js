export class Game {
    trial = 1;
    step = 1;

    isPlaying;

    constructor(view) {
        this.view = view;
        this.isPlaying = false;
        this.view.startScreen();

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        switch(event.keyCode) {
            case 13:
                this.view.clearContext();
                this.start();
        }
    }

    start() {
        this.isPlaying = true;

        this.view.panel();
        this.view.panelOfTips();
        this.view.panelOfColors();
        this.view.panelOfFinalResult();

        this.addColorsToResult();

        this.view.canvas.addEventListener("click", this.handleClick.bind(this));
    }

    addColorsToResult() {
        let colorsId = this.createLines();

        for(let i=0; i<this.view.result.length; i++) {
            this.view.result[i].setColor(this.view.COLORS[colorsId[i]]);
        }
    }

    handleClick(event) {
        let pageX = event.pageX - event.target.offsetLeft;
        let pageY = event.pageY - event.target.offsetTop;
        let radius = this.view.BLOCK.radius;

        for(let i=0; i<this.view.colorChoices.length; i++) {
            let color = this.view.colorChoices[i];
            let minX = color.midblockX - radius;
            let maxX = color.midblockX + radius;
            let minY = color.midblockY - radius;
            let maxY = color.midblockY + radius;

            if((pageX >= minX && pageX <= maxX) && (pageY >= minY && pageY <= maxY) && this.game.step <=40) {


                this.view.blocks[this.game.step-1].setColor(color.color);
                let newColor = this.view.blocks[this.game.step-1];
                this.view.drawArc(newColor.midblockX, newColor.midblockY, radius, newColor.color);
                
                if(this.game.step % 4 == 0) {
                    this.showTips(this.trial);
                    this.trial++;
                }
                this.step++;
                return;
            }
        }
    }

    createLines() {
        let colorsId = [];

        for (let i = 0; i < 4; i++) {
            let random = Math.floor((Math.random() * 8) + 1);
            colorsId[i] = random;
        }
        return colorsId;
    }

    isGoodTrial(line, result) {
        for (let i = 0; i < line.lenght(); i++) {
            if(line[i].getColor() != result[i].getColor()) {
                return false;
            }
        }
        return true;
    }

    showTips(trial) {
        let resultColor = this.view.result;

        let trials = this.view.blocks.slice((trial-1)*4, trial*4);
        let tips = this.view.tips.slice((trial-1)*4, trial*4);

        for(let i=0; i<trials.length; i++) {
            if(resultColor[i].getColor() == trials[i].getColor()) {
                this.view.drawArc(tips[i].midblockX, tips[i].midblockY, 10, 'yellow');
                tips[i].setColor('yellow');
            } else if(resultColor.find(el => el.getColor() == trials[i].getColor()) && tips[i].getColor() != 'yellow') {
                    this.view.drawArc(tips[i].midblockX, tips[i].midblockY, 10, 'blue');
                    tips[i].setColor('blue');
            }
        }
    }
}