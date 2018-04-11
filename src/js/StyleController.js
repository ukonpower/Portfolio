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
        $('.content').each(function(){
            console.log($(this));
            $(this).fadeOut(100);
            // $(this).removeClass('selected_content');
        })

        var fadeIn = 400
        switch (pageNum) {
            case 0:
                $('#plofile').fadeIn(fadeIn);
                break;
            case 1:
                $('#pictures').fadeIn(fadeIn);
                break;
            case 2:
                $('#movies').fadeIn(fadeIn);
                break;
            case 3:
                $('#softwares').fadeIn(fadeIn);
                break;
        }
    }
}