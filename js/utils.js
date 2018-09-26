'use strict';

(function () {

  window.utils = {

    // Функция для выдавания случайного числа
    randomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    // Функция для выдачи cлучайного элемента массива и его удаления при необходимости
    getRandomElemDel: function (arrayItem, delItem) {
      var indexArray = window.utils.randomNumber(0, arrayItem.length - 1);
      var valueArray = arrayItem[indexArray];
      if (delItem) {
        arrayItem.splice(indexArray, 1);
      }
      return valueArray;
    },

    // Функция для случайного уменьшения количества элементов в массиве
    getRandomCountItems: function (arrayItem) {
      var arrayCount = window.utils.randomNumber(0, arrayItem.length);
      var newArray = [];
      for (var i = 0; i < arrayCount; i++) {
        newArray[i] = arrayItem[i];
      }
      return newArray;
    }

  };
})();
