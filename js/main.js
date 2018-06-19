$(function(){
    function closeChat() {
        $('.js-open-chat').removeClass('active');
        $('.chat-message').removeClass('visible');
    }

    function initActions() {
        new Swiper('.swiper-container-team', {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            slidesPerView: 3,
            spaceBetween: 28,
            slidesPerGroup: 2,
            freeMode: true,
            freeModeSticky: true
        });

        $('.team-form').submit(function(event){
            event.preventDefault();
            var message = $('.chat-text').val();
            var pseudo = $('.chat-pseudo').val();
            $('.chat-messages').append('<div class="chat-message visible me"><p>' + message +  '</p><strong>- ' + pseudo + '</strong></div>');
            $('.chat-messages').stop().animate( { scrollTop: $('.chat-messages')[0].scrollHeight }, 500 ); // Go
			return false;
        });

        $('.js-ajax-page').click(function(event){
            event.preventDefault();
    
            var tab = $(this).data('tab');
            var page = $(this).data('page');
            appAjax(page, tab);
        });

        $('.profile-form').submit(function(event){
            event.preventDefault();
            var datas = $(this).serialize();

            $('.content-page').html('');

            $('.loader').addClass('visible');


            $.post('app/views/updateUser.php', datas, function(data){
                if (data === '202') {
                    setTimeout(function(){
                        appAjax('profile', 5);
                    }, 500);
                }
            });
        });

        $('.close-actu').click(function(event){
            event.preventDefault();
            $(this).closest('.actu').slideUp();
        });
    }

    var currentPos = 0;

    function checkTopBar() {
        if (screen.width <= 640) {
            var scrollTop = window.pageYOffset || document.body.scrollTop || $('.swiper-tabs-active').scrollTop();

            if (scrollTop < currentPos) {
                $('.topbar2').addClass('sticky');
            } else if (scrollTop > 50) {
                $('.topbar2').removeClass('sticky');
            } 

            currentPos = scrollTop;
        }
    }

    $('.js-open-chat').click(function(){
        $(this).toggleClass('active');

        if($(this).hasClass('active')) {
            $('.chat-messages').stop().animate( { scrollTop: 0 }, 0 );
            let time = 0;
            $('.chat-message').each(function(){
                time += 250;
                setTimeout(() => {
                    $(this).addClass('visible');
                }, time);
            });

            setTimeout(() => {
                $('.team-form').addClass('visible');
            },($('.chat-message').length + 1) * 250);
        } else {
            $('.chat-message').removeClass('visible');
        }
    });

    function changeTab() {
        $('.progress').each(function(time){
            setTimeout(() => {
                $(this).addClass('anim' + $(this).data('level'));
            }, (time * 100))
        });
    }

    $('.chat-close').click(function(){
        closeChat();
    });

    $(document).scroll(function(){
        checkTopBar();
    });

    // PARAMETERS : PAGE + ID PAGE (active onglet)
    function appAjax(page, tab) {
        if (typeof tab !== 'undefined') {
            var wantedTab = $('.item-menu:nth-of-type(' + tab + ')');
            $('.item-menu').removeClass('active');
            wantedTab.addClass('active');

            if (tab === 3) {
                $('.box-icon').addClass('boxed').attr('src', 'images/mailbox1.gif');
            } else if($('.box-icon').hasClass('boxed')) {
                $('.box-icon').removeClass('boxed').attr('src', 'images/mailbox2.gif');
            }  
        } 

        $('.application').css('opacity', 0);
        closeChat();

        $('#loader').addClass('visible');

        if (tab === 1) {
            $('.content-page').addClass('no-padding-bottom');
        } else {
            $('.content-page').removeClass('no-padding-bottom');
        }

        $.get('app/views/' + page + '.php', function(data){
            $('#loader').removeClass('visible');

            setTimeout(function(){
                $('.content-page').html(data);
                $('html, body').stop().animate( { scrollTop: 0 }, 0 );
                $('.application').css('opacity', 1);
                initActions();
                checkTopBar();

                changeTab(); // anim
            }, 200);
        });
    }

    checkTopBar();
    
    if (screen.width <= 640) {
        initActions();
        $('.application').css('opacity', 1);
        $('#loader').removeClass('visible');
        changeTab();

        $(document).on('click', '.js-get-page', function(event){
            event.preventDefault();
    
            var tab = $(this).data('tab');
            var page = $(this).data('page');
            appAjax(page, tab);    
        });
    } else {
        initActions();
    }
});

