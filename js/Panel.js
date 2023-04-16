import { Color } from "./Color.js";

export class Panel {
    startX;
    startY;
    gapX;
    gapY;

    loop;

    blocks = new Array();

    constructor(startX, gapX, startY, gapY) {
        this.startX = startX;
        this.gapX = gapX;
        this.startY = startY;
        this.gapY = gapY;
    }

    addBlock(color) {
        this.blocks.push(color);
    }
}