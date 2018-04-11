import $ from 'jquery';
export default class StyleController {
    constructor() {
        this.menu_button = $('menu_button');
        this.init();
    }

    init() {
    }

    ChangeActiveButton(activeBtn) {
        $('.menu_button').each(function () {
            $(this).removeClass('selected_button');
        });
        activeBtn.children('.menu_button').addClass('selected_button');
    }

    ChangePage(pageNum) {
        $('.content').each(function () {
            console.log($(this));
            $(this).fadeOut(100);
            // $(this).removeClass('selected_content');
        })

        var btn;
        switch (pageNum) {
            case 0:
                btn = "about";
                break;
            case 1:
                btn = "pictures";
                break;
            case 2:
                btn = "movies";
                break;
            case 3:
                btn = "softwares"
                break;
        }

        $('#guide').html(btn[0].toUpperCase() + btn.substring(1,btn.length));
        $('#' + btn).fadeIn(400);
    }
}