import { Color } from "./Color.js";

export class Panel {
    startX;
    startY;
    gapX;
    gapY;
    radius;

    blocks = new Array();

    constructor(startX, gapX, startY, gapY, radius) {
        this.startX = startX;
        this.gapX = gapX;
        this.startY = startY;
        this.gapY = gapY;
        this.radius = radius;
    }

    addBlock(line, id, color) {
        let midblockX = this.startX + this.gapX*id;
        let midblockY = this.startY + this.gapY*line;

        this.blocks.push(new Color(midblockX, midblockY, this.radius, color));
    }

    getBlock(id) {
        return this.blocks[id];
    }
}