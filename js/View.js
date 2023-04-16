import { Color } from "./Color.js";

export class View {
    COLORS = {
        1: 'black',
        2: 'blue',
        3: 'brown',
        4: 'green',
        5: 'orange',
        6: 'red',
        7: 'white',
        8: 'yellow'
    }
    ROW = 10;
    COLUMN = 4;
    NORMAL_BLOCK = {
        radius: 20,
        margin: 5
    }

    WIDTH_COLORS_PANEL = 150;
    WIDTH_TRIALS_PANEL = (this.NORMAL_BLOCK.radius + 10) * 4 + 60;
    WIDTH_TIPS_PANEL = (this.NORMAL_BLOCK.radius / 2 + 5) * 4 + 60;
    HEIGHT_PANEL = (this.NORMAL_BLOCK.radius + 10) * 11 + 200;

    blocks = new Array();
    tips = new Array();
    colorsToChoose = new Array();
    result = new Array();

    blocksPanel;
    tipsPanel;
    colorsPanel;
    resultPanel;

    context;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.WIDTH_COLORS_PANEL + this.WIDTH_TRIALS_PANEL + this.WIDTH_TIPS_PANEL;
        this.canvas.height = this.HEIGHT_PANEL;
        this.context = this.canvas.getContext("2d");
        this.element = document.getElementById("root");
        this.element.appendChild(this.canvas);

        this.context.font = "24px Arial";
        this.context.textAlign = "center";
    }

    renderScreen(text, color) {
        this.drawRect();
        this.showText(text, color);
    }

    showText(text, color) {
        this.context.fillStyle = color;
        this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
    }

    drawRect() {
        this.context.beginPath();
        this.context.rect(this.canvas.width / 2 - 100, this.canvas.height / 2 - 25 - 12, 200, 50);
        this.context.fillStyle = "#888";
        this.context.fill();
    }

    clearContext() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    panel() {
        let x = this.WIDTH_COLORS_PANEL;
        let y = 30;
        let amount = this.ROW * this.COLUMN;

        for (let i = 1; i <= amount; i++) {
            this.blocks[i-1] = new Color(x, y, this.NORMAL_BLOCK.radius, '#999');
            this.drawArc(this.blocks[i-1].getBlock());

            x = x + this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin;

            if (i % 4 == 0) {
                y = y + this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin;
                x = this.WIDTH_COLORS_PANEL;
            }
        }
    }

    panelOfTips() {
        let radius = this.NORMAL_BLOCK.radius / 2;
        let x = this.canvas.width - this.WIDTH_TIPS_PANEL + 10;
        let y = 30;
        let amount = this.ROW * this.COLUMN;

        for (let i = 1; i <= amount; i++) {
            this.tips[i-1] = new Color(x, y, radius, '#444');
            this.drawArc(this.tips[i-1].getBlock());

            x = x + radius * 2 + this.NORMAL_BLOCK.margin / 2;

            if (i % 4 == 0) {
                y = y + this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin;
                x = this.canvas.width - this.WIDTH_TIPS_PANEL + 10;
            }
        }
    }

    panelOfColors() {
        let x = 50;
        let y = 30 + this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin;

        for (let i = 1; i <= 8; i++) {
            this.colorsToChoose[i-1] = new Color(x, y, this.NORMAL_BLOCK.radius, this.COLORS[i]);
            this.drawArc(this.colorsToChoose[i-1].getBlock());

            y = y + this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin;
        }
    }

    panelOfFinalResult() {
        let x = this.WIDTH_COLORS_PANEL;
        let y = this.HEIGHT_PANEL - 30;

        for (let i = 1; i <= 4; i++) {
            this.result[i-1] = new Color(x, y, this.NORMAL_BLOCK.radius, '#444');
            this.drawArc(this.result[i-1].getBlock());

            x = x + this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin;
        }
    }

    drawArc(block) {
        this.context.beginPath();
        this.context.arc(block.midblockX, block.midblockY, block.radius, 0, Math.PI * 2);
        this.context.fillStyle = block.color;
        this.context.fill();
    }
}
