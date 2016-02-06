$(document).ready(function () {

  var sessionDefaultDuration = 300;
  var sessionDurationElement = $('#session-duration');
  var sessionDurationTimepickerElement = $('#session-duration-timepicker');

  sessionDurationElement.val(sessionDefaultDuration);

  sessionDurationTimepickerElement.timepicker({
    defaultTime: [Math.floor(sessionDefaultDuration / 3600), Math.floor(sessionDefaultDuration / 60 % 60)].join(':'),
    minuteStep: 5,
    showMeridian: false
  }).on('changeTime.timepicker', function (event) {
    sessionDurationElement.val(event.time.hours * 3600 + event.time.minutes * 60);
  });
});
