export class Color {
    midblockX;
    midblockY;
    color;
    constructor(midblockX, midblockY) {
        this.midblockX = midblockX;
        this.midblockY = midblockY;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }
}