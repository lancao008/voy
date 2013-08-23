function LoaderTest(name) {
  Snitch.TestCase.call(this, name);
}

LoaderTest.prototype = Object.create(Snitch.TestCase.prototype);
LoaderTest.prototype.constructor = LoaderTest;

LoaderTest.prototype['test short path'] = function() {
  var loader = new Voy.Loader(2, 2);
  loader.prefix = '/images';
  loader.suffix = '.gif';

  var expected = 'user/1';
  var actual = loader.getShortPath('/images/user/1.gif');

  this.confirmEqual(expected, actual);
};
