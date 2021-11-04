function counter() {
  let countdown = 5;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {

    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./index"
    }
  }, 1000);
}
function counterLogin() {
  let countdown = 5;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./signIn"
    }
  }, 1000);
}
function counterRegistro() {
  let countdown = 5;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./signUp"
    }
  }, 1000);
}