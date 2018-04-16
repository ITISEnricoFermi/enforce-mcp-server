function Countdown(day, month, year, hours, minutes) {

  this.date = new Date(year, month, day, hours, minutes).getTime();

  this.getInterval = function() {
    this.now = new Date().getTime();
    var intervalMilliseconds = this.date - this.now;
    var days = Math.floor(intervalMilliseconds / (1000 * 60 * 60 * 24));
    intervalMilliseconds %= (1000 * 60 * 60 * 24);
    var hours = Math.floor(intervalMilliseconds / (1000 * 60 * 60));
    intervalMilliseconds %= (1000 * 60 * 60);
    var minutes = Math.floor(intervalMilliseconds / (1000 * 60));
    intervalMilliseconds %= (1000 * 60);
    var seconds = Math.floor(intervalMilliseconds / 1000);

    var result = {
      days,
      hours,
      minutes,
      seconds
    };

    return result;
  }

}
