import * as THREE from 'three';
import TVScene from './Scene/TVScene';
import MainScene from './Scene/MainScene';

export default class MainGraphic{

    constructor(){

        this.mainRenderer = new THREE.WebGLRenderer();
        this.mainRenderer.shadowMapEnabled = true;
        this.mainRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.wrapper = document.getElementById('tv');
        this.width = this.wrapper.width;
        this.height = this.wrapper.heights;
        this.currentScene = new TVScene();
        this.init();
    }

    init(){
        this.mainRenderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight);
        this.mainRenderer.setPixelRatio(window.devicePixelRatio);

        this.wrapper.append(this.mainRenderer.domElement);
        
        this.Update();
    }
    
    Update(){
        this.mainRenderer.render(this.currentScene.scene,this.currentScene.camera);
        this.currentScene.Update();
        requestAnimationFrame(this.Update.bind(this));
    }

    onWindowResize(){
        var width = this.width;
        var height = this.height;
        this.mainRenderer.setSize(width,height);
        this.currentScene.Resize(width,height);
    }

    onOrientationDevice(){
        var width = this.width;
        var height = this.height;
        this.mainRenderer.setSize(height,width);
        this.currentScene.Resize(height,width);
    }
}