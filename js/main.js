/* main.js */

// photoswipe
$('.picture').each( function() {
  // Get the items.
  var $pic = $(this),
      getItems = function() {
          var items = [];
          $pic.find('a').each(function() {
              var $href   = $(this).attr('href'),
                  $size   = $(this).data('size').split('x'),
                  $width  = $size[0],
                  $height = $size[1];

              var item = {
                  src : $href,
                  w   : $width,
                  h   : $height
              }

              items.push(item);
          });
          return items;
      };

  var items = getItems();

  // Preload image.
  var image = [];
  $.each(items, function(index, value) {
      image[index]     = new Image();
      image[index].src = value['src'];
  });

  // Binding click event.
  var $pswp = $('.pswp')[0];
  $pic.on('click', 'figure', function(event) {
      event.preventDefault();

      var $index = $(this).index();
      var options = {
          index: $index,
          bgOpacity: 0.7,
          showHideOpacity: true
      }

      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();
  });
});

// project-list pager
$('.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 10;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('.project-item').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('.project-item').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertBefore($table).find('span.page-number:first').addClass('active');
});



$(document).ready(function (){

  // variables
  var $header_top = $('.header-top');
  var $mobile_header = $('.header-top .is-mobile');
  var $mobile_menu = $('.nav-menu .is-mobile');
  var $toggle_menu = $('.toggle-menu');
  var $nav = $('nav');

  // toggle menu
  $toggle_menu.on('click', function() {
    $mobile_header.toggleClass('open-menu');
    $('#fullpage').toggleClass('filter-blur');
  });

  $mobile_menu.find('a').on('click', function (){
    $mobile_header.toggleClass('open-menu');
    $('#fullpage').toggleClass('filter-blur');
  });

// fullpage.js setting
  $('#fullpage').fullpage({
    //sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#fff'],
    sectionSelector: '.vertical-scrolling',
    slideSelector: '.horizontal-scrolling',
    navigation: true,
    slidesNavigation: true,
    loopHorizontal: false,
    css3: true,
    controlArrows: true,
    anchors: ['home', 'about', 'service', 'works', 'contact'],
    menu: '#menu',
    normalScrollElements: '.picture, .pswp',
    normalScrollElementTouchThreshold: 3,
    fixedElements: '.pswp',

    afterLoad: function(anchorLink, index) {
      /* no side fp-nav in gallery */
      if (index == 4) {
          $('#fp-nav').hide();
        }
    },

    afterRender: function(){
      var pluginContainer = $(this);
      console.log("The resulting DOM structure is ready");
    },

    onLeave: function(index, nextIndex, direction) {
      if(index == 4) {
        $('#fp-nav').show();
      }
    },

    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
      if(index == 4 && slideIndex == 0) {
        $.fn.fullpage.setAllowScrolling(false, 'up');
        $('.fp-controlArrow').hide();
        console.log("into works menu");
        // $header_top.css('background', 'transparent');
        // $nav.css('background', 'transparent');
        // $(this).css('background', '#374140');
        // $(this).find('h2').css('color', 'white');
        // $(this).find('h3').css('color', 'white');
        // $(this).find('p').css(
        //   {
        //     'color': '#DC3522',
        //     'opacity': 1,
        //     'transform': 'translateY(0)'
        //   }
        // );
      }
    },

    onSlideLeave: function( anchorLink, index, slideIndex, direction) {
      if(anchorLink == 'fifthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(true, 'up');
        $header_top.css('background', 'rgba(0, 47, 77, .3)');
        $nav.css('background', 'rgba(0, 47, 77, .25)');
      }
    }
  });
});
