import $ from 'jquery';
export default class StyleController {
    constructor() {
        this.menu_button = $('menu_button');
        this.viewContent = false;
        this.init();
    }

    init() {
    }

    ChangeActiveButton(activeBtn) {
        //アクティブボタンを変更
        $('.menu_button').each(function () {
            $(this).removeClass('selected_button');
        });
        activeBtn.children('.menu_button').addClass('selected_button');

        //アクティブコンテンツ名を変更
        var newText = activeBtn.attr('id').split('_')[0];
        this.ChangeGuideText(newText[0].toUpperCase() + newText.substring(1, newText.length));

    }

    ChangeGuideText(text) {
        $('#guide').animate({
            // width: '0px'
            opacity: 0
        }, 300, () => {
            $('#guide').html(text[0].toUpperCase() + text.substring(1, text.length));
            $('#guide').animate({
                // width: '35%'
                opacity: 1
            }, 300);
        })
    }

    OpenContents() {
        this.CloseMenu()
    }

    CloseContents() {
        this.OpenMenu();
        $('.content').each(function(){
            $(this).removeClass('selected_content');
        })
    }

    CloseMenu() {
        if (this.viewContent) return;
        this.viewContent = true;
        $('#title').fadeOut();
        $('#guide').fadeOut();
        $('#menu').fadeOut();
        $('.filter').animate({ opacity: '0' }, 1000, () => {
            $('.selected_content').fadeIn(1000);
            $('#main_graphic').css('position','initial');
            $('.back').fadeIn();
        });

    }

    OpenMenu() {
        if (this.viewContent == false) return;
        this.viewContent = false;
        $('.content').fadeOut(1000);
    
        $('#main_graphic').css('position','initial');  
        $('.filter').animate({ opacity: '1' }, 1000, () => {
            $('#title').fadeIn();
            $('#guide').fadeIn();
            $('#menu').fadeIn();
        });

    }

}