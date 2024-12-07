import Vector3 from "./Vector3"

export default class ImagePlane {
    constructor() {
        this.x1 = new Vector3(-1, 0.75, 0);
        this.x2 = new Vector3(1, 0.75, 0);
        this.x3 = new Vector3(-1, -0.75, 0);
        this.x4 = new Vector3(1, -0.75, 0);
    }
}