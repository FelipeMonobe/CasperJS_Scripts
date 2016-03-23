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

casper.start('https://www.facebook.com/messages/new', function() {
  casper.echo('1 - page loaded');
});

casper.then(function() {
  casper.echo('2 - submitting form');
  casper.fill('form#login_form', {
    'email': credentials.email,
    'pass': credentials.password
  }, true);
});

casper.then(function() {
  casper.waitForText('Reply', function() {
    casper.echo('3 - Searching receipt');
    casper.sendKeys('input[data-placeholder="Name"]', receipt, {
      keepFocus: true
    });
    casper.sendKeys('input[data-placeholder="Name"]', casper.page.event.key.Enter);

    casper.echo('4 - Sending message');
    casper.sendKeys('.uiTextareaNoResize', message);
    casper.sendKeys('.uiTextareaNoResize', casper.page.event.key.Enter);
    casper.sendKeys('.uiTextareaNoResize', casper.page.event.key.Enter, {
      modifiers: 'ctrl'
    });
  }, 30000);
});

casper.run();
