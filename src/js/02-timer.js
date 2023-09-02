import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const callender = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysCount = document.querySelector('span[data-days]');
const hoursCount = document.querySelector('span[data-hours]');
const minutesCount = document.querySelector('span[data-minutes]');
const secondsCount = document.querySelector('span[data-seconds]');
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');
const date = new Date();

// Styling visual interface  //
timer.style.display = 'flex';

for (let field of fields) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.margin = '5px';
  field.style.alignItems = 'center';
}
for (let value of values) {
  value.style.fontSize = '30px';
}
for (let label of labels) {
  const upperCase = label.textContent.toUpperCase();
  label.textContent = upperCase;
  label.style.fontSize = '13px';
}

//  Flatpickr setup  //
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

//  Time calculator  //
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

//  Adding 0 before one digit numbers  //
function addLeadingZero(value) {
  let text = value.toString();
  if (text.length < 2) {
    let padded = text.padStart(2, '0');
    return padded;
  } else {
    return value;
  }
}
//  Setting the timer  //
let intervalId = null;

const timeCounter = () => {
  let timeDifference =
    flatCallender.selectedDates[0].getTime() - new Date().getTime();
  let counter = convertMs(timeDifference);
  if (timeDifference > 0) {
    daysCount.textContent = addLeadingZero(counter.days);
    hoursCount.textContent = addLeadingZero(counter.hours);
    minutesCount.textContent = addLeadingZero(counter.minutes);
    secondsCount.textContent = addLeadingZero(counter.seconds);
  } else {
    clearInterval(intervalId);
  }
};
const setTimeCounter = () => {
  intervalId = setInterval(timeCounter, 1000);
};

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', setTimeCounter);
