export class Game {
    trial = 1;
    color;

    panel;
    tips;
    colos;
    result;


    constructor(view) {
        this.view = view;
        this.isPlaying = false;
        this.view.renderScreen("Press ENTER to start", "#222");

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                this.start();
        }
    }

    start() {
        this.trial = 1;
        this.view.clearContext();
        this.addColorsToResult();
        this.view.canvas.addEventListener("click", this.handleClick.bind(this));
    }

    addColorsToResult() {
        let colorsId = this.createLines();

        for (let i = 0; i < this.view.resultPanel.blocks.length; i++) {
            this.view.resultPanel.blocks[i].setColor(this.view.COLORS[colorsId[i]]);
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
        for (let i = 0; i < this.view.colorsPanel.blocks.length; i++) {
            let border = this.getBordersOfBlock(this.view.colorsPanel.blocks, i, this.view.NORMAL_BLOCK.radius);

            if (this.checkCoordinates(pageX, pageY, border)) 
                this.color = this.view.colorsPanel.blocks[i].color;
        }
    }

    chooseTheBlock(pageX, pageY) {
        for (let i = (this.trial - 1) * 4; i < (this.trial) * 4; i++) {
            let border = this.getBordersOfBlock(this.view.blocksPanel.blocks, i, this.view.NORMAL_BLOCK.radius);

            if (this.checkCoordinates(pageX, pageY, border) && this.color) {
                this.view.blocksPanel.blocks[i].setColor(this.color);
                this.view.drawArc(this.view.blocksPanel.blocks[i]);
                this.color = '';

                if (this.isBusyLine()) {
                    this.showTips();
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
        let min = (this.trial - 1) * 4;
        let max = (this.trial) * 4;
        let blocks = this.view.blocksPanel.blocks;

        blocks = blocks.filter(el => (blocks.indexOf(el) >= min && blocks.indexOf(el) < max) && el.getColor() != '#999');
       
        return blocks.length == this.view.COLUMN;
    }

    isEnd() {
        let min = (this.trial - 1) * 4;
        let max = (this.trial) * 4;
        let blocks = this.view.tipsPanel.blocks;

        blocks = blocks.filter(el => (blocks.indexOf(el) >= min && blocks.indexOf(el) < max) && el.getColor() == 'yellow');

        if(blocks.length == 4) 
            this.view.renderScreen("You WIN!", "green");
        else if (this.trial >= this.view.ROW) {
            this.view.resultPanel.blocks.forEach(el => this.view.drawArc(el));
            this.view.renderScreen("You LOST!", "red");
        }
        this.view.canvas.removeEventListener("click", this.handleClick, true);
    }

    createLines() {
        let colorsId = [];

        for (let i = 0; i < 4; i++) {
            let random = Math.floor((Math.random() * 8) + 1);
            colorsId[i] = random;
        }
        return colorsId;
    }

    showTips() {
        let resultColor = this.view.resultPanel.blocks;
        let blocks = this.view.blocksPanel.blocks;

        let min = (this.trial - 1) * 4;
        let max = (this.trial) * 4;

        for (let i = min, resultId = 0; i < max; i++, resultId++) {
            if (resultColor[resultId].getColor() == blocks[i].getColor()) {
                this.view.tipsPanel.blocks[i].setColor('yellow');
                this.view.drawArc(this.view.tipsPanel.blocks[i]);
            } else if (resultColor.find(el => el.getColor() == blocks[i].getColor()) && this.view.tipsPanel.blocks[i].getColor() != 'yellow') {
                this.view.tipsPanel.blocks[i].setColor('blue');
                this.view.drawArc(this.view.tipsPanel.blocks[i]);
            }
        }
    }
}