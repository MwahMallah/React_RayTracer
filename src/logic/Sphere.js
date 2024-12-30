import Vector3 from "./Vector3";

export default class Sphere {
    constructor(x, y, z, radius, [r, g, b]) {
        this.c = new Vector3(x, y, z);
        this.r = radius;
        this.red = r;
        this.green = g;
        this.b = b;
        this.color = [r, g, b];
    }
}