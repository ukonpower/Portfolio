import * as THREE from 'three';

export default class Graphic{

    constructor(scene){

        this.currentScene = scene;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.userAgent = navigator.userAgent;

        window.addEventListener('orientationchange',this.onOrientationDevice.bind(this));
        window.addEventListener('resize',this.onWindowResize.bind(this));


        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    init(){
        this.Update();
    }

    Update(){
        this.renderer.render(this.currentScene.scene,this.currentScene.camera);
        requestAnimationFrame(this.Update.bind(this));
    }

    onWindowResize(){
        if(this.userAgent.indexOf("iPhone") >= 0 || this.userAgent.indexOf("iPad") >= 0 || this.userAgent.indexOf("Android") >= 0){
            return;
        }
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(width,height);
        this.currentScene.Resize(width,height);
    }

    onOrientationDevice(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(height,width);
        this.currentScene.Resize(height,width);
    }
}