var casper = require('casper').create();

var emailArg = casper.cli.options.email,
  passArg = casper.cli.options.pass;

if (!emailArg || !passArg) {
  var missingArgs = emailArg ? 'pass' :
    passArg ? 'email' :
    'email and pass';

  casper.echo('ERROR: missing arguments ' + missingArgs);
  casper.exit();
}

casper.start('https://facebook.com/', function() {
  casper.echo('1 - page loaded');
});

casper.then(function() {
  casper.echo('2 - submitting form');
  casper.fill('form#login_form', {
    'email': emailArg,
    'pass': passArg
  }, true);
});

casper.then(function() {
  casper.waitForText("Edit Profile", function() {
    casper.echo('3 - capturing screen');
    casper.capture('homepage_print.png');
    casper.exit();
  });
});

casper.run();
