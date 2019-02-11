$(document).ready( function(){
  // "Перейти к завершению"
  (function addToCheckout() {
    const
      $widget = $('.widget-checkout'),
      widget = document.querySelector('.widget-checkout'),
      $body = $('.body'),
      $parent = $widget.parent(),
      $firstItem = $('.gallery-item:first'),
      $sectionCheckout = $('.section-checkout');
    var positionToShow = false;

    // скрыть при загрузке
    $widget.remove();
    // показать если релоад на той же позиции
    showToCheckout();
    // Если 1-й gallery item <= прокрутке показать иначе скрыть
    $(window).scroll(function(){
      showToCheckout();
    });
    // При изменении ширины окна
    $(window).resize(function() {
      adapt();
    });
    // Переход к заявке
    widget.onmouseup = function() {
      const sectionCoords = $sectionCheckout.offset().top;
      window.scrollTo(0, sectionCoords + 10);
    };


    function showToCheckout() {
      positionToShow = false;
      $widget.remove();
      const coordsTop = $firstItem.get(0).getBoundingClientRect();
      const coordsBottom = $sectionCheckout.get(0).getBoundingClientRect();
      if (coordsTop.top <= 0 && coordsBottom.top > 0) {
        positionToShow = true;
        adapt();
      }
    }

    function adapt() {
      if (!positionToShow) return;

      function checkMobileWidth() {
        const scrollWidth = Math.max(
          document.body.scrollWidth, document.documentElement.scrollWidth,
          document.body.offsetWidth, document.documentElement.offsetWidth,
          document.body.clientWidth, document.documentElement.clientWidth
        );

        const mobileWidth = 576;

        if(scrollWidth <= mobileWidth) {
          return true;
        }

        return false;
      }

      if (checkMobileWidth()) {
        $widget.remove();
        $body.prepend($widget);
        $widget.addClass('widget-checkout_m');
        $widget.removeClass('widget-checkout');
      } else {
        $widget.removeClass('widget-checkout_m');
        $widget.addClass('widget-checkout');
        $widget.remove();
        $parent.prepend($widget);
      }
    }


  })();


});
