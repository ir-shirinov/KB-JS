'use strict';

// Аппартаменты
var apartments = [];

// Карта и блок с метками
var map = document.querySelector('.map');
var divMapPins = map.querySelector('.map__pins');

// Массив с адресами аватаров
var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

// Названий аппартаментов
var titleApartments = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

// Количество аппартаментов
var costApartment = titleApartments.length;

// Типы аппартаментов
var typeApartments = ['palace', 'flat', 'house', 'bungalo'];
// Типы аппартаментов
var typeApartmentsRu = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

// Времени заезда и выезда
var checkinTimes = ['12:00', '13:00', '14:00'];

// Предлагаемые удобства
var featuresApartments = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Фотографии аппартаментов
var photoApartments = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Фрагмент для наполнения элементами
var fragment = document.createDocumentFragment();
var fragment2 = document.createDocumentFragment();

// Функция для выдавания случайного числа
var randomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Шаблон карточек аппартаментов
var TEMPLATE_CARD = document.querySelector('#card').content.querySelector('.map__card');

// Шаблон меток на картах
var TEMPLATE_PIN = document.querySelector('#pin').content.querySelector('.map__pin');

// Ширина меток на картах
var WIDTH_IMAGE = TEMPLATE_PIN.querySelector('img').width;

// Функция для выдачи cлучайного элемента массива и его удаления при необходимости
var getRandomElemDel = function (arrayItem, delItem) {
  var indexArray = randomNumber(0, arrayItem.length - 1);
  var valueArray = arrayItem[indexArray];
  if (delItem) {
    arrayItem.splice(indexArray, 1);
  }
  return valueArray;
};

// Функция для случайного уменьшения количества элементов в массиве
var getRandomCountItems = function (arrayItem) {
  var arrayCount = randomNumber(0, arrayItem.length);
  var newArray = [];
  for (var i = 0; i < arrayCount; i++) {
    newArray[i] = arrayItem[i];
  }
  return newArray;
};

// Функция которая проверяет время въезда и не дает заезд раньше этого времени
var getChekoutTime = function (checkinTime) {
  for (var i = 0; i < checkinTimes.length; i++) {
    if (checkinTime === checkinTimes[i]) {
      var newCheckinTimes = checkinTimes.slice(i);
    }
  }
  return getRandomElemDel(newCheckinTimes);
};

// Функция для передачи русского названия аппартаментов
var getTypeRu = function (type) {
  var nameTypeRu;
  for (var i = 0; i < typeApartments.length; i++) {
    if (type === typeApartments[i]) {
      nameTypeRu = typeApartmentsRu[i];
    }
  }
  return nameTypeRu;
};

// Наполнение аппартаментов случайными значениями
for (var i = 0; i < costApartment; i++) {
  var locationX = randomNumber(0, map.clientWidth - WIDTH_IMAGE);
  var locationY = randomNumber(130, 630);
  var checkinTime = getRandomElemDel(checkinTimes);

  apartments[i] = {
    author: {
      avatar: 'img/avatars/user0' + getRandomElemDel(avatarNumbers, true) + '.png'
    },
    offer: {
      title: getRandomElemDel(titleApartments, true),
      address: locationX + ', ' + locationY,
      price: randomNumber(1000, 1000000),
      type: getRandomElemDel(typeApartments),
      rooms: randomNumber(1, 5),
      guests: randomNumber(1, 20),
      checkin: checkinTime,
      checkout: getChekoutTime(checkinTime),
      features: getRandomCountItems(featuresApartments),
      description: '',
      photos: photoApartments.sort()
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

// Создание контейнера с метками на карте
for (i = 0; i < apartments.length; i++) {
  var mapsPin = TEMPLATE_PIN.cloneNode(true);

  var widthPin = mapsPin.offsetWidth;
  var heightPin = mapsPin.offsetHeight;

  var pinX = apartments[i].location.x + widthPin / 2;
  var pinY = apartments[i].location.y + heightPin;

  // Нужно правильно вычислить координаты
  mapsPin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  mapsPin.querySelector('img').src = apartments[i].author.avatar;
  mapsPin.querySelector('img').alt = apartments[i].offer.title;
  mapsPin.id = 'maps-pin-' + i;
  fragment.appendChild(mapsPin);
}

// Вставляем изображения
var insertPhoto = function (popupPhotos) {
  for (var j = 0; j < apartments[i].offer.photos.length - 1; j++) {
    var newPhoto = popupPhotos.querySelector('img').cloneNode(true);
    popupPhotos.appendChild(newPhoto);
  }
  var newPhotos = popupPhotos.querySelectorAll('.popup__photo');
  for (var k = 0; k < apartments[i].offer.photos.length; k++) {
    newPhotos[k].src = apartments[i].offer.photos[k];
  }
  return popupPhotos;
};

// Оставляем в шаблоне только те удобства, которые есть в аппартаментах
var deleteFeatures = function (popupFeatures) {
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }
  for (var j = 0; j < apartments[i].offer.features.length; j++) {
    var newFeatures = document.createElement('li');
    var newClass = 'popup__feature--' + apartments[i].offer.features[j];
    newFeatures.classList.add('popup__feature', newClass);
    popupFeatures.appendChild(newFeatures);
  }
  return popupFeatures;
};

// Создание контейнера с объявлениями
for (i = 0; i < apartments.length; i++) {
  var mapsCard = TEMPLATE_CARD.cloneNode(true);

  mapsCard.querySelector('.popup__title').textContent = apartments[i].offer.title;
  mapsCard.querySelector('.popup__text--address').textContent = apartments[i].offer.address;
  mapsCard.querySelector('.popup__text--price').textContent = apartments[i].offer.price + ' ₽/ночь';
  mapsCard.querySelector('.popup__type').textContent = getTypeRu(apartments[i].offer.type);
  mapsCard.querySelector('.popup__text--capacity').textContent = apartments[i].offer.rooms + ' комнаты для ' + apartments[i].offer.guests + ' гостей';
  mapsCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartments[i].offer.checkin + ', выезд до ' + apartments[i].offer.checkout + '.';
  deleteFeatures(mapsCard.querySelector('.popup__features'));
  mapsCard.querySelector('.popup__description').textContent = apartments[i].offer.description;
  insertPhoto(mapsCard.querySelector('.popup__photos'));
  mapsCard.querySelector('.popup__avatar').src = apartments[i].author.avatar;
  mapsCard.classList.add('hidden');
  mapsCard.querySelector('.popup__close').id = 'popup__close-' + i;
  mapsCard.id = 'maps__card-' + i;

  fragment2.appendChild(mapsCard);
}

// Главный маркер на карте, его ширина и длина, и координаты
var mapPinMain = map.querySelector('.map__pin--main');
var widthPinMain = mapPinMain.offsetWidth;
var heightPinMain = mapPinMain.offsetHeight;
var mapPinMainX;
var mapPinMainY;

// Форма добавления объявления на карту
var adForm = document.querySelector('.ad-form');
// Группы форм для добавления объявления на карту
var fieldsetsAdForm = adForm.querySelectorAll('.ad-form fieldset');
// Поле добавления адреса
var inputAddres = adForm.querySelector('#address');

// Функция перевода страницы в активное состояние
var onMapPinMainMouseup = function () {
  for (i = fieldsetsAdForm.length - 1; i >= 0; i--) {
    fieldsetsAdForm[i].disabled = false;
  }
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  // Добавляем попапы объявлений на страницу
  divMapPins.appendChild(fragment);
  map.insertBefore(fragment2, map.querySelector('.map__filters-container'));
  removeEventListener('mouseup', onMapPinMainMouseup);
};

// Функция для вычисления и передачи координаты метки в поле адрес
var getXYtoAddres = function (evt) {
  mapPinMainX = Math.round(evt.clientX + widthPinMain / 2);
  mapPinMainY = Math.round(evt.clientY + heightPinMain);
  inputAddres.value = mapPinMainX + ', ' + mapPinMainY;
};

// Действия при отпускании клавиши мыши с главного маркера
mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);
mapPinMain.addEventListener('mouseup', function (evt) {
  getXYtoAddres(evt);
});

// Коды клавиш
var ENTER_CODE = 13;
var ESC_CODE = 27;

// Описание предыдущего аппартамента и id этой кнопки
var idPrevAppartament;
var idBtnPrevAppartament;

// Проверяем есть ли у маркера id, значит это маркер соседних объявлений. Выводим блок этого объявления
var showPinAppartament = function (evt) {
  if (evt.target.classList.contains('map__pin') && evt.target.id) {
    // Находим id блока описания нажатого маркера
    var idNextAppartament = '#maps__card-' + evt.target.id.replace('maps-pin-', '');

    // Если нажимаем в первый раз на маркер, то только открываем описание. Если нажатие не первое, то закрываем старое окно и открываем новое.
    if (idPrevAppartament) {
      map.querySelector(idPrevAppartament).classList.add('hidden');
      map.querySelector(idNextAppartament).classList.remove('hidden');
      map.querySelector(idBtnPrevAppartament).classList.remove('map__pin--active');
      evt.target.classList.add('map__pin--active');
    } else {
      map.querySelector(idNextAppartament).classList.remove('hidden');
      evt.target.classList.add('map__pin--active');
    }
    idPrevAppartament = idNextAppartament;
    idBtnPrevAppartament = '#' + evt.target.id;

    // Запускам проверку событий на нажатие ESC
    document.addEventListener('keydown', onEscPress);
  }
};

// Функция которая закрывае описание ESC
var onEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    map.querySelector(idPrevAppartament).classList.add('hidden');
  }
};

// Закрываем попап объявления
var closePinAppartament = function (evt) {
  var idClose = evt.target.id.replace('popup__close-', '');
  var idClosePin = '#maps-pin-' + idClose;
  var idCloseDescriprion = '#maps__card-' + idClose;

  if (evt.target.classList.contains('popup__close')) {
    map.querySelector(idClosePin).classList.remove('map__pin--active');
    map.querySelector(idCloseDescriprion).classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  }
};

// Действия при нажатии мыши на соседние маркеры
divMapPins.addEventListener('click', function (evt) {
  showPinAppartament(evt);
}, true);

divMapPins.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    showPinAppartament(evt);
  }
}, true);

map.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closePinAppartament(evt);
  }
}, true);

map.addEventListener('click', function (evt) {
  closePinAppartament(evt);
}, true);


// Поле для выбора типа жилья и цена за ночь
var inputTypeApartment = document.querySelector('#type');
var inputPrice = document.querySelector('#price');

// Минимальная цена жилья в зависимости от типа
var minPriceBungalo = 0;
var minPriceFlat = 1000;
var minPriceHouse = 5000;
var minPricePalace = 10000;


// Функция замены миниального прайса и плайсходлдер
var getMinPrice = function () {
  if (inputTypeApartment.value === 'bungalo') {
  inputPrice.min = minPriceBungalo;
  inputPrice.placeholder = minPriceBungalo;
  } else if (inputTypeApartment.value === 'flat') {
  inputPrice.min = minPriceFlat;
  inputPrice.placeholder = minPriceFlat;
  } else if (inputTypeApartment.value === 'house') {
  inputPrice.min = minPriceHouse;
  inputPrice.placeholder = minPriceHouse;
  } else if (inputTypeApartment.value === 'palace') {
  inputPrice.min = minPricePalace;
  inputPrice.placeholder = minPricePalace;
  }
}


// Отлавливание кликов для проверки адреса
inputTypeApartment.addEventListener('change', function () {
  getMinPrice();
});

// Время заезда и время выезда
var inputTimeIn = document.querySelector('#timein');
var inputTimeOut = document.querySelector('#timeout');


// Устанавление связи между временем выезда и вьезда
inputTimeIn.addEventListener('change', function () {
   inputTimeOut.selectedIndex = inputTimeIn.selectedIndex;
});

// Устанавление связи между временем выезда и вьезда
inputTimeOut.addEventListener('change', function () {
  inputTimeIn.selectedIndex = inputTimeOut.selectedIndex;
});

// Количество комнат и количество мест
var inputRoomNumber = document.querySelector('#room_number');
var inputCapacity = document.querySelector('#capacity');


// Функция блокировки количества гостей в зависимости от количества комнат
var getSelectedCapacity =function () {
  if (inputRoomNumber.selectedIndex === 0) {
    inputCapacity[0].disabled = false;
    inputCapacity[1].disabled = false;
    inputCapacity[2].disabled = true;
    inputCapacity.selectedIndex = 2;
    inputCapacity[3].disabled = false;
  } else if (inputRoomNumber.selectedIndex === 1) {
    inputCapacity[0].disabled = true;
    inputCapacity[1].disabled = false;
    inputCapacity[2].disabled = false;
    inputCapacity.selectedIndex = 1;
    inputCapacity[3].disabled = true;
  } else if (inputRoomNumber.selectedIndex === 2) {
    inputCapacity[0].disabled = false;
    inputCapacity[1].disabled = false;
    inputCapacity[2].disabled = false;
    inputCapacity.selectedIndex = 0;
    inputCapacity[3].disabled = true;
  } else if (inputRoomNumber.selectedIndex === 3) {
    inputCapacity[0].disabled = true;
    inputCapacity[1].disabled = true;
    inputCapacity[2].disabled = true;
    inputCapacity[3].disabled = false;
    inputCapacity.selectedIndex = 3;
  }
};

// Выбор комнат
inputRoomNumber.addEventListener('change', function () {
  getSelectedCapacity();
});


