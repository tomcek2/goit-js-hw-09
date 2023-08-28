const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let intervalId = null;

const colorChanger = () => {
  body.style.backgroundColor = `${getRandomHexColor()}`;

  const colorInterval = () => {
    intervalId = setInterval(colorChanger, 1000);
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
  };
};
const stopColorInterval = () => {
  clearInterval(intervalId);
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
  console.log(`Interval with id ${intervalId} has stopped!`);
};

startBtn.addEventListener('click', colorInterval);
stopBtn.addEventListener('click', stopColorInterval);
