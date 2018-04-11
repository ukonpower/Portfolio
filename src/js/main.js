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
        this.mainGraphic = new MainGraphic();
        this.styleController = new StyleController();
        $('.button_container').click(this.onMenuButtonClick.bind(this));
    }

    onMenuButtonClick(event) {
        if (!$(event.target).children('.menu_button').hasClass('selected_button')) {
            this.styleController.ChangeActiveButton($(event.target));
            this.mainGraphic.ChangeModel($(event.target).attr('id'));
        }
    }



}

$(document).ready(() => new App());