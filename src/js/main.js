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
        history.pushState(null,null,null);
        this.mainGraphic = new MainGraphic(this.styleController);
    }
}

$(document).ready(() => new App());