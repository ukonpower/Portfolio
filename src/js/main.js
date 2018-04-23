import $ from 'jquery';
import MainGraphic from './graphic/MainGraphic.js';
import PlofileGraphic from './graphic/PlofileGraphic.js';
import StyleController from './StyleController.js';

window.$ = $;
class App {

    constructor() {
        this.init();
        this.activePage = 0;
    }

    init() {
        window.location = './#/menu/plofile';
        this.mainGraphic = new MainGraphic(this.styleController);

        // $('img').click((event)=>{
        //     window.location = $(event.target).attr('src');
        //     console.log($(this));
        // })

    }
}

$(document).ready(() => new App());