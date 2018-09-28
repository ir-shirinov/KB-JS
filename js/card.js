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
    for (var i = 0; i < 5; i++) {
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
      for (i = 0; i < 5; i++) {
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



  // Обработчики вывода похожиъ объявлений
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  //Сортировка массива
  window.RatingAppartment = function () {
    var radios = document.querySelectorAll('#housing-features input:checked');
    var radiosId = [];
    for (var i = radios.length - 1; i >= 0; i--) {
      radiosId.push(radios[i].id);
    }

    window.apartments.forEach (function (item) {
    //Получение нажатых кнопок
    item.rating = 0;

    if (item.offer.type === housingType.value) {
      item.rating += 1;
    }
    if ((item.offer.price >= 10000 && item.offer.price <= 50000)
      &&
      (housingPrice.value === "middle")) {
      item.rating += 1;
    }
    if ((item.offer.price < 10000) && (housingPrice.value === "low")) {
      item.rating += 1;
    }
    if ((item.offer.price > 50000) && (housingPrice.value === "high")) {
      item.rating += 1;
    }
    if (item.offer.rooms === parseInt(housingRooms.value)) {
      item.rating += 1;
    }
    if (item.offer.guests === parseInt(housingGuests.value)) {
      item.rating += 1;
    }

    item.offer.features.forEach (function (elem) {
      radiosId.forEach (function (elem2) {
        if (('filter-' + elem) === elem2) {
          item.rating += 1;
        }
      })
    });
    return item;
    });

    window.apartments.sort( function (left, right) {
      return right.rating - left.rating;
    })
  };

  // Удаление пинов и описаний
  window.deletePinAndDescription = function () {
    // Удаление от пинов
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.querySelectorAll('.map__pin');
    for (var i = buttons.length - 1; i >= 0; i--) {
      if (buttons[i].id) {
        mapPins.removeChild(buttons[i]);
      }
    }

    // Удаление описаний
    var map = document.querySelector('.map');
    var cards = document.querySelectorAll('.map__card');
    for (var i = cards.length - 1; i >= 0; i--) {
      map.removeChild(cards[i]);
    }
  };


  // Добавление пинов
  var addPins = function () {

    var TEMPLATE_PIN = document.querySelector('#pin').content.querySelector('.map__pin');
    var divMapPins = map.querySelector('.map__pins');

    for (var i = 0; i < 5; i++) {
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

    divMapPins.appendChild(window.fragment);
  };

  // Добавление описаний

  var addDescription = function () {
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
    for (var i = 0; i < 5; i++) {
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
  }

  housingType.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });

  housingPrice.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });
  housingRooms.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });
  housingGuests.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });

  filterWifi.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });
  filterDishwasher.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });
  filterParking.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });
  filterWasher.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });
  filterElevator.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });
  filterConditioner.addEventListener('change', function () {
    window.RatingAppartment();
    window.deletePinAndDescription();
    addPins();
    addDescription();
  });

})();
