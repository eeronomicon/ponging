// Back End Code


// Front End Code
$(document).ready (function(){

  (function($) {
    var pingpong = {
      paddleA: {
        x: 50,
        y: 100,
        width: 20,
        height: 70
      },
      paddleB: {
        x: 320,
        y: 100,
        width: 20,
        height: 70
      },
      playground: {
        offsetTop: $("#playground").offset().top,
      }
    };

    function renderPaddles() {
      $("#paddleB").css("top", pingpong.paddleB.y);
      $("#paddleA").css("top", pingpong.paddleA.y);
    }

    function render() {
      renderPaddles();
      window.requestAnimationFrame(render);
    }

    function handleMouseInputs() {
      $("#playground").mouseenter(function() {
        pingpong.isPaused = false;
      });
      $("#playground").mouseleave(function() {
        pingpong.isPaused = true;
      });
      $("#playground").mousemove(function(e) {
        pingpong.paddleB.y = e.pageY - pingpong.playground.offsetTop;
      });
    }

    function init() {
      window.requestAnimationFrame(render);
      handleMouseInputs();
    }

    // renderPaddles();
    init();

  }) (jQuery);

});
