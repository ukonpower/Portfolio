import $ from 'jquery';
export default class StyleController {
    constructor() {
        this.menu_button = $('menu_button');
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

    ChangePage(contentId) {

    }

}