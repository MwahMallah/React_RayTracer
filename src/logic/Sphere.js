import Vector3 from "./Vector3";

export default class Sphere {
    constructor(x, y, z, radius, [r, g, b]) {
        this.pos = new Vector3(x, y, z);
        this.radius = radius;
        this.r = r;
        this.g = g;
        this.b = b;
        this.color = [r, g, b];
    }
}