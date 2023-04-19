export class Color {
    midblockX;
    midblockY;
    radius;
    color;
    constructor(midblockX, midblockY, radius, color) {
        this.midblockX = midblockX;
        this.midblockY = midblockY;
        this.radius = radius;
        this.color = color;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }
}