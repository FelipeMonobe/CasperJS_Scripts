var casper = require('casper').create();
var containers = [],
  events = [],
  calendarEvent = {
    name: "",
    date: "",
    location: "",
    url: ""
  };

casper.start('http://imasters.com.br/agenda/', function() {
  casper.echo('1 - page loaded');
});

casper.then(function() {
  casper.waitForSelector('.location', function() {
    casper.echo('2 - checking events');
    casper.evaluate(function() {
      containers = document.querySelectorAll('section.published');

      containers.forEach(function(container) {
        calendarEvent.name = container.querySelector('a').title.trim();
        calendarEvent.date = container.querySelector('.date').innerHTML.trim();
        calendarEvent.location = container.querySelector('.location').innerHTML.trim();
        calendarEvent.url = container.querySelector('a').href.trim();
        events.push(calendarEvent);
      });
    });
  }, null, 60000);
});

casper.run(function() {
  casper.echo('3 - printing results');
  casper.echo(containers.length + ' events found:');
  events.forEach(function(event) {
    casper.echo(event.name + '\nWhen: ' + event.date +
      '\nWhere: ' + event.location + '\nSite: ' + event.url);
  });
});
