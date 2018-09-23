'use strict';

// Аппартаменты
var apartments = [];

// Карта
var map = document.querySelector('.map');

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
  fragment.appendChild(mapsPin);
}

// Вставляем метки на карту
map.querySelector('.map__pins').appendChild(fragment);

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

  fragment.appendChild(mapsCard);
}

// Добавляем попапы объявлений на страницу
map.insertBefore(fragment, map.querySelector(' .map__filters-container'));


// Выводим карту
map.classList.remove('map--faded');

