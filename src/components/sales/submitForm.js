import IMask from 'imask/esm/imask';
import 'imask/esm/masked/regexp';

import HttpRequest from '@/utils/HttpRequest';

const form = document.querySelector('form.form');
const SEND_TO = 'http://127.0.0.1';

const phone = form.querySelector("input[type='tel']");
const checkbox = form.querySelector("input[type='checkbox']");
const status = form.querySelector('.form__status');
const btn = form.querySelector('button');

let hideStatusTimeoutId = null;

const phoneMask = IMask(phone, {
  mask: '+7 000 000 0000',
  lazy: false, // make placeholder always visible
  placeholderChar: '#', // defaults to '_'
});

const validateInputs = () => {
  const isPhoneValid = /\+7 \d{3} \d{3} \d{4}/.test(`${phoneMask.value}`);
  const isCheckboxChecked = checkbox.checked;

  return isPhoneValid && isCheckboxChecked;
};

const showStatus = (type, text) => {
  const statusClass = `form__status--${type}`;
  const showClass = 'form__status--show';
  const allClasses = [statusClass, showClass];

  status.innerText = text;
  status.classList.add(statusClass, showClass);

  if (!hideStatusTimeoutId) {
    hideStatusTimeoutId = setTimeout(() => {
      status.classList.remove(...allClasses);
      btn.disabled = false;
      hideStatusTimeoutId = null;
    }, 2500);
  }
};

const submitForm = (e) => {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }

  if (!validateInputs()) {
    showStatus('error', 'validation error');
    console.error('validation error');
    return;
  }

  const data = new FormData(form);
  btn.disabled = true;

  HttpRequest.request(SEND_TO, data, 'POST')
    .then((res) => {
      showStatus('success', 'form submitted');
      console.log(res);
    })
    .catch((e) => {
      showStatus('error', 'error');
      console.error(e);
    });
};

form.addEventListener('submit', submitForm);
