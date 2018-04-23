import '@babel/polyfill';
import * as THREE from 'three';
import GLTF2Loader from 'three-gltf2-loader';
import Cursor from '../Cursor';
import ObjectController from '../../ObjectController';

GLTF2Loader(THREE);
window.THREE = THREE;
export default class BaceScene {

    constructor() {
        
        this.scene = new THREE.Scene();
        this.cameraParent = new THREE.Group();
        this.camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
        this.cameraController = new ObjectController(this.cameraParent);
        this.objects = new Array();
        this.mixers = new Array();
        this.clock = new THREE.Clock();
        this.cursor = new Cursor();

        this.objPosY = 1.3;

        var envMapPath = './Textures/EnvMap/';
        this.cubeTexture = new THREE.CubeTextureLoader().load([
            envMapPath + 'right.jpg',
            envMapPath + 'left.jpg',
            envMapPath + 'up.jpg',
            envMapPath + 'down.jpg',
            envMapPath + 'front.jpg',
            envMapPath + 'back.jpg'
        ]);

        this.scene.add(this.cameraParent);
        this.cameraParent.add(this.camera);
        window.scene = this.scene;
    }

    Update() {

    }

    async loadGLTF(contentName,index) {
        var loader = new THREE.GLTFLoader()
        var object;
        
        loader.load('./models/' + contentName + '.glb', gltf => {
            object = gltf.scene;
            var animations = gltf.animations;
            
            object.traverse((child) => {
                if (child.isMesh) {
                    child.material.envMap = this.cubeTexture;
                    child.material.reflectivity = 5;
                }
            });
            
            if (animations && animations.length) {
                this.mixers.unshift(new THREE.AnimationMixer(object));
                this.mixers[0].clipAction(animations[0]).play();
            }
            var rad = Math.PI * 2;
            var theta = rad * index / this.objects.length;
            object.position.set(Math.sin(theta) * 5, this.objPosY, -Math.cos(theta) * 5);
            object.rotation.set(0,-theta,0)
            object.name = contentName;
            
            this.scene.add(object);
        });
    }

    Resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        console.log(this.camera.aspect);
    }

    onTouchStart(event) {
        this.cursor.MouseDown(event);
    }

    onTouchMove(event) {
        this.cursor.MouseMove(event);
    }

    onTouchEnd(event) {
        this.cursor.MouseUp(event);
    }
}