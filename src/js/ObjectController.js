import * as THREE from 'three';

export default class ObjectController {

    constructor(object) {
        this.object = object;
        this.baseRotation = 0;
        this.goalRotation = 0;
        this.currentRotation = object.rotation.y;

        this.basePosition = 0;
        this.goalPosition = 0;
        this.currentPosition = object.position.y;
        this.rotateRad = 0;
        this.moveDistance = 0;
        this.rotX = 1;
        this.posX = 1;
        this.xDelta = 0.01;
        this.Update();
    }

    Sigmoid(a, x) {
        var e1 = Math.exp(-a * (2 * x - 1));
        var e2 = Math.exp(-a);
        return (1 + (1 - e1) / (1 + e1) * (1 + e2) / (1 - e2)) / 2;
    }

    Move(pos){
        this.basePosition = this.currentPosition;
        this.goalPosition = pos;
        this.moveDistance = this.goalPosition - this.basePosition;
        this.posX = 0;
    }

    RotateIndex(index, length) {
        var rad = Math.PI * 2;
        this.currentRotation %= rad;
        this.baseRotation = this.currentRotation;
        this.goalRotation = -rad * index / length;

        this.rotateRad = this.goalRotation - this.currentRotation
        
        if (Math.abs(this.rotateRad) <= rad / 2) {
            this.rotX = 0;
        } else {
            console.log(this.rotateRad);
            if (this.rotateRad < 0)
                this.rotateRad = this.rotateRad + rad;
            else
                this.rotateRad = -(rad - this.rotateRad)

            this.rotX = 0;
        }
    }

    Update() {
        if (this.rotX < 1) {
            this.object.rotation.y = this.currentRotation;
            this.rotX += this.xDelta;
            this.currentRotation = this.baseRotation + this.Sigmoid(4, this.rotX) * this.rotateRad;
        }

        if (this.posX < 1) {
            this.object.position.y = this.currentPosition;
            this.posX += this.xDelta;
            this.currentPosition = this.basePosition + this.Sigmoid(4, this.posX) * this.moveDistance;
        }
        
        requestAnimationFrame(this.Update.bind(this));
    }


}