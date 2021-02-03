'use strict';

// Помещаем переменные в глобальную область видимости, чтобы сделать их доступными для консоли браузера
var video = document.querySelector('video');
var constraints = window.constraints = {
  audio: false,
  video: true
};
var errorElement = document.querySelector('#errorMsg');

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Получил поток с ограничениями:', constraints);
  console.log('Использую видео-устройство: ' + videoTracks[0].label);
  stream.onended = function() {
    console.log('Трансляция закончилась');
  };
  window.stream = stream; // Делаем переменную доступной для консоли браузера
  video.srcObject = stream;
})
.catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('Разрешение ' + constraints.video.width.exact + 'x' +
      constraints.video.height.exact + ' px не поддерживается устройством.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Разрешения на использование камеры и микрофона не были предоставлены. ' +
      'Вам нужно разрешить странице доступ к вашим устройствам,' +
      ' чтобы демо-версия работала.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});

function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}