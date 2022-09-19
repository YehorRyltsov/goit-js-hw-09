import { Notify } from 'notiflix/build/notiflix-notify-aio';
let promisForm = document.querySelector('form');

function onFormSubmit(e) {
  e.preventDefault();
  let delay = parseInt(promisForm.elements['delay'].value);
  let step = parseInt(promisForm.elements['step'].value);
  let amount = parseInt(promisForm.elements['amount'].value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay + step;
  }
}
promisForm.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
