import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
}
function setTime(rez) {
  let fields = document.querySelectorAll('.value');
  fields.forEach(field => {
    if (field.dataset.days === '') {
      field.innerHTML = String(rez.days).padStart(2, '0');
    }
    if (field.dataset.hours === '') {
      field.innerHTML = String(rez.hours).padStart(2, '0');
    }
    if (field.dataset.minutes === '') {
      field.innerHTML = String(rez.minutes).padStart(2, '0');
    }
    if (field.dataset.seconds === '') {
      field.innerHTML = String(rez.seconds).padStart(2, '0');
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
