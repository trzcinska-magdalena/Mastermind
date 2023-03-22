export class Game {
    trial = 1;

    chosenColor;

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
        this.trial = 1;

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
        
        if(pageX < this.view.widthTrialsPanel-50) {
            this.chooseTheColor(pageX, pageY);
        } else if(pageX < (this.view.widthTipsPanel+this.view.widthTrialsPanel)) {
            this.chooseTheBlock(pageX, pageY);
        }
    }

    chooseTheColor(pageX, pageY) {
        let radius = this.view.BLOCK.radius;

        for(let i=0; i<this.view.colorChoices.length; i++) {
            let minX = this.view.colorChoices[i].midblockX - radius;
            let maxX = this.view.colorChoices[i].midblockX + radius;
            let minY = this.view.colorChoices[i].midblockY - radius;
            let maxY = this.view.colorChoices[i].midblockY + radius;

            if((pageX >= minX && pageX <= maxX) && (pageY >= minY && pageY <= maxY) && this.trial <= this.view.ROW) {
                this.color = this.view.colorChoices[i].color;
            }
        }
    }

    chooseTheBlock(pageX, pageY) {
        let radius = this.view.BLOCK.radius;
        for(let i=(this.trial-1)*4; i<(this.trial)*4; i++) {
            console.log(this.view.blocks[i]);
            let minX = this.view.blocks[i].midblockX - radius;
            let maxX = this.view.blocks[i].midblockX + radius;
            let minY = this.view.blocks[i].midblockY - radius;
            let maxY = this.view.blocks[i].midblockY + radius;

            if((pageX >= minX && pageX <= maxX) && (pageY >= minY && pageY <= maxY) && this.trial <= this.view.ROW && this.color) {
                this.view.blocks[i].setColor(this.color);
                this.view.drawArc(this.view.blocks[i].midblockX, this.view.blocks[i].midblockY, radius, this.view.blocks[i].color);
                
                this.color = '';
                
                if(this.isBusyLine()) {
                    this.showTips(this.trial);
                    this.isEnd();
                    this.trial++;
                    return;
                }
                
            }
        }
    }

    isBusyLine() {
        for(let i=(this.trial-1)*4; i<(this.trial)*4; i++) {
            if(!this.view.blocks[i].getColor()) {
                return false;
            }
        }
        return true;
    }

    isEnd() {
        let goodArc = 0;
        for(let i=(this.trial-1)*4; i<(this.trial)*4; i++) {
            if(this.view.tips[i].getColor() == 'yellow') {
                goodArc++;
            }
        }

        if(goodArc == 4) this.view.winScreen();
        else if(this.trial >= this.view.ROW) {
            for(let i=0; i<this.view.result.length; i++) {
                this.view.drawArc(this.view.result[i].midblockX, this.view.result[i].midblockY, this.view.BLOCK.radius, this.view.result[i].color);
                this.view.gameOverScreen();

                this.view.canvas.removeEventListener("click", this.handleClick, true);
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

        let resultId = 0;
        for(let i=(trial-1)*4; i<trial*4; i++) {
            if(resultColor[resultId].getColor() == this.view.blocks[i].getColor()) {
                this.view.drawArc(this.view.tips[i].midblockX, this.view.tips[i].midblockY, 10, 'yellow');
                this.view.tips[i].setColor('yellow');
            } else if(resultColor.find(el => el.getColor() == this.view.blocks[i].getColor()) && this.view.tips[i].getColor() != 'yellow') {
                    this.view.drawArc(this.view.tips[i].midblockX, this.view.tips[i].midblockY, 10, 'blue');
                    this.view.tips[i].setColor('blue');
            }
            resultId++;
        }
    }
}