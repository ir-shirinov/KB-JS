'use strict';

(function () {
  window.backend = {

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking/data';
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка после загрузки, наприме отключен инет');
      });

      xhr.addEventListener('timeout', function () {
        onError('Истекло время ответа: ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onSave, onErrorSave) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking';
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSave();
        }
      });

      xhr.addEventListener('error', function () {
        onErrorSave('Ошибка после загрузки, наприме отключен инет');
      });

      xhr.addEventListener('timeout', function () {
        onErrorSave('Истекло время ответа: ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
