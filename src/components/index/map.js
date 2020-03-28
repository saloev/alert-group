/* eslint-disable no-undef */
import API_KEY from '@/config';

import placemarket from '@/assets/icons/placemarket.png';

const LINK_TO_YANDEX_MAP = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU&load=Map,Placemark`;

const map = document.querySelector('#map');
const main = document.querySelector('main');

let isMapLoaded = false;

const isMapVisible = () => {
  const { top, left, bottom, right } = map.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const hideLoader = () => {
  const loader = map.querySelector('.map__loader-wrap');
  if (loader) loader.remove();
};

const initMap = () => {
  isMapLoaded = true;

  const myMap = new ymaps.Map('map', {
    center: [59.9912173, 30.3167426],
    zoom: 15,
  });

  const placemark = new ymaps.Placemark(
    myMap.getCenter(),
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: placemarket,
      iconImageSize: [37, 37],
      iconImageOffset: [-5, -38],
    }
  );

  myMap.behaviors.disable('scrollZoom');

  myMap.geoObjects.add(placemark);
  hideLoader();
};

const loadMap = () => {
  const { body } = document;
  const script = document.createElement('script');
  script.src = LINK_TO_YANDEX_MAP;
  body.appendChild(script);
  script.onload = () => {
    if (typeof ymaps !== 'undefined') {
      ymaps.ready(initMap);
    }
  };
};

const pageScrolled = () => {
  if (isMapVisible() && !isMapLoaded) loadMap();
};

main.addEventListener('scroll', pageScrolled);
