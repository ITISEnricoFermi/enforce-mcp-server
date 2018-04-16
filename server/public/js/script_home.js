var countdownToLaunch = new Countdown(23, 03, 2018, 9, 0);

var appCenter = new Vue({
  el: "#center",
  data: {
    countdown: ""
  }
});

setInterval(() => {
  var interval = countdownToLaunch.getInterval();
  appCenter.countdown =
    `<span class="countdown-data">
      <span class="countdown-value">${interval.days}</span>
      <span class="countdown-tag">Giorni</span>
    </span>
    <span class="countdown-data">
      <span class="countdown-value">${interval.hours}</span>
      <span class="countdown-tag">Ore</span>
    </span>
    <span class="countdown-data">
      <span class="countdown-value">${interval.minutes}</span>
      <span class="countdown-tag">Minuti</span>
    </span>
    <span class="countdown-data">
      <span class="countdown-value">${interval.seconds}</span>
      <span class="countdown-tag">Secondi</span>
    </span>`;
}, 1000);
