$(document).ready(function () {

  var CONTENT_LIFE_TIME_IN_MILLISECONDS = 7000;

  var editorElement = $('#editor');
  var timerElement = $('#timer');

  var lastEditorContent = '';
  var sessionDurationInSeconds = $('#duration').val();

  var timer = {

    endTime: 0,
    intervalId: null,
    remainingTime: 0,

    print: function () {
      var remainingTime = timer.remainingTime;
      remainingTime /= 1000;
      var seconds = Math.floor(remainingTime % 60);
      remainingTime /= 60;
      var minutes = Math.floor(remainingTime % 60);
      remainingTime /= 60;
      var hours = Math.floor(remainingTime);
      timerElement.html(
        [hours > 0 ? hours + ':' : '',
         minutes < 10 ? '0' : '', minutes, ':',
         seconds < 10 ? '0' : '', seconds].join(''));
    },

    hasEnded: function () {
      return 0 === timer.remainingTime;
    },

    reset: function () {
      var currentTimestamp = Date.now();
      timer.endTime = currentTimestamp + sessionDurationInSeconds * 1000;
      timer.remainingTime = Math.max(0, timer.endTime - currentTimestamp);
      timer.print();
    },

    start: function () {
      if (null !== timer.intervalId) { return; }
      timer.endTime = Date.now() + sessionDurationInSeconds * 1000;
      timer.intervalId = setInterval(timer.update, 100);
    },

    stop: function () {
      if (null === timer.intervalId) { return; }
      clearInterval(timer.intervalId);
      timer.intervalId = null;
      timer.update();
    },

    update: function () {
      timer.remainingTime = Math.max(0, timer.endTime - Date.now());
      timer.print();
      if (timer.hasEnded()) {
        timer.stop();
        editorElement.stop(true, false).fadeIn();
      }
    }
  };

  editorElement.on('input', function () {
    var editorContent = editorElement.val();
    if (lastEditorContent == editorContent) { return; }
    lastEditorContent = editorContent;
    if (timer.hasEnded()) { return; }
    editorElement.stop(true, false).fadeIn(0);
    if ('' === editorContent) {
      timer.stop();
      timer.reset();
    } else {
      timer.start();
      editorElement.fadeOut(CONTENT_LIFE_TIME_IN_MILLISECONDS, function () {
        editorElement.val('').trigger('input').focus();
      });
    }
  });

  timer.reset();
  timerElement.fadeIn(1000);
  editorElement.trigger('input');
});
