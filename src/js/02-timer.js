import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const flatpickr = require('flatpickr');
let selectedDate = '';
const button = document.querySelector('button');
let timerID = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = new Date(selectedDates[0]).getTime();
  },
};
function onStart() {
  let now = new Date().getTime();
  if (selectedDate < now) {
    Notify.warning('wrong time');
  } else {
    selectedDate = selectedDate - now;
    let rez = convertMs(selectedDate);
    setTime(rez);
    timerID = setInterval(minus, 1000);
    button.setAttribute('disabled', 'disabled');
  }
}

button.addEventListener('click', onStart);

function minus() {
  selectedDate = selectedDate - 1000;
  if (selectedDate < 0) {
    Notify.success('time is over');
    clearInterval(timerID);
    button.removeAttribute('disabled');
  } else {
    let rez = convertMs(selectedDate);
    setTime(rez);
  }
}
function setTime(rez) {
  let fields = document.querySelectorAll('.value');
  fields.forEach(field => {
    if (field.dataset.days === '') {
      let rezultd = rez.days;
      if (parseInt(rez.days) < 10) {
        rezultd = `0${rez.days}`;
      }
      field.innerHTML = rezultd;
    }
    if (field.dataset.hours === '') {
      let rezulth = rez.hours;
      if (parseInt(rez.hours) < 10) {
        rezulth = `0${rez.hours}`;
      }
      field.innerHTML = rezulth;
    }
    if (field.dataset.minutes === '') {
      let rezultm = rez.minutes;
      if (parseInt(rez.minutes) < 10) {
        rezultm = `0${rez.minutes}`;
      }
      field.innerHTML = rezultm;
    }
    if (field.dataset.seconds === '') {
      let rezults = rez.seconds;
      if (parseInt(rez.seconds) < 10) {
        rezults = `0${rez.seconds}`;
      }
      field.innerHTML = rezults;
    }
  });
}

flatpickr('#datetime-picker', options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
