import * as THREE from 'three';
import $ from 'jquery';
import MainScene from './Scene/MainScene.js';
import Graphic from './Graphic.js';
import StyleController from '../StyleController.js';

export default class MainGraphic extends Graphic {

    constructor() {
        super(new MainScene());
        this.styleController = new StyleController();
        this.canvas = $('#main_graphic');
        this.canvas.css('height', innerHeight);
        this.init();
    }

    init() {
        this.renderer.setSize(this.canvas.innerWidth(), this.canvas.innerHeight());
        this.canvas.prepend(this.renderer.domElement);
        this.canvas.children('canvas').css('position', 'absolute');

        this.currentScene.onOpenContents = this.onOpenContents.bind(this);
        this.currentScene.onBackButtonClisk = this.onCloseContents.bind(this);

        if (this.userAgent.indexOf("iPhone") >= 0 || this.userAgent.indexOf("iPad") >= 0 || this.userAgent.indexOf("Android") >= 0) {
            window.addEventListener('touchstart', this.currentScene.onTouchStart.bind(this.currentScene));
            window.addEventListener('touchmove', this.currentScene.onTouchMove.bind(this.currentScene));
            window.addEventListener('touchend', this.currentScene.onTouchEnd.bind(this.currentScene));
        } else {
            window.addEventListener('mousedown', this.currentScene.onTouchStart.bind(this.currentScene));
            window.addEventListener('mousemove', this.currentScene.onTouchMove.bind(this.currentScene));
            window.addEventListener('mouseup', this.currentScene.onTouchEnd.bind(this.currentScene));
        }

        window.addEventListener('hashchange',this.onHashChange.bind(this));
        $('.back').on('click', () => {
            window.history.back(1);
        })

        $('.button_container').click(this.onMenuButtonClick.bind(this));
        this.Update();
    }

    onMenuButtonClick(event) {
        if (!$(event.target).children('.menu_button').hasClass('selected_button')) {
            this.styleController.ChangeActiveButton($(event.target));
            this.CameraRotation($(event.target).attr('id'));
        }
    }

    onOpenContents(contentId) {
        $('#' + contentId).addClass('selected_content');
        location.href = "./#/contents/" + contentId;
        this.styleController.OpenContents();
    }

    onCloseContents() {
        this.styleController.CloseContents();
    }

    onHashChange(event){
        console.log(event);
        console.log(window.location);
        
    }

    CameraRotation(contentName) {
        this.currentScene.CameraRotation(contentName.split('_')[0]);
    }
}