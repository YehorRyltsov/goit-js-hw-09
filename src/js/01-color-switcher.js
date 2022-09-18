function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let disabledButton = '';
const bodyEl = document.querySelector('body');
let timerID = 0;
bodyEl.addEventListener('click', onChangeColorButton);
function onChangeColorBody() {
  let hex = getRandomHexColor();
  bodyEl.style.backgroundColor = hex;
}
function onChangeColorButton(event) {
  let buttonStart = event.target.dataset.start;
  if (buttonStart === '') {
    event.preventDefault();
    disabledButton = event.target;
    timerID = setInterval(onChangeColorBody, 1000);
    event.target.setAttribute('disabled', 'disabled');
  }
  let buttonStop = event.target.dataset.stop;
  if (buttonStop === '') {
    event.preventDefault();
    clearInterval(timerID);
    disabledButton.removeAttribute('disabled');
  }
}
