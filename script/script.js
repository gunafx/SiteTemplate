$(document).ready(function () {
    
    //go-to top or bottom button
    $('.nav-top-down').on('click', function (e) {
        var elmObj = $(e.currentTarget);
        if (elmObj.hasClass('go-down')) {
            window.smoothScroll($('#profile')[0], 500,function(){
                elmObj.addClass('go-top');
                elmObj.removeClass('go-down');
            });
        }
        else if (elmObj.hasClass('go-top')) {
            window.smoothScroll(0, 700,function(){
                elmObj.removeClass('go-top');
                elmObj.addClass('go-down');
            });
        }
    });

    //popup events
    $('.popup-close').click(function (e) {
        $('.global-popup-wrap').hide();
        $('.global-popup').html("");
        $('.page-content-wrap').removeClass('blurit');
        $('html,body').css({overflow:"auto"});
    });
    $('.popup-cta').click(function (e) {
        var elmObj = e.target,
            popUpElm = $(elmObj).parents(".works-content-item").find('.work-popup').html().replace(/iframedummy/g,"iframe");

        $('.global-popup-wrap').show();
        $('.global-popup').html("<div class='work-popup'>" + popUpElm + "</div>");
        $('.page-content-wrap').addClass('blurit');
        $('html,body').css({overflow:"hidden"});
    });

    //scroll events - floading header & go-to-top button
    var menuShowHide = function() {
        if(document.getElementById("profile").getBoundingClientRect().top < 20) {
            $('.nav-header-inner').removeClass('nav-header-slider');
            $('.nav-header-inner').addClass('nav-header-float');
            
            $('.nav-top-down').addClass('go-top');
            $('.nav-top-down').removeClass('go-down');
        } 
        else if(document.getElementById("profile").getBoundingClientRect().top >= 20 && $('.nav-header-inner').hasClass('nav-header-float')){
            $('.nav-header-inner').removeClass('nav-header-float');
            $('.nav-header-inner').addClass('nav-header-slider');
            
            $('.nav-top-down').removeClass('go-top');
            $('.nav-top-down').addClass('go-down');
        }
        
        
        //menu update
        $(".section-wrap").each(function(i,v){
            if(v.getBoundingClientRect().top <= 200 && v.getBoundingClientRect().top > -20) {
                $('.activelink').removeClass('activelink');
                $('a[href="#'+$(v).attr('id')+'"]').addClass('activelink');
                
                $('.section-wrap').addClass('not-active');
                $(v).removeClass("not-active");
            }
        });
    };
    if($(window).width() > 767) {
        menuShowHide();
    }
    $(window).on("scroll",function(e){
        menuShowHide();
    });
    
    //mobile menu events
    $('.nav-button-mobile').on('click',function(e){
        var elmObj = $(e.currentTarget);
        elmObj.toggleClass('close');
        if($(elmObj).hasClass('close')) {
            $('.nav-header-float .nav-list').addClass('active');
        }
        else {
            $('.nav-header-float .nav-list').removeClass('active');        
        }
    });
    $('.nav-list-item a').on('click', function(e){
        $('.nav-button-mobile').toggleClass('close');
        $('.nav-header-float .nav-list').removeClass('active');
        setTimeout(function(){
            $('.activelink').removeClass('activelink');
            $(e.currentTarget).addClass('activelink');
            
            $('.section-wrap').addClass('not-active');
            $($(e.currentTarget).attr("href")).removeClass("not-active");
            
        },1100);
    });
    
    //contact me form
    $("#contact-me").on("submit",function(e){
        var fname = $()
        e.preventDefault();
        $.getJSON("https://script.google.com/macros/s/AKfycbxVnkCnhk4VpxyAsi3xBM2tZSlu1lpC-nRwKPNQ4nYClSM-4zY/exec?contactName="+"");
    });
    
    //Testimonial slider function
    var textSliderInit = function(elmStr) {
        
        var noOfElm = $(elmStr).find('li').length;
        $(elmStr).css({width:noOfElm*100+"%"});
        
        var elmWidth = $(elmStr).find('li').width(),
            navBtns = $("<div class='nav-slide-buttons'></div>"),
            autoSlideFlag = true;
        
        if(noOfElm > 1) {
            for(var i=0; i<noOfElm; i++) {
               navBtns.append("<span data-position='"+(elmWidth*i)+"' class='slide-nav-btn'></span>");
            }
            $(elmStr).parent().append(navBtns);
            
            $('.slide-nav-btn').on("click",function(e){
                var elmObj = $(e.currentTarget),
                    position = parseInt(elmObj.data("position"),10);
                
                $('.slide-nav-btn').removeClass('active');
                elmObj.addClass('active');
                
                $(elmStr).css({"transform": "translateX(-"+position+"px)"});
                
            });
            $($('.slide-nav-btn')[0]).addClass('active');
        }
    }
    textSliderInit(".clients-testi");
});