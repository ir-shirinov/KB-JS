'use strict';

(function () {
  // Фрагмент для наполнения элементами
  window.fragment = document.createDocumentFragment();

  // Шаблон меток на картах
  var TEMPLATE_PIN = document.querySelector('#pin').content.querySelector('.map__pin');

  // Создание контейнера с метками на карте
  for (var i = 0; i < window.data.apartments.length; i++) {
    var mapsPin = TEMPLATE_PIN.cloneNode(true);

    var widthPin = mapsPin.offsetWidth;
    var heightPin = mapsPin.offsetHeight;

    var pinX = window.data.apartments[i].location.x + widthPin / 2;
    var pinY = window.data.apartments[i].location.y + heightPin;

    // Нужно правильно вычислить координаты
    mapsPin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    mapsPin.querySelector('img').src = window.data.apartments[i].author.avatar;
    mapsPin.querySelector('img').alt = window.data.apartments[i].offer.title;
    mapsPin.id = 'maps-pin-' + i;
    window.fragment.appendChild(mapsPin);
  }
})();

