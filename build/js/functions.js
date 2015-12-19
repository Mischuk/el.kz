$(document).ready(function(){
  //Functions

  function links() {
    $('a[href=#]').click(function(e){
      e.preventDefault()
    });
    $('.lang-menu').dropit();
    $('.mobile-menu-trigger').click(function(){
      $(this).toggleClass('active');
      $('.user-panel, .mobile-nav').toggleClass('show');
      return false;
    });

    $('.icon-image').on('click', function(){
      $(this).next().trigger('click');
      $(this).parent().parent().parent().removeClass('error');
    });

    $('.toggle-info a').on('click', function(){
      $('.profile-user-info-hidden').fadeToggle(300);
      $(this).text(function(i, text){
        return text === "показать подробную информацию" ? "скрыть подробную информацию" : "показать подробную информацию";
      });
      $(this).toggleClass('opened');
    })
  };

  function selects() {
    $('select').each(function () {
        var $thisSelect = $(this),
            numberOfOptions = $(this).children('option').length;
        $thisSelect.addClass('s-hidden');
        $thisSelect.wrap('<div class="select"></div>');
        $thisSelect.after('<div class="styledSelect"></div>');
        var $styledSelect = $thisSelect.next('div.styledSelect');
        $styledSelect.text($thisSelect.children('option').eq(0).text());
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $thisSelect.children('option').eq(i).text(),
                rel: $thisSelect.children('option').eq(i).val()
            }).appendTo($list);
        }
        var $listItems = $list.children('li');
        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.styledSelect.active').each(function () {
                $(this).removeClass('active').next('ul.options').hide();
            });
            $(this).toggleClass('active').next('ul.options').toggle();
        });
        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $thisSelect.val($(this).attr('rel'));
            $list.hide();
        });
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
  };

  function sbUsers() {
    var $checkUsers = $('#sb-users');
    var $topUsers = $('.top-users');
    var $latestUsers = $('.latest-users')
    var $checkUsersButtons = $('.sidebar-users form span');
    var $formUsers = $('.sidebar-users form');
    function check() {
      if ($checkUsers.is(':checked')) {
        $topUsers.fadeOut(250, function(){
          $latestUsers.fadeIn(250);
          $('.sidebar-users form').addClass('active');
        });
        $checkUsersButtons.removeClass('current');
        $formUsers.find('.latest').addClass('current');
      } else {
        $latestUsers.fadeOut(250, function(){
          $topUsers.fadeIn(250);
          $('.sidebar-users form').removeClass('active');
        });
        $checkUsersButtons.removeClass('current');
        $formUsers.find('.top').addClass('current');
      }
    };
    $checkUsers.on('click', function(){
      check();
    });
    $('.sidebar-users form .latest').on('click', function(){
      $checkUsers.prop('checked', true);
      check();
    });
    $('.sidebar-users form .top').on('click', function(){
      $checkUsers.prop('checked', false );
      check();
    });
  };

  function carousels() {
    $('.single-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        responsive:{
          0:{
              items:1
          }
        }
    });

    $('.fourth-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        responsive:{
          0:{
              items:1,
              margin:0
          },
          640:{
              items:3,
              margin:15
          },
          1280:{
              items:4
          }
        }
    });

    $('.fifth-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        responsive:{
          0:{
              items:5
          }
        }
    });
  };

  function leadTabs() {
    $('.lead-tabs .header .new').on('click', function(){
      $(this).parents('.header').find('span').find('a').removeClass('current');
      $(this).addClass('current');
      $(this).parents('.header').next().find('.top-list').hide();
      $(this).parents('.header').next().find('.new-list').fadeIn(300);
    });
    $('.lead-tabs .header .top').on('click', function(){
      $(this).parents('.header').find('span').find('a').removeClass('current');
      $(this).addClass('current');
      $(this).parents('.header').next().find('.new-list').hide();
      $(this).parents('.header').next().find('.top-list').fadeIn(300);
    });
  };

  function mobileArticleTabs() {
    var $leadTabsMobileTrigger = $('.lead-tabs-mobile-triggers a');
    var $leadBlog = $('.lead-blogs');
    var $leadArticle = $('.lead-articles');
    $('.lead-tabs-mobile-triggers .article').on('click', function(){
      $leadTabsMobileTrigger.removeClass('current');
      $(this).addClass('current');
      $leadBlog.fadeOut(300);
      $leadArticle.fadeIn(300);
    });
    $('.lead-tabs-mobile-triggers .blog').on('click', function(){
      $leadTabsMobileTrigger.removeClass('current');
      $(this).addClass('current');
      $leadBlog.fadeIn(300);
      $leadArticle.fadeOut(300);
    });
  };

  function attachedIndex() {
    $('.group-post').each(function(){
      $('.attached').each(function(){
        if($(this).find('table tr td').size() == 1) {
         $(this).addClass('full')
        }
      });
    });
  };

  function formValidation() {
    $('#form-signup_v2').fadeOut(0);
    $('#form-signup_v1').validate({
        submit: {
            settings: {
                inputContainer: '.field',
                errorListClass: 'ui red pointing below label'
            },
            callback: {
                onSubmit: function (node, formData) {
                  $('#form-signup_v1').fadeOut('300', function() {
                    $('#form-signup_v2').fadeIn(300);
                    $("html, body").animate({ scrollTop: 0 }, "300");
                  });
                }
            }
        }
    });
    $('#form-signup_v2').validate({
        submit: {
            settings: {
                inputContainer: '.field',
                errorListClass: 'ui red pointing below label'
            }
        }
    });
  };

  function helper() {
    $('.profile-images').prev().addClass('no-bdr');
  };

  function profileContentTab() {
    $('.profile-images .all-images').on('click', function(){
      $('.profile-images .tabs a').removeClass('current');
      $(this).addClass('current');
      $('.lead-photos.albums').fadeOut(200, function() {
        $('.lead-photos.images').fadeIn(200)
      });
    });

    $('.profile-images .all-albums').on('click', function(){
      $('.profile-images .tabs a').removeClass('current');
      $(this).addClass('current');
      $('.lead-photos.images').fadeOut(200, function() {
        $('.lead-photos.albums').fadeIn(200)
      });
    });
  };

  function imageGallery() {

    $('.image-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.slider-nav'
    });

    $('.image-slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.image-slider',
      dots: false,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
      responsive: [
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
      ]
    });
    $('.relative-video').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      centerMode: false,
      focusOnSelect: false,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });
  };

  function videoPlayer() {
    $('video').mediaelementplayer({
      //mode: 'shim',
      success: function(player, node) {
        $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
      }
    });
  };

  //Functions initial
  links();
  selects();
  sbUsers();
  carousels();
  leadTabs();
  mobileArticleTabs();
  attachedIndex();
  formValidation();
  helper();
  profileContentTab();
  imageGallery();
  videoPlayer();
});
/******************************************/
/*   LOAD                                 */
/******************************************/
$(window).on('load', function () {
  function flipster() {
    $('.flipster__item--current').addClass('shadow');
    $('body').on('click', '.flipster__button, .flipster__item', function(){
      $('.my-flipster li').removeClass('shadow');
      $('.flipster__item--current').addClass('shadow');
    });
  };
  flipster();

  function calendar() {
    var datepicker = $('.calendar').datepicker({
      onRenderCell: function(date, cellType) {
        if (cellType == 'day' && date.getDate() == 11) {
          return {
            classes: 'events',
            disabled: false
          }
        } else {
          if (cellType == 'day' && date.getDate() == 16) {
            return {
              classes: 'events',
              disabled: false
            }
          }
        }
      }
    });
  };
  calendar();

  $('.video-player, #mediawrapper').addClass('loaded');

  $('audio').mediaelementplayer({
    loop: true,
    shuffle: false,
    playlist: true,
    audioHeight: 30,
    playlistposition: 'bottom',
    features: ['playlistfeature', 'prevtrack', 'playpause', 'nexttrack', 'current', 'progress', 'duration' ],
        keyActions: []
  });



  if ($(window).width() > 1280) {
    $('.single-carousel').addClass('sliced');
    $('.lead-news').removeClass('mobile-active').addClass('desktop-active');
  }
});

/******************************************/
/*   LOAD and RESIZE                      */
/******************************************/
$(window).on('load resize', function(){
  var $singleCarousel = $('.single-carousel');
  var $flipster = $('.my-flipster');

  /* Min-width: 1280 */
  if ($(window).width() <= 1280) {
    $('html').addClass('w1280');
    function newsToMobile() {
      $singleCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $singleCarousel.find('.owl-stage-outer').children().unwrap();
      $singleCarousel.find('.news-item').unwrap();
      $singleCarousel.removeClass('sliced')
      $singleCarousel.owlCarousel({
          loop:true,
          margin:15,
          nav:true,
          mouseDrag: false,
          touchDrag: false,
          pullDrag: false,
          responsive:{
            0:{
                items:1,
                margin:0
            },
            640:{
                items:3
            }
          }
      });
      $('.lead-news').addClass('mobile-active').removeClass('desktop-active');
    };
    if ($('.lead-news').hasClass('mobile-active')) {
      return false;
    } else {
      newsToMobile();
    };
    $flipster.removeClass('flipster flipster--transform flipster--carousel flipster--click flipster--active');
    $flipster.find('ul').removeClass('flipster__container');
    $flipster.find('li').removeClass();
  } else {
    $('html').removeClass('w1280');
    $flipster.flipster({
        itemContainer: 'ul',
        itemSelector: 'li',
        start: 'center',
        fadeIn: 100,
        loop: false,
        autoplay: false,
        pauseOnHover: true,
        style: 'carousel',
        spacing: -0.6,
        click: true,
        keyboard: false,
        scrollwheel: false,
        touch: true,
        nav: false,
        buttons: true,
        buttonPrev: 'Previous',
        buttonNext: 'Next',
        onItemSwitch: false
    });
  }
  /* Min-width: 625 */
  if ($(window).width() <= 625) {
    $('.lead-calendar').addClass('mobile');
    var datepicker = $('.calendar').datepicker({
      onRenderCell: function(date, cellType) {
          if (cellType == 'day' && date.getDate() == 11) {
            return {
              classes: 'events',
              disabled: false
            }
          } else {
            if (cellType == 'day' && date.getDate() == 16) {
              return {
                classes: 'events',
                disabled: false
              }
            }
          }
        }
    });
    function datepickerMobile() {
      $('.calendar-trigger').text($('.-current-').text());
      $('.calendar-trigger').on('click', function(){
        $('.datepicker--content').fadeIn(300);
      });


      $('.datepicker--nav').on('click', function(){
        $('.datepicker--content').fadeIn(0);
      });
      $('.datepicker--nav-title').on('click', function(){
        $('.datepicker--content').fadeIn(0);
        return false;
      });

      $('.datepicker--cell').on('click', function(){
        if ($(this).hasClass('events')){
          var val = $(this).text();
          $('.calendar-trigger').text(val);
          $('.datepicker--content').fadeOut(0);
          return false;
        } else {
          $('.datepicker--content').fadeOut(0);
          return false;
        }
      });
    };
    datepickerMobile();
  } else {
    $('.lead-calendar').removeClass('mobile');
  }
});
/******************************************/
/*   RESIZE                               */
/******************************************/
$(window).on('resize', function(){
  var $singleCarousel = $('.single-carousel');
  if ($(window).width() > 1280) {
    function newsToDesktop() {
      $singleCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $singleCarousel.find('.owl-stage-outer').children().unwrap();
      function hideElems() {
        var divs = $(".single-carousel .news-item");
        function hideWorks(){
          for(var i = 0; i < divs.length; i+=8) {
            divs.slice(i, i+8).wrapAll("<div class='item'></div>");
          };
        }
        $singleCarousel.addClass('sliced');
        hideWorks();
      };
      if ($singleCarousel.hasClass('sliced')) {
        return false;
      } else {
        hideElems();
        $singleCarousel.owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            mouseDrag: false,
            touchDrag: false,
            pullDrag: false,
            responsive:{
              0:{
                  items:1
              }
            }
        });
      }
      $('.lead-news').removeClass('mobile-active').addClass('desktop-active');
    };
    if ($('.lead-news').hasClass('desktop-active')) {
      return false;
    } else {
      newsToDesktop();
    }
  }
});
$(window).on('load', function(){
  if ( $( ".sidebar #mediawrapper" ).length ) {
    $(".sidebar .mejs li").append("<button class='pp'></button>");
    $(".sidebar .mejs li").append("<button class='prev'></button>");
    $(".sidebar .mejs li").append("<button class='next'></button>");
    margTop = 75;
    $('body').on('click','.sidebar .mejs li', function(){
        var aud = $(this).offset().top - margTop;
        $('.sidebar .mejs-time-rail').css('top', aud);
    });
    var aud = $('.sidebar .mejs li.current').offset().top - margTop;

    $('.sidebar .mejs-time-rail').css('top', aud);
    $('#mejs').bind('ended, playing, pause, loaded', function(e) {});
    var player = document.getElementById('mejs');
    player.addEventListener('ended', function(e) {
       var aud = $('.mejs li.current').offset().top - margTop
        $('.mejs-time-rail').css('top', aud)
    });

    $('body').on('click', '.sidebar .mejs .current.paused', function(){
      $('.sidebar .mejs-playpause-button.mejs-pause button').trigger('click');
    });

    player.addEventListener('playing', function(e) {
      $('.sidebar .mejs li').removeClass('paused played');
      $('.sidebar .mejs li.current').addClass('paused');
      return false;
    });
    player.addEventListener('pause', function(e) {
      $('.sidebar .mejs li.current').removeClass('paused').addClass('played');
      return false;
    });

    $('body').on('click', '.sidebar li .prev', function(){
        $('.sidebar .mejs-prevtrack-button button').trigger('click');
        return false;
    });
    $('body').on('click', '.sidebar li .next', function(){
        $('.sidebar .mejs-nexttrack-button button').trigger('click');
        return false;
    });
    $('body').on('click', '.sidebar .mejs-nexttrack-button button, .sidebar .mejs-prevtrack-button button, .sidebar .mejs-playpause-button button', function(){
        var ch = $('.sidebar .mejs li.current').offset().top - margTop;
        $('.sidebar .mejs-time-rail').css('top', ch);
    });
  }

  if ( $( ".sidebar .playlist #mediawrapper" ).length ) {
    margTop = 40;
    var audDiff = $('.sidebar .playlist #mediawrapper').offset().top;
    var aud = $('.sidebar .playlist .mejs li.current').offset().top + margTop;
    var newAud = aud - audDiff;
    $('.sidebar .playlist .mejs-time-rail').css('top', newAud);

    $('body').on('click', '.sidebar .playlist .mejs-nexttrack-button button, .sidebar .playlist .mejs-prevtrack-button button, .sidebar .playlist .mejs-playpause-button button', function(){
        margTop = 40;
        var audDiff = $('.sidebar .playlist #mediawrapper').offset().top;
        var aud = $('.sidebar .playlist .mejs li.current').offset().top + margTop;
        var newAud = aud - audDiff;
        $('.sidebar .playlist .mejs-time-rail').css('top', newAud);
    });
    $('body').on('click','.sidebar .mejs li', function(){
        var audDiff = $('.sidebar .playlist #mediawrapper').offset().top;
        var aud = $('.sidebar .playlist .mejs li.current').offset().top + margTop;
        var newAud = aud - audDiff;
        $('.sidebar .playlist .mejs-time-rail').css('top', newAud);
    });
    var player = document.getElementById('mejs');
    player.addEventListener('ended', function(e) {
      var audDiff = $('.sidebar .playlist #mediawrapper').offset().top;
      var aud = $('.sidebar .playlist .mejs li.current').offset().top + margTop;
      var newAud = aud - audDiff;
      $('.sidebar .playlist .mejs-time-rail').css('top', newAud);
    });
  }

  if ( $( ".audio-post #mediawrapper" ).length ) {
    $(".audio-post .mejs li").append("<button class='pp'></button>");
    $(".audio-post .mejs li").append("<button class='prev'></button>");
    $(".audio-post .mejs li").append("<button class='next'></button>");
    margTop = 75;
    $('body').on('click','.audio-post .mejs li', function(){
        var aud = $(this).offset().top - margTop;
        $('.audio-post .mejs-time-rail').css('top', aud);
    });
    var aud = $('.audio-post .mejs li.current').offset().top - margTop;
    $('.audio-post .mejs-time-rail').css('top', aud);
    $('#mejs').bind('ended, playing, pause, loaded', function(e) {});
    var player = document.getElementById('mejs');
    player.addEventListener('ended', function(e) {
       var aud = $('.mejs li.current').offset().top - margTop
        $('.mejs-time-rail').css('top', aud)
    });

    $('body').on('click', '.audio-post .mejs .current.paused', function(){
      $('.audio-post .mejs-playpause-button.mejs-pause button').trigger('click');
    });

    player.addEventListener('playing', function(e) {
      $('.audio-post .mejs li').removeClass('paused played');
      $('.audio-post .mejs li.current').addClass('paused');
      return false;
    });
    player.addEventListener('pause', function(e) {
      $('.audio-post .mejs li.current').removeClass('paused').addClass('played');
      return false;
    });

    $('body').on('click', '.sidebar li .prev', function(){
        $('.audio-post .mejs-prevtrack-button button').trigger('click');
        return false;
    });
    $('body').on('click', '.sidebar li .next', function(){
        $('.audio-post .mejs-nexttrack-button button').trigger('click');
        return false;
    });
    $('body').on('click', '.audio-post .mejs-nexttrack-button button, .audio-post .mejs-prevtrack-button button, .audio-post .mejs-playpause-button button', function(){
        var ch = $('.audio-post .mejs li.current').offset().top - margTop;
        $('.audio-post .mejs-time-rail').css('top', ch);
    });
  }


  /* Main audio */
  if ( $( ".large-audio" ).length ) {
    $('#mejs-main').bind('ended, playing, pause, loaded, play', function(e) {});
    var player = document.getElementById('mejs-main');
    player.addEventListener('play', function(e) {
      var artist = $('.large-audio li.current .track-artist').text();
      var song = $('.large-audio li.current .track-title-player').text();
      $('.track-title .artist').text(artist);
      $('.track-title .song').text(song);
    });

    player.addEventListener('playing', function(e) {
      $('.large-audio .mejs li').removeClass('paused played');
      $('.large-audio .mejs li.current').addClass('paused');
      return false;
    });
    player.addEventListener('pause', function(e) {
      $('.large-audio .mejs li.current').removeClass('paused').addClass('played');
      return false;
    });
    $('body').on('click', '.large-audio .mejs .current.paused', function(){
      $('.large-audio .mejs-playpause-button.mejs-pause button').trigger('click');
    });
  }

});
/*========================================*/
function eqH() {
  var sidebar = $('.sidebar');
  sidebar.css('height', 'auto');
  var FOOTER_HEIGHT = 165;
  var mH = $('main').height();
  var sH = sidebar.height()+166;
  var wH = $(window).height();
  if ( mH > sH) {
    sidebar.height(mH-3)
  } else {
    if ( (wH >= mH) && (wH >= sH)) {
     sidebar.height(wH - FOOTER_HEIGHT - 71)
   }
  }

};
$(window).resize(eqH);
$(window).load(eqH);
/*========================================*/