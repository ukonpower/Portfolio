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
        this.onHashChange();
        this.init();
    }

    init() {
        // if(window.location != location.protocol + "//" + location.host + location.pathname + location.search)window.locationwindow.location = location.protocol + "//" + location.host + location.pathname + location.search;
       
        this.renderer.setSize(this.canvas.innerWidth(), this.canvas.innerHeight());
        this.canvas.prepend(this.renderer.domElement);
        this.canvas.children('canvas').css('position', 'absolute');

        this.currentScene.onOpenContents = this.OpenContents.bind(this);
        this.currentScene.onBackButtonClisk = this.CloseContents.bind(this);

        window.addEventListener('hashchange', this.onHashChange.bind(this));

        $('.back').on('click', (event) => {
            window.location = './#/menu/' + $(event.target).parent().attr('id');
        })

        $('.button_container').click(this.onMenuButtonClick.bind(this));
        this.Update();

        $('#guide').click((event) =>{
            var name = $(event.target).html();
            window.location = './#/contents/' + name.toLowerCase();
        });

        $(window).on('load',()=>{
            $('#load_anime').fadeOut(100);
            $('#loading').fadeOut(1500);
            
            if (this.userAgent.indexOf("iPhone") >= 0 || this.userAgent.indexOf("iPad") >= 0 || this.userAgent.indexOf("Android") >= 0) {
                window.addEventListener('touchstart', this.currentScene.onTouchStart.bind(this.currentScene));
                window.addEventListener('touchmove', this.currentScene.onTouchMove.bind(this.currentScene));
                window.addEventListener('touchend', this.currentScene.onTouchEnd.bind(this.currentScene));
            } else {
                window.addEventListener('mousedown', this.currentScene.onTouchStart.bind(this.currentScene));
                window.addEventListener('mousemove', this.currentScene.onTouchMove.bind(this.currentScene));
                window.addEventListener('mouseup', this.currentScene.onTouchEnd.bind(this.currentScene));
            }
        })
    }

    onMenuButtonClick(event) {
        if (!$(event.target).children('.menu_button').hasClass('selected_button')) {
            window.location = './#/menu/' + $(event.target).attr('id').split('_')[0];
        }
    }

    OpenContents(contentId) {
        $('#' + contentId).addClass('selected_content');
        this.styleController.OpenContents();

        this.currentScene.CameraRotation(contentId);
        this.currentScene.OpenContents(contentId);
    }

    CloseContents(contentId) {
        this.currentScene.CloseContents();
        this.currentScene.CameraRotation(contentId);
        this.styleController.CloseContents();
        this.styleController.ChangeActiveButton($('#' + contentId + "_button"));
    }

    onHashChange(event) {
        console.log('hash changed');
        
        var hashArray = window.location.hash.split('/');
        if (hashArray[1] == 'menu') {
            this.CloseContents(hashArray[2]);
        }

        if (hashArray[1] == 'contents') {
            this.OpenContents(hashArray[2]);
        }
    }
}