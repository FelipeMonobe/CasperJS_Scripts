var casper = require('casper').create();
var credentials = require('./credentials.json');

var receipt = casper.cli.args[0],
  message = casper.cli.args[1];

  if (!receipt || !message) {
    var missingArgs = receipt ? 'message' :
      message ? 'receipt' :
      'message and receipt';

    casper.echo('ERROR: missing arguments ' + missingArgs);
    casper.exit();
  }

casper.start('https://www.facebook.com/messages/' + receipt, function() {
  casper.echo('1 - page loaded');
});

casper.then(function() {
  casper.echo('2 - submitting form');
  casper.fill('form#login_form', {
    'email': sensData.email,
    'pass': sensData.pass
  }, true);
});

casper.then(function() {
  casper.waitForText('Reply', function() {
    casper.echo('3 - Sending message');
    casper.sendKeys('.uiTextareaNoResize', message);
    casper.click('input[value="Reply"]');
  });
});

casper.run();
