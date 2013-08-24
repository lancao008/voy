(function() {

var EventEmitter = {
  getCallbacks: function() {
    if(!this.callbacks) this.callbacks = {};
    return this.callbacks;
  },
  on: function(type, callback) {
    var callbacks = this.getCallbacks()[type];
    if(!callbacks) {
      callbacks = [];
      this.getCallbacks()[type] = callbacks;
    }
    callbacks.push(callback);
  },
  emit: function() {
    var args = Array.prototype.slice.call(arguments);
    var type = args.shift();
    var callbacks = this.getCallbacks()[type];
    if(callbacks) {
      callbacks.forEach(function(callback) {
        callback.apply(null, args);
      });
    }
  }
};


if(!String.prototype.firstLetterToUpperCase) {
  String.prototype.firstLetterToUpperCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  };
}


var Snitch = {
  run: function(element, testCaseClasses) {
    var runner = new Snitch.SuiteRunner(testCaseClasses);
    var presenter = new Snitch.Presenter(element, runner);

    runner.run();
  }
};


Snitch.Assertion = function(test, assertorName, type, arguments) {
  this.test = test;
  this.assertorName = assertorName;
  var assertor = Snitch.Assertors[assertorName];
  this.arguments = arguments;
  this.result = assertor.apply(null, arguments);
  this.type = type;
};

Snitch.Assertion.prototype.didPass = function() {
  var result = this.result;
  if(this.type == 'refutation') result = !result;
  return result;
};


Snitch.AssertionDescriber = {
  describe: function(assertion) {
    var typeWithFirstLetterCapitalized = assertion.type.firstLetterToUpperCase();
    var assertorNameWithFirstLetterCapitalized = assertion.assertorName.firstLetterToUpperCase();

    var methodName = 'describe' + assertorNameWithFirstLetterCapitalized + typeWithFirstLetterCapitalized;
    return "[" + assertion.test.getFullName() + "] " + this[methodName](assertion.arguments);
  },
  describeTruthyConfirmation: function(args) {
    return "'" + args[0] + "' was not truthy.";
  },
  describeTruthyRefutation: function(args) {
    return "'" + args[0] + "' was truthy.";
  },
  describeTrueConfirmation: function(args) {
    return "'" + args[0] + "' was not true.";
  },
  describeTrueRefutation: function(args) {
    return "'" + args[0] + "' was true.";
  },
  describeEqualConfirmation: function(args) {
    return "'" + args[1] + "' did not equal '" + args[0] + "'.";
  },
  describeEqualRefutation: function(args) {
    return "'" + args[1] + "' did equal '" + args[0] + "'.";
  },
  describeInDeltaConfirmation: function(args) {
    return args[1] + ' was not within ' + args[0] + '±' + args[2] + '.';
  },
  describeInDeltaRefutation: function(args) {
    return args[1] + ' was within ' + args[0] + '±' + args[2] + '.';
  }
};


Snitch.Assertors = {
  truthy: function(value) {
    return !!value;
  },
  true: function(value) {
    return value === true;
  },
  equal: function(expected, actual) {
    return expected === actual;
  },
  inDelta: function(expected, actual, delta) {
    var min = expected-delta;
    var max = expected+delta;
    return actual >= min && actual <= max;
  }
};


Snitch.Presenter = function(element, runner) {
  this.element = element;
  runner.on('completed', function() {
    console.log('Completed!');
  });

  runner.on('updated', this.updateSummary.bind(this));
  runner.on('failedAssertion', this.addFailedAssertion.bind(this));

  this.setupElements();
  this.runner = runner;
};

Snitch.Presenter.prototype.setupElements = function() {
  this.setupStatusElement();
  this.setupSummaryElement();
  this.setupFailedAssertionsElement();
  this.element.appendChild(this.statusElement);
  this.element.appendChild(this.summaryElement);
};

Snitch.Presenter.prototype.setupStatusElement = function() {
  this.statusElement = document.createElement('div');
  this.statusElement.className = 'status';
};

Snitch.Presenter.prototype.setupSummaryElement = function() {
  this.summaryElement = document.createElement('table');
  this.summaryElement.className = 'summary';

  var bodyElement = document.createElement('tbody');
  this.summaryElement.appendChild(bodyElement);

  this.addSummaryLine('failedAssertions', 'Failed');
  this.addSummaryLine('passedAssertions', 'Passed');
  this.addSummaryLine('completedAssertions', 'Completed');
};

Snitch.Presenter.prototype.addSummaryLine = function(propertyName, description) {
  var rowElement = document.createElement('tr');

  var descriptionElement = document.createElement('td');
  descriptionElement.innerHTML = description;

  var counterElement = document.createElement('td');
  counterElement.innerHTML = 0;
  this[propertyName + 'CountElement'] = counterElement;

  rowElement.appendChild(descriptionElement);
  rowElement.appendChild(counterElement);

  this.summaryElement.children[0].appendChild(rowElement);
}

Snitch.Presenter.prototype.setupFailedAssertionsElement = function() {
  this.failedAssertionsElement = document.createElement('ol');
  this.failedAssertionsElement.className = 'failed_assertions';
};

Snitch.Presenter.prototype.updateSummary = function() {
  this.failedAssertionsCountElement.innerHTML = this.runner.failedAssertions.length;
  this.passedAssertionsCountElement.innerHTML = this.runner.passedAssertionsCount;
  this.completedAssertionsCountElement.innerHTML = this.runner.getAssertionsCompletedCount();
};

Snitch.Presenter.prototype.addFailedAssertion = function(failedAssertion) {
  var element = document.createElement('li');
  element.innerHTML = Snitch.AssertionDescriber.describe(failedAssertion);
  this.failedAssertionsElement.appendChild(element);

  if(this.statusElement.className.indexOf('failed') == -1) this.statusElement.className += ' failed';
  if(!this.failedAssertionsElement.parentNode) this.element.appendChild(this.failedAssertionsElement);
};


Snitch.SuiteRunner = function(testCaseClasses) {
  this.completedTestsCasesCount = 0;
  this.completedTestsCount = 0;
  this.testCaseClasses = testCaseClasses;
  this.failedAssertions = [];
  this.passedAssertionsCount = 0;
};

Snitch.SuiteRunner.prototype = Object.create(EventEmitter);

Snitch.SuiteRunner.prototype.run = function() {
  this.testCaseClasses.forEach(function(testCaseClass) {
    this.runTestCase(testCaseClass);
  }.bind(this));
};

Snitch.SuiteRunner.prototype.runTestCase = function(testCaseClass) {
  var testCaseRunner = new Snitch.TestCaseRunner(testCaseClass);

  testCaseRunner.on('completed', this.testCaseCompleted.bind(this));
  testCaseRunner.on('testCompleted', this.testCompleted.bind(this));
  testCaseRunner.on('assertionCompleted', this.assertionCompleted.bind(this));

  testCaseRunner.run();
}

Snitch.SuiteRunner.prototype.testCaseCompleted = function(testCase) {
  this.completedTestsCasesCount++;
  if(this.completedTestsCasesCount == this.testCaseClasses.length) this.emit('completed');
};

Snitch.SuiteRunner.prototype.testCompleted = function(test) {
  this.completedTestsCount++;
  if(test.passed) this.passedTestsCount++;
  else this.failedTests.push(test);
};

Snitch.SuiteRunner.prototype.assertionCompleted = function(assertion) {
  if(assertion.didPass()) {
    this.passedAssertionsCount++;
  } else {
    this.failedAssertions.push(assertion);
    this.emit('failedAssertion', assertion);
  }
  this.emit('updated');
};

Snitch.SuiteRunner.prototype.getAssertionsCompletedCount = function() {
  return this.failedAssertions.length + this.passedAssertionsCount;
};


Snitch.TestCaseRunner = function(testCaseClass) {
  this.testCaseClass = testCaseClass;
  this.testNames = this.getTestNames();
};

Snitch.TestCaseRunner.prototype = Object.create(EventEmitter);

Snitch.TestCaseRunner.prototype.run = function() {
  this.testNames.forEach(function(testName) {
    this.runTest(testName);
  }.bind(this));
};


Snitch.TestCaseRunner.prototype.getTestNames = function(testCaseClass) {
  var testNames = [];
  for(key in this.testCaseClass.prototype) {
    if(key.substr(0, 4) == 'test') testNames.push(key);
  }
  return testNames;
};

Snitch.TestCaseRunner.prototype.runTest = function(testName) {
  var test = new this.testCaseClass(testName);

  test.on('assertionCompleted', function(assertion) {
    this.emit('assertionCompleted', assertion);
  }.bind(this));

  test.run();
};


(function() {
  Snitch.TestCase = function(testName) {
    this.testName = testName;
    this.failedAssertionsCount = 0;
    this.passedAssertionsCount = 0;
  };

  Snitch.TestCase.prototype = Object.create(EventEmitter);

  Snitch.TestCase.prototype.run = function() {
    if(this.setup) this.setup();
    this[this.testName]();
    this.complete();
  };

  Snitch.TestCase.prototype.performAssertion = function(assertorName, type, arguments) {
    var assertion = new Snitch.Assertion(this, assertorName, type, arguments);
    this.emit('assertionCompleted', assertion);
  };

  Snitch.TestCase.prototype.getFullName = function() {
    return this.constructor.name + ": " + this.testName;
  };

  Snitch.TestCase.prototype.complete = function() {
    this.passed = this.failedAssertionsCount == 0;
    this.emit('completed');
  }

  Snitch.TestCase.setupAssertionMethods = function(assertorName) {
    var assertorNameWithFirstLetterCapitalized = assertorName.firstLetterToUpperCase();
    Snitch.TestCase.prototype['confirm' + assertorNameWithFirstLetterCapitalized] = function() {
      var args = Array.prototype.slice.call(arguments);
      this.performAssertion(assertorName, 'confirmation', args);
    };

    Snitch.TestCase.prototype['refute' + assertorNameWithFirstLetterCapitalized] = function() {
      var args = Array.prototype.slice.call(arguments);
      this.performAssertion(assertorName, 'refutation', args);
    };
  }

  for(var assertorName in Snitch.Assertors) {
    Snitch.TestCase.setupAssertionMethods(assertorName);
  }
})();

window.Snitch = Snitch;
})();