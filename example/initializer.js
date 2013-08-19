(function() {
  function initialize() {
    var game = new Game();
    document.body.appendChild(game.getCanvasElement());
    game.run();
  }
  window.addEventListener('load', initialize);
})();
