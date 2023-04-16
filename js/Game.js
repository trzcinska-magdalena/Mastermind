export class Game {
    trial = 1;
    chosenColor;

    constructor(view) {
        this.view = view;
        this.isPlaying = false;
        this.view.renderScreen("Press ENTER to start", "#222");

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
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

        for (let i = 0; i < this.view.result.length; i++) {
            this.view.result[i].setColor(this.view.COLORS[colorsId[i]]);
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

    handleClick(event) {
        let pageX = event.pageX - event.target.offsetLeft;
        let pageY = event.pageY - event.target.offsetTop;

        if (pageX < this.view.WIDTH_TRIALS_PANEL - 50) {
            this.chooseTheColor(pageX, pageY);
        } else if (pageX < (this.view.WIDTH_TIPS_PANEL + this.view.WIDTH_TRIALS_PANEL)) {
            this.chooseTheBlock(pageX, pageY);
        }
    }

    chooseTheColor(pageX, pageY) {
        let radius = this.view.NORMAL_BLOCK.radius;

        for (let i = 0; i < this.view.colorsToChoose.length; i++) {
            let border = this.getBordersOfBlock(this.view.colorsToChoose, i, radius);
            if (this.checkCoordinates(pageX, pageY, border)) this.color = this.view.colorsToChoose[i].color;
        }
    }

    chooseTheBlock(pageX, pageY) {
        let radius = this.view.NORMAL_BLOCK.radius;
        for (let i = (this.trial - 1) * 4; i < (this.trial) * 4; i++) {
            let border = this.getBordersOfBlock(this.view.blocks, i, radius);

            if (this.checkCoordinates(pageX, pageY, border) && this.color) {
                this.view.blocks[i].setColor(this.color);
                this.view.drawArc(this.view.blocks[i].getBlock());
                this.color = '';

                if (this.isBusyLine()) {
                    this.showTips(this.trial);
                    this.isEnd();
                    this.trial++;
                    return;
                }

            }
        }
    }

    checkCoordinates(pageX, pageY, border) {
        return (pageX >= border.minX && pageX <= border.maxX) && (pageY >= border.minY && pageY <= border.maxY) && this.trial <= this.view.ROW;
    }

    getBordersOfBlock(arr, i, radius) {
        let minX = arr[i].midblockX - radius;
        let maxX = arr[i].midblockX + radius;
        let minY = arr[i].midblockY - radius;
        let maxY = arr[i].midblockY + radius;

        return { minX, maxX, minY, maxY };
    }

    isBusyLine() {
        for (let i = (this.trial - 1) * 4; i < (this.trial) * 4; i++) {
            if (this.view.blocks[i].getColor() == '#999') {
                return false;
            }
        }
        return true;
    }

    isEnd() {
        let goodArc = 0;
        for (let i = (this.trial - 1) * 4; i < (this.trial) * 4; i++) {
            if (this.view.tips[i].getColor() == 'yellow') {
                goodArc++;
            }
        }

        if (goodArc == 4) this.view.renderScreen("You WIN!", "green");
        else if (this.trial >= this.view.ROW) {
            for (let i = 0; i < this.view.result.length; i++) {
                this.view.drawArc(this.view.result[i].getBlock());

                this.view.renderScreen("You LOST!", "red");
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
            if (line[i].getColor() != result[i].getColor()) {
                return false;
            }
        }
        return true;
    }

    showTips(trial) {
        let resultColor = this.view.result;
        let blocks = this.view.blocks;

        console.log(resultColor);
        console.log(blocks);
        let resultId = 0;
        for (let i = (trial - 1) * 4; i < trial * 4; i++) {
            if (resultColor[resultId].getColor() == blocks[i].getColor()) {
                this.view.tips[i].setColor('yellow');
                this.view.drawArc(this.view.tips[i].getBlock());
            } else if (resultColor.find(el => el.getColor() == blocks[i].getColor()) && this.view.tips[i].getColor() != 'yellow') {
                this.view.tips[i].setColor('blue');
                this.view.drawArc(this.view.tips[i].getBlock());
            }
            resultId++;
        }
    }
}