import * as THREE from 'three';
import $ from 'jquery';
import MainScene from './Scene/MainScene.js';
import Graphic from './Graphic.js';

export default class MainGraphic extends Graphic{

    constructor(){
        super(new MainScene());
        this.canvas = $('#main_graphic');
        this.canvas.css('height',innerHeight);
        this.init();
    }

    init(){
        this.renderer.setSize(this.canvas.innerWidth(),this.canvas.innerHeight());
        this.canvas.prepend(this.renderer.domElement);
        this.canvas.children('canvas').css('position','absolute');

        if(this.userAgent.indexOf("iPhone") >= 0 || this.userAgent.indexOf("iPad") >= 0 || this.userAgent.indexOf("Android") >= 0){    
            window.addEventListener('touchstart',this.currentScene.onTouchStart.bind(this.currentScene));
            window.addEventListener('touchmove',this.currentScene.onTouchMove.bind(this.currentScene));
            window.addEventListener('touchend',this.currentScene.onTouchEnd.bind(this.currentScene));
        }else{
            window.addEventListener('mousedown',this.currentScene.onTouchStart.bind(this.currentScene));
            window.addEventListener('mousemove',this.currentScene.onTouchMove.bind(this.currentScene));
            window.addEventListener('mouseup',this.currentScene.onTouchEnd.bind(this.currentScene));
        }

        this.Update();
    }
}