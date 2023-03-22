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

    blocks = new Array();
    tips = new Array();
    colorChoices = new Array();
    result = new Array();

    ROW = 10;
    COLUMN = 4;

    BLOCK = {
        midblockX: 50,
        midblockY: 30,
        radius: 20,
        margin: 5
    }

    widthColorsPanel = 150;
    widthTrialsPanel = (this.BLOCK.radius + 10) * 4 + 60;
    widthTipsPanel = (this.BLOCK.radius / 2 + 5) * 4 + 60;
    heightPanel = (this.BLOCK.radius + 10) * 11 + 200;

    context;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.widthColorsPanel + this.widthTrialsPanel + this.widthTipsPanel;
        this.canvas.height = this.heightPanel;
        this.context = this.canvas.getContext("2d");

        this.element = document.getElementById("root");
        this.element.appendChild(this.canvas);
    }

    clearContext() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    startScreen() {
        this.context.fillStyle = "#222";
        this.context.font = "24px Arial";
        this.context.textAlign = "center";
        this.context.fillText("Press ENTER to start", this.canvas.width / 2, this.canvas.height / 2);
    }

    winScreen() {
        this.context.beginPath();
        this.context.rect(this.canvas.width / 2 - 100, this.canvas.height / 2 - 25 - 12, 200, 50);
        this.context.fillStyle = "#888";
        this.context.fill();

        this.context.fillStyle = "green";
        this.context.fillText("You WIN!", this.canvas.width / 2, this.canvas.height / 2);
    }

    gameOverScreen() {
        this.context.beginPath();
        this.context.rect(this.canvas.width / 2 - 100, this.canvas.height / 2 - 25 - 12, 200, 50);
        this.context.fillStyle = "#888";
        this.context.fill();

        this.context.fillStyle = "red";
        this.context.fillText("You LOST!", this.canvas.width / 2, this.canvas.height / 2);
    }

    drawArc(x, y, radius, color) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.fillStyle = color;
        this.context.fill();
    }

    panel() {
        let radius = this.BLOCK.radius;
        let x = this.widthColorsPanel;
        let y = this.BLOCK.midblockY;
        let amount = this.ROW * this.COLUMN;

        for (let i = 1; i <= amount; i++) {
            this.drawArc(x, y, radius, '#999');
            this.blocks[i-1] = new Color(x, y);
            x = x + radius * 2 + this.BLOCK.margin;

            if (i % 4 == 0) {
                y = y + radius * 2 + this.BLOCK.margin;
                x = this.widthColorsPanel;
            }
        }
    }

    panelOfTips() {
        let radius = this.BLOCK.radius / 2;
        let x = this.canvas.width - this.widthTipsPanel + 10;
        let y = this.BLOCK.midblockY;
        let amount = this.ROW * this.COLUMN;

        for (let i = 1; i <= amount; i++) {
            this.drawArc(x, y, radius, '#444');
            this.tips[i-1] = new Color(x, y);
            x = x + radius * 2 + this.BLOCK.margin / 2;

            if (i % 4 == 0) {
                y = y + this.BLOCK.radius * 2 + this.BLOCK.margin;
                x = this.canvas.width - this.widthTipsPanel + 10;
            }
        }
    }

    panelOfColors() {
        let radius = this.BLOCK.radius;
        let x = this.BLOCK.midblockX;
        let y = this.BLOCK.midblockY + radius * 2 + this.BLOCK.margin;

        for (let i = 1; i <= 8; i++) {
            this.drawArc(x, y, radius, this.COLORS[i]);
            this.colorChoices[i-1] = new Color(x, y);
            this.colorChoices[i-1].color = this.COLORS[i];

            y = y + radius * 2 + this.BLOCK.margin;
        }
    }

    panelOfFinalResult() {
        let radius = this.BLOCK.radius;
        let x = this.widthColorsPanel;
        let y = this.heightPanel - this.BLOCK.midblockY;

        for (let i = 1; i <= 4; i++) {
            this.drawArc(x, y, radius, '#444');
            this.result[i-1] = new Color(x, y);

            x = x + radius * 2 + this.BLOCK.margin;
        }
    }
}