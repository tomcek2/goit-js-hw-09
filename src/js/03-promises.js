const firstDelay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btn = document.querySelector('button[type="submit');

let delayCounter;
let positionCounter;

function createPromise(position, delay) {
  //  Loop break by amount  //
  if (Number(amount.value) < position) {
    return;
  }
  const promisObj = {
    position: position,
    delay: delay,
  };
  const shouldResolve = Math.random() > 0.3;
  //  Promise  //
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(() => {
          return promisObj;
        });
      } else {
        reject(() => {
          return promisObj;
        });
      }
    }, delay);
  });

  promise
    .then(promisObj => {
      console.log(`Fulfilled promise ${position} in ${delay}ms`);
      // Premaring next iteration  //
      positionCounter = position + 1;
      delayCounter = delay + Number(step.value);
      createPromise(positionCounter, delayCounter);
      return;
    })
    .catch(promisObj => {
      console.log(`Rejected promise ${position} in ${delay}ms`);
      // Premaring next iteration  //
      positionCounter = position + 1;
      delayCounter = delay + Number(step.value);
      createPromise(positionCounter, delayCounter);
      return;
    });
}

function massPromiseCreator(e) {
  e.preventDefault();
  delayCounter = Number(firstDelay.value);
  positionCounter = 1;
  createPromise(positionCounter, delayCounter);
}

btn.addEventListener('click', massPromiseCreator);
