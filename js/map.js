'use strict';

// Карта и блок с метками
var map = document.querySelector('.map');
var divMapPins = map.querySelector('.map__pins');

// Главный маркер на карте, его ширина и длина, и координаты
var mapPinMain = map.querySelector('.map__pin--main');
var widthPinMain = mapPinMain.offsetWidth;
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
  for (var i = fieldsetsAdForm.length - 1; i >= 0; i--) {
    fieldsetsAdForm[i].disabled = false;
  }
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  // Добавляем попапы объявлений на страницу
  divMapPins.appendChild(window.fragment);

  removeEventListener('mouseup', onMapPinMainMouseup);
};

// Действия при нажатии на мышку с главного маркера
mapPinMain.addEventListener('mousedown', onMapPinMainMouseup);

// Движение маркера
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startPosition = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      newX: startPosition.x - moveEvt.clientX,
      newY: startPosition.y - moveEvt.clientY
    };

    startPosition = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newLeft = mapPinMain.offsetLeft - shift.newX;
    var newTop = mapPinMain.offsetTop - shift.newY;

    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > divMapPins.offsetWidth - widthPinMain) {
      newLeft = divMapPins.offsetWidth - widthPinMain;
    }

    if (newTop < 130) {
      newTop = 130;
    } else if (newTop > 630) {
      newTop = 630;
    }

    mapPinMain.style.left = newLeft + 'px';
    mapPinMain.style.top = newTop + 'px';

    mapPinMainX = newLeft;
    mapPinMainY = newTop;
    inputAddres.value = mapPinMainX + ', ' + mapPinMainY;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
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
