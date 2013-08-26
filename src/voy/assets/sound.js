(function() {
  function Sound(audio) {
    this.audio = audio;
  }

  Sound.prototype = {
    play: function() {
      var audio = new Audio();
      audio.src = this.audio.src;
      audio.play();
      return audio;
    }
  };

  Voy.Sound = Sound;
})();
