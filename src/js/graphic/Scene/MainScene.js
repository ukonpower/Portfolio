import BaceScene from './BaceScene.js';
import * as THREE from 'three'
import * as OrbitControls from 'three-orbit-controls';

export default class MainScene extends BaceScene {

    constructor() {
        super();
        this.mainObject;
        this.tick = 0;
        this.tickSpeed = 2;
        this.init();
    }

    init() {
        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 15);

        this.camera.position.set(0, 2.5, 5)
        this.camera.rotation.set(-Math.PI / 10, 0, 0);

        var light = new THREE.AmbientLight(0xffffff, 0.8);
        light.position.set(2, 2, 2);
        light.castShadow = false;
        this.scene.add(light);

        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(4, 10, 5);
        light.castShadow = true;
        this.scene.add(light);

        var geo = new THREE.PlaneGeometry(100, 50);
        var material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0
        })

        var plane = new THREE.Mesh(geo, material);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        this.scene.add(plane);

        this.AppearModel('plofile');
    }

    ChangeModel(contentName) {
        this.scene.remove(this.mainObject);
        this.AppearModel(contentName);
    }

    AppearModel(contentName) {
        var geometry;
        switch (contentName) {
            case "plofile":
            geometry = new THREE.CubeGeometry(1,1,1);
                break;
            case "pictures":
            geometry = new THREE.SphereGeometry(0.7,20,20);
                break;
            case "movies":
            geometry = new THREE.ConeGeometry(0.7,1.5,4);
                break;
            case "softwares":
            geometry = new THREE.TorusGeometry(0.6,0.2,20,50);
                break;
        }
        
        var material = new THREE.MeshStandardMaterial({
            roughness: 0.5
        });
        this.mainObject = new THREE.Mesh(geometry, material);
        this.mainObject.position.y = 1.25;
        this.mainObject.castShadow = true;
        this.scene.add(this.mainObject);

        // console.log(geometry);
        // geometry.dispose();
        // console.log(geometry);
        // material.dispose();
    }

    Update() {
        this.tick = (this.tick + this.tickSpeed) % 360;
        this.theta = Math.PI * 2 * this.tick / 360;
        this.mainObject.position.y += Math.cos(this.theta) * 0.002;
        this.mainObject.rotateY(this.cursor.deltaX * 0.005);
    }


}