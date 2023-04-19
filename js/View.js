import { Panel } from "./Panel.js";

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

        this.definePanels();
    }

    definePanels() {
        this.blocksPanel = new Panel(this.WIDTH_COLORS_PANEL, this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin,
            30, this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin, this.NORMAL_BLOCK.radius);

        this.tipsPanel = new Panel(this.canvas.width - this.WIDTH_TIPS_PANEL + 10, this.NORMAL_BLOCK.radius + this.NORMAL_BLOCK.margin / 2,
            30, this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin, this.NORMAL_BLOCK.radius / 2);

        this.colorsPanel = new Panel(50, 0, 30 + this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin,
            this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin, this.NORMAL_BLOCK.radius);

        this.resultPanel = new Panel(this.WIDTH_COLORS_PANEL, this.NORMAL_BLOCK.radius * 2 + this.NORMAL_BLOCK.margin,
            this.HEIGHT_PANEL - 30, 0, this.NORMAL_BLOCK.radius);
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

    drawArc(block) {
        this.context.beginPath();
        this.context.arc(block.midblockX, block.midblockY, block.radius, 0, Math.PI * 2);
        this.context.fillStyle = block.color;
        this.context.fill();
    }

    clearContext() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderPanel();
    }

    renderPanel() {
        let line = 1;
        let id = 1;

        for (let i = 1; i <= this.ROW * this.COLUMN; i++) {
            this.renderSingleBlock(this.blocksPanel, line - 1, id - 1, i, '#999');
            this.renderSingleBlock(this.tipsPanel, line - 1, id - 1, i, '#444');

            id++;

            if (i % 4 == 0) {
                id = 1;
                line++;
            }
        }
        

        for (let i = 1; i <= this.COLUMN; i++) {
            this.renderSingleBlock(this.resultPanel, 0, i-1, i, '#444');
        }

        for (let i = 1; i <= 8; i++) {
            this.renderSingleBlock(this.colorsPanel, i-1, 0, i, this.COLORS[i]);
        }
    }

    renderSingleBlock(arr, line, col, id, color) {
        arr.addBlock(line, col, color);
        this.drawArc(arr.getBlock(id - 1));
    }
}
