export default class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    scale(factor) {
        return new Vector3(this.x * factor, this.y * factor, this.z * factor); 
    }

    minus(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z)
    }
}