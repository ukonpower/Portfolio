import * as THREE from 'three'
import GLTF2Loader from 'three-gltf2-loader'
import Cursor from '../Cursor';
GLTF2Loader(THREE);

export default class BaceScene {

    constructor(canvas) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
        this.objects = new Array();
        this.mixers = new Array();
        this.clock = new THREE.Clock();

        this.cursor = new Cursor();
    }

    Update(){
        
    }

    Resize(width,height){
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        console.log(this.camera.aspect);
    }

    onTouchStart(event){
        this.cursor.MouseDown(event);
    }

    onTouchMove(event){
        this.cursor.MouseMove(event);
    }

    onTouchEnd(event){
        this.cursor.MouseUp();
    }
}