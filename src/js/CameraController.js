import * as THREE from 'three';

export default class CameraController {
    constructor(camera, points) {
        this.camera = camera;
        this.pathPoints = points;
        this.path = new THREE.CatmullRomCurve3(this.pathPoints);
        this.basePosition = 0;
        this.goalPosition = 0;
        this.currentPosition = 0;
        this.moveDistance = 0;
        this.x = 0;
        this.xDelta = 0.01;
    }

    MovePath(index) {
        if (this.path == null) { console.log("have not set path"); return; }

        var lengths = this.path.getLengths(this.pathPoints.length - 1);
        console.log(lengths);
        this.goalPosition = this.path.getUtoTmapping(0, lengths[index]);
        this.basePosition = this.currentPosition;
        this.moveDistance = this.goalPosition - this.currentPosition;
        this.x = 0;
    }

    Sigmoid(a, x) {
        var e1 = Math.exp(-a * (2 * x - 1));
        var e2 = Math.exp(-a);
        return (1 + (1 - e1) / (1 + e1) * (1 + e2) / (1 - e2)) / 2;
    }

    // SigmoidDiff(x) {
    //     return (1 - this.Sigmoid(x)) * this.Sigmoid(x);
    // }

    Update() {
        this.camera.position.copy(this.path.getPoint(this.currentPosition));
        if (this.x < 1) {
            this.x += this.xDelta;
            this.currentPosition = this.basePosition + this.Sigmoid(4,this.x) * this.moveDistance;
            if(this.currentPosition < 0) this.currentPosition = 0;
            if(this.currentPosition > 1) this.currentPosition = 1;
        }
    }


}