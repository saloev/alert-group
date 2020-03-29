import IMask from 'imask/esm/imask';
import 'imask/esm/masked/regexp';

import HttpRequest from '@/utils/HttpRequest';

const form = document.querySelector('form.form');
const SEND_TO = '127.0.0.1';

const phone = form.querySelector("input[type='tel']");
const checkbox = form.querySelector("input[type='checkbox']");
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

const submitForm = (e) => {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }

  if (!validateInputs()) {
    console.error('validation error');
    return;
  }

  const data = new FormData(form);

  HttpRequest.request(SEND_TO, data, 'POST')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    });
};

form.addEventListener('submit', submitForm);
