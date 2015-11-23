/* main.js */
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

  $('#fullpage').fullpage({
    sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#fff'],
    sectionSelector: '.vertical-scrolling',
    slideSelector: '.horizontal-scrolling',
    navigation: true,
    slidesNavigation: true,
    css3: true,
    controlArrows: true,
    anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
    menu: '#menu',

    afterLoad: function(anchorLink, index) {
      /* no side fp-nav in gallery */
      if (index == 4) {
          $('#fp-nav').hide();
        }
    },

    onLeave: function(index, nextIndex, direction) {
      if(index == 5) {
        $('#fp-nav').show();
      }
    },

    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
      if(anchorLink == 'fourthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(false, 'up');
        $header_top.css('background', 'transparent');
        $nav.css('background', 'transparent');
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