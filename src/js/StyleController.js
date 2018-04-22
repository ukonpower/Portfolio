import $ from 'jquery';
export default class StyleController {
    constructor() {
        this.menu_button = $('menu_button');
        this.viewContent = false;
        this.onWindowMoveFinish;
        this.init();
    }

    init() {
        $(window).scroll(this.animation.bind(this));
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
        this.CloseMenu();
    }

    CloseContents() {
        $("html,body").animate({
            scrollTop: 0
        },1000,)
        this.OpenMenu();
        if(this.onWindowMoveFinish) this.onWindowMoveFinish();
        $('.content').each(function(){
        $(this).removeClass('selected_content');
        });
        
    }

    CloseMenu() {
        if (this.viewContent) return;
        this.viewContent = true;
        $('#title').fadeOut();
        $('#guide').fadeOut();
        $('#menu').fadeOut();
        $('.filter').animate({ opacity: '0' }, 1000, () => {
            $('.selected_content').fadeIn(1000);
        this.animation();
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

    animation(){
        var $window = $(window);
        $('.fade_in').each(function(){
            var window_height = $window.height();
            var scroll = $window.scrollTop();
            var pos = $(this).offset().top; 
            $(this).css('transition','0.5s');
            if(scroll > pos - window_height + window_height / 2){
                $(this).css("opacity","1");
            }else{
                $(this).css("opacity","0.2");
            } 
        });
    
        $('img,.description,.video,.sub_description').each(function(){
            var window_height = $window.height();
            var scroll = $window.scrollTop();
            var pos = $(this).offset().top;
            $(this).css('transition','0.5s');
            if(scroll > pos - window_height + window_height / 15){
                $(this).css({
                    'opacity': 1,
                    'top': '0px'
                });
            }else{
                $(this).css({
                    'opacity': 0,
                    'top': '100px'
                });
            } 
        });
    
        $('.fade_slide').each(function(){
            var window_height = $window.height();
            var scroll = $window.scrollTop();
            var pos = $(this).offset().top;
            if(scroll > pos - window_height + window_height / 6){
                $(this).css({
                    'opacity': 1,
                    'left': '0px'
                });
            }else{
                $(this).css({
                    'opacity': 0,
                    'left': '100%'
                });
            } 
        });
    }

}