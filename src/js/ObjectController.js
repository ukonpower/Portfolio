import * as THREE from 'three';

export default class ObjectController {

    constructor(object) {
        this.object = object;
        
        this.defaultSize = this.object.scale.x;
        this.defaultPosition = this.object.position.y;
        this.defaultRotation = this.object.rotation.y;

        this.baseRotation = 0;
        this.goalRotation = 0;
        this.currentRotation = object.rotation.y;

        this.basePosition = 0;
        this.goalPosition = 0;
        this.currentPosition = object.position.y;

        this.baseSize = 0;
        this.goalSize = 0;
        this.currentSize = object.scale.x;

        this.rotateDistance = 0;
        this.moveDistance = 0;
        this.sizeDistance = 0;

        this.rotX = 1;
        this.posX = 1;
        this.sizeX = 1;

        this.xDelta = 0.01;

        this.moving = false;
        this.Update();
    }

    Sigmoid(a, x) {
        var e1 = Math.exp(-a * (2 * x - 1));
        var e2 = Math.exp(-a);
        return (1 + (1 - e1) / (1 + e1) * (1 + e2) / (1 - e2)) / 2;
    }

    Move(pos){
        this.basePosition = this.object.position.y;
        this.goalPosition = pos;
        this.moveDistance = this.goalPosition - this.basePosition;
        this.posX = 0;
    }

    SizeChange(size){
        this.baseSize = this.currentSize;
        this.goalSize = size;
        this.sizeDistance = this.goalSize - this.baseSize;
        this.sizeX = 0;
    }

    RotateIndex(index, length) {
        var rad = Math.PI * 2;
        this.currentRotation %= rad;
        this.baseRotation = this.currentRotation;
        this.goalRotation = -rad * index / length;

        this.rotateDistance = this.goalRotation - this.currentRotation
        this.rotX = 0;

        // if (Math.abs(this.rotateDistance) <= rad / 2) {
        //     this.rotX = 0;
        // } else {
        //     console.log(this.rotateDistance);
        //     if (this.rotateDistance < 0)
        //         this.rotateDistance = this.rotateDistance + rad;
        //     else
        //         this.rotateDistance = -(rad - this.rotateDistance)

        //     this.rotX = 0;
        // }
    }

    Reset(){
        this.Move(this.defaultPosition);
        this.SizeChange(this.defaultSize);
    }

    Update() {
        if (this.rotX < 1) {
            this.object.rotation.y = this.currentRotation;
            this.rotX += this.xDelta;
            this.currentRotation = this.baseRotation + this.Sigmoid(6, this.rotX) * this.rotateDistance;
        }

        if (this.posX < 1) {
            this.posX += this.xDelta;
            this.object.position.y = this.basePosition + this.Sigmoid(6, this.posX) * this.moveDistance;
        }
        
        if (this.sizeX < 1) {
            this.object.scale.set(this.currentSize,this.currentSize,this.currentSize);
            this.sizeX += this.xDelta;
            this.currentSize = this.baseSize + this.Sigmoid(6, this.sizeX) * this.sizeDistance;
        } 

        // requestAnimationFrame(this.Update.bind(this));
    }

    get Moving(){
        if(this.rotX >= 1 && this.posX >= 1 && this.sizeX >= 1) return false;
        else return true;
    }

}