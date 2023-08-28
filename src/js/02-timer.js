import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const callender = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const body = document.querySelector('body');
const daysCount = document.querySelector('span[data-days]');
const hoursCount = document.querySelector('span[data-hours]');
const minutesCount = document.querySelector('span[data-minutes]');
const secondsCount = document.querySelector('span[data-seconds]');
const date = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (date.getTime() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
    console.log(selectedDates[0]);
  },
};

const flatCallender = flatpickr(callender, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  let text = value.toString();
  if (text.length < 2) {
    let padded = text.padStart(2, '0');
    return padded;
  } else {
    return value;
  }
}
console.log(addLeadingZero(7));

let intervalId = null;
const timeCounter = () => {
  let counter = convertMs(
    flatCallender.selectedDates[0].getTime() - new Date().getTime()
  );
  if (flatCallender.selectedDates[0].getTime() - new Date().getTime() > 0) {
    daysCount.textContent = addLeadingZero(counter.days);
    hoursCount.textContent = addLeadingZero(counter.hours);
    minutesCount.textContent = addLeadingZero(counter.minutes);
    secondsCount.textContent = addLeadingZero(counter.seconds);
    // console.log(counter);
  } else {
    clearInterval(intervalId);
  }
};
const setTimeCounter = () => {
  intervalId = setInterval(timeCounter, 1000);
};

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', setTimeCounter);
