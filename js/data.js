'use strict';

(function () {
  window.data = {
    // Аппартаменты
    apartments: [],

    // Типы аппартаментов
    typeApartmentsRu: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],

    // Типы аппартаментов
    typeApartments: ['palace', 'flat', 'house', 'bungalo'],

  };

  // Карта и блок с метками
  var map = document.querySelector('.map');

  // Шаблон меток на картах
  var TEMPLATE_PIN = document.querySelector('#pin').content.querySelector('.map__pin');

  // Ширина меток на картах
  var WIDTH_IMAGE = TEMPLATE_PIN.querySelector('img').width;

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

  // Времени заезда и выезда
  var checkinTimes = ['12:00', '13:00', '14:00'];

  // Предлагаемые удобства
  var featuresApartments = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Фотографии аппартаментов
  var photoApartments = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // Функция которая проверяет время въезда и не дает заезд раньше этого времени
  var getChekoutTime = function (checkinTime) {
    for (var i = 0; i < checkinTimes.length; i++) {
      if (checkinTime === checkinTimes[i]) {
        var newCheckinTimes = checkinTimes.slice(i);
      }
    }
    return window.utils.getRandomElemDel(newCheckinTimes);
  };

  // Наполнение аппартаментов случайными значениями
  for (var i = 0; i < costApartment; i++) {
    var locationX = window.utils.randomNumber(0, map.clientWidth - WIDTH_IMAGE);
    var locationY = window.utils.randomNumber(130, 630);
    var checkinTime = window.utils.getRandomElemDel(checkinTimes);

    window.data.apartments[i] = {
      author: {
        avatar: 'img/avatars/user0' + window.utils.getRandomElemDel(avatarNumbers, true) + '.png'
      },
      offer: {
        title: window.utils.getRandomElemDel(titleApartments, true),
        address: locationX + ', ' + locationY,
        price: window.utils.randomNumber(1000, 1000000),
        type: window.utils.getRandomElemDel(window.data.typeApartments),
        rooms: window.utils.randomNumber(1, 5),
        guests: window.utils.randomNumber(1, 20),
        checkin: checkinTime,
        checkout: getChekoutTime(checkinTime),
        features: window.utils.getRandomCountItems(featuresApartments),
        description: '',
        photos: photoApartments.sort()
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }


})();
