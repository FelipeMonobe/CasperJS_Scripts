var casper = require('casper').create();
var events = [];
var futureEvents = [];
var today = new Date().getDate();
var eventList = [];

debugger;

casper.start('http://imasters.com.br/agenda/', function() {
  casper.echo('1 - page loaded');
});

casper.waitForSelector('.has', function() {
  casper.echo('2 - checking days');
  events = casper.evaluate(function() {
    return Array.prototype.slice.call(document.querySelectorAll('.has>a'));
  });

  casper.echo('events');
  casper.echo(events);

  futureEvents = events.filter(function(evt) {
    return parseInt(evt.innerText) >= today;
  });

  casper.echo('future events');
  casper.echo(futureEvents);

}, null, 30000);

/*
futureEvents.forEach(function(fEvent) {
  casper.thenOpen(fEvent.href, function() {
    casper.waitForSelector('.location', function() {
      eventList = eventList.concat(casper.evaluate(function() {
        var stringNA = 'Não disponível',
          calendarEvents = [],
          containers = Array.prototype.slice.call(document.querySelectorAll('section.published'));

        containers.forEach(function(container) {
          var qsA = container.querySelector('a'),
            qsDate = container.querySelector('.date'),
            qsLocation = container.querySelector('.location');

	  calendarEvents.push({
            name: qsA ? qsA.title.trim() : stringNA,
            date: qsDate ? qsDate.innerHTML.trim() : stringNA,
            location: qsLocation ? qsLocation.innerHTML.trim() : stringNA,
            url: qsA ? qsA.href.trim() : stringNA
          });
        });

       return calendarEvents;
    }));
}, null, 30000);
  })
});
*/

casper.run(function() {
  casper.echo('4 - printing results\n');
  casper.echo('Next ' + eventList.length + ' events:\n');
  eventList.forEach(function(evt) {
    casper.echo(evt.name + '\nQuando: ' + evt.date +
      '\nOnde: ' + evt.location + '\nSite: ' + evt.url + '\n');
  });
  casper.exit();
});
