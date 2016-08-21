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
        height: parseInt($("#playground").height()),
        width: parseInt($("#playground").width())
      },
      ball: {
        speed: 5,
        x: 150,
        y: 100,
        directionX: 1,
        directionY: 1
      }
    };

    function renderPaddles() {
      $("#paddleB").css("top", pingpong.paddleB.y);
      $("#paddleA").css("top", pingpong.paddleA.y);
    }

    function render() {
      renderBall();
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
      pingpong.timer = setInterval(gameloop, 1000/30);
      window.requestAnimationFrame(render);
      handleMouseInputs();
    }
    function gameloop() {
      moveBall();
    }
    function ballHitsTopBottom() {
      var y = pingpong.ball.y + pingpong.ball.speed * pingpong.ball.directionY;
      return y < 0 || y > pingpong.playground.height;
    }
    function ballHitsRightWall() {
      return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX > pingpong.playground.width;
    }
    function ballHitsLeftWall() {
      return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX < 0;
    }
    function playerAWin() {
      // reset ball
      pingpong.ball.x = 250;
      pingpong.ball.y = 100;
      // update ball location variables
      pingpong.ball.directionX = -1;
    }
    function playerBWin() {
      // reset ball
      pingpong.ball.x = 150;
      pingpong.ball.y = 100;
      pingpong.ball.directionX = 1;
    }
    function moveBall() {
      var ball = pingpong.ball;
      if (ballHitsTopBottom()) {
        ball.directionY *= -1;
      }
      if (ballHitsRightWall()) {
        playerAWin();
      }
      if (ballHitsLeftWall()) {
        playerBWin();
      }
      ball.x += ball.speed * ball.directionX;
      ball.y += ball.speed * ball.directionY;
    }
    function renderBall() {
      var ball = pingpong.ball;
      $("#ball").css({
        "left": ball.x + ball.speed * ball.directionX,
        "top": ball.y + ball.speed * ball.directionY
      });
    }

    init();

  }) (jQuery);

});
