'use strict';

(function () {
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
  };

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
  var getSelectedCapacity = function () {
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

})();
