import Vector3 from "./Vector3";

export default class Camera {
    constructor(x, y, z) {
        this.pos = new Vector3(x, y, z);
    }
}