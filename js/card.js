'use strict';


(function () {
  // Карта
  var map = document.querySelector('.map');

  // Фрагмент для наполнения элементами
  var fragment2 = document.createDocumentFragment();

  // Шаблон карточек аппартаментов
  var TEMPLATE_CARD = document.querySelector('#card').content.querySelector('.map__card');

  window.backend.load(function (data) {
    window.apartments = data;
    // Вставляем изображения
    var insertPhoto = function (popupPhotos) {
      for (var j = 0; j < window.apartments[i].offer.photos.length - 1; j++) {
        var newPhoto = popupPhotos.querySelector('img').cloneNode(true);
        popupPhotos.appendChild(newPhoto);
      }
      var newPhotos = popupPhotos.querySelectorAll('.popup__photo');
      for (var k = 0; k < window.apartments[i].offer.photos.length; k++) {
        newPhotos[k].src = window.apartments[i].offer.photos[k];
      }
      return popupPhotos;
    };

    // Оставляем в шаблоне только те удобства, которые есть в аппартаментах
    var deleteFeatures = function (popupFeatures) {
      while (popupFeatures.firstChild) {
        popupFeatures.removeChild(popupFeatures.firstChild);
      }
      for (var j = 0; j < window.apartments[i].offer.features.length; j++) {
        var newFeatures = document.createElement('li');
        var newClass = 'popup__feature--' + window.apartments[i].offer.features[j];
        newFeatures.classList.add('popup__feature', newClass);
        popupFeatures.appendChild(newFeatures);
      }
      return popupFeatures;
    };

    // Функция для передачи русского названия аппартаментов
    var getTypeRu = function (type) {
      var nameTypeRu;
      for (var i = 0; i < window.data.typeApartments.length; i++) {
        if (type === window.data.typeApartments[i]) {
          nameTypeRu = window.data.typeApartmentsRu[i];
        }
      }
      return nameTypeRu;
    };

    // Создание контейнера с объявлениями
    for (var i = 0; i < window.apartments.length; i++) {
      var mapsCard = TEMPLATE_CARD.cloneNode(true);

      mapsCard.querySelector('.popup__title').textContent = window.apartments[i].offer.title;
      mapsCard.querySelector('.popup__text--address').textContent = window.apartments[i].offer.address;
      mapsCard.querySelector('.popup__text--price').textContent = window.apartments[i].offer.price + ' ₽/ночь';
      mapsCard.querySelector('.popup__type').textContent = getTypeRu(window.apartments[i].offer.type);
      mapsCard.querySelector('.popup__text--capacity').textContent = window.apartments[i].offer.rooms + ' комнаты для ' + window.apartments[i].offer.guests + ' гостей';
      mapsCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.apartments[i].offer.checkin + ', выезд до ' + window.apartments[i].offer.checkout + '.';
      deleteFeatures(mapsCard.querySelector('.popup__features'));
      mapsCard.querySelector('.popup__description').textContent = window.apartments[i].offer.description;
      insertPhoto(mapsCard.querySelector('.popup__photos'));
      mapsCard.querySelector('.popup__avatar').src = window.apartments[i].author.avatar;
      mapsCard.classList.add('hidden');
      mapsCard.querySelector('.popup__close').id = 'popup__close-' + i;
      mapsCard.id = 'maps__card-' + i;

      fragment2.appendChild(mapsCard);
    }

    map.insertBefore(fragment2, map.querySelector('.map__filters-container'));


    (function () {
      // Фрагмент для наполнения элементами
      window.fragment = document.createDocumentFragment();

      // Шаблон меток на картах
      var TEMPLATE_PIN = document.querySelector('#pin').content.querySelector('.map__pin');

      // Создание контейнера с метками на карте
      for (i = 0; i < window.apartments.length; i++) {
        var mapsPin = TEMPLATE_PIN.cloneNode(true);

        var widthPin = mapsPin.offsetWidth;
        var heightPin = mapsPin.offsetHeight;

        var pinX = window.apartments[i].location.x + widthPin / 2;
        var pinY = window.apartments[i].location.y + heightPin;

        // Нужно правильно вычислить координаты
        mapsPin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
        mapsPin.querySelector('img').src = window.apartments[i].author.avatar;
        mapsPin.querySelector('img').alt = window.apartments[i].offer.title;
        mapsPin.id = 'maps-pin-' + i;
        window.fragment.appendChild(mapsPin);
      }
    })();

  }, window.utils.onError);

})();
