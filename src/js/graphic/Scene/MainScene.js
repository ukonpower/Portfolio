import BaceScene from './BaceScene.js';
import * as THREE from 'three'
import * as OrbitControls from 'three-orbit-controls';

export default class MainScene extends BaceScene {

    constructor() {
        super();
        this.tick = 0;
        this.tickSpeed = 2;
        this.init();
    }

    init() {
        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.Fog(this.scene.background,1,15);

        this.camera.position.set(0, 2.5, 5)
        this.camera.rotation.set(-Math.PI / 14,0,0);

        var light = new THREE.AmbientLight(0xffffff, 0.8);
        light.position.set(2, 2, 2);
        light.castShadow = false;
        this.scene.add(light);

        light = new THREE.DirectionalLight(0xffffff,1);
        light.position.set(5,10,5);
        light.castShadow = true;
        this.scene.add(light);

        var geo = new THREE.PlaneGeometry(100,50);
        var material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0
        })

        var plane = new THREE.Mesh(geo,material);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        this.scene.add(plane);

        var geo = new THREE.CubeGeometry(1,1);
        material = new THREE.MeshStandardMaterial();
        this.cube = new THREE.Mesh(geo,material);
        this.cube.position.y = 1.25;
        this.cube.castShadow = true;
        this.scene.add(this.cube);
        
    }

    Update() {
        this.tick = (this.tick + this.tickSpeed) % 360;
        this.theta = Math.PI * 2 *  this.tick / 360;
        this.cube.position.y += Math.cos(this.theta) * 0.002;
        this.cube.rotateY(this.cursor.deltaX * 0.005);
    }


}