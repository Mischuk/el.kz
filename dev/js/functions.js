$(document).ready(function(){
  //Functions
  function links() {
    $('a[href=#]').click(function(e){
      e.preventDefault()
    });
    $('.mobile-menu-trigger').click(function(){
      $(this).toggleClass('active');
      $('.user-panel, .mobile-nav').toggleClass('show');
      return false;
    });
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
        });
        $checkUsersButtons.removeClass('current');
        $formUsers.find('.latest').addClass('current');
      } else {
        $latestUsers.fadeOut(250, function(){
          $topUsers.fadeIn(250)
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
    $('.lead-tabs-mobile-triggers .article').on('click', function(){
      $('.lead-tabs-mobile-triggers a').removeClass('current');
      $(this).addClass('current');
      $('.lead-blogs').fadeOut(300);
      $('.lead-articles').fadeIn(300);
    });
    $('.lead-tabs-mobile-triggers .blog').on('click', function(){
      $('.lead-tabs-mobile-triggers a').removeClass('current');
      $(this).addClass('current');
      $('.lead-blogs').fadeIn(300);
      $('.lead-articles').fadeOut(300);
    });
  };

  //Functions initial
  links();
  selects();
  sbUsers();
  carousels();
  leadTabs();

  mobileArticleTabs();
});
/*========================================*/
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

});
/*========================================*/
$(window).on('load', function() {
  if ($(window).width() > 1280) {
    $('.single-carousel').addClass('sliced');
    $('.lead-news').removeClass('mobile-active').addClass('desktop-active');
  }
});

$(window).on('load resize', function(){
  var $singleCarousel = $('.single-carousel');
  if ($(window).width() <= 1280) {
    $('html').addClass('w1280');
    function newsToMobile() {
      $singleCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $singleCarousel.find('.owl-stage-outer').children().unwrap();
      $('.single-carousel .news-item').unwrap();
      $('.single-carousel').removeClass('sliced')
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
    $('.my-flipster').removeClass('flipster flipster--transform flipster--carousel flipster--click flipster--active');
    $('.my-flipster ul').removeClass('flipster__container');
    $('.my-flipster li').removeClass();


  } else {
    $('html').removeClass('w1280');
    $('.my-flipster').flipster({
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
});
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
        $('.single-carousel').addClass('sliced');
        hideWorks();
      };
      if ($('.single-carousel').hasClass('sliced')) {
        return false;
      } else {
        hideElems();
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
/*========================================*/
$(window).on('load resize', function(){

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
/*========================================*/
function eqH() {
  $('.sidebar').css('height', 'auto');
  var mH = $('main').height();
  var sH = $('.sidebar').height();
  if ( mH > sH) { $('.sidebar').height(mH) }
};
$(window).resize(eqH);
$(window).load(eqH);
/*========================================*/