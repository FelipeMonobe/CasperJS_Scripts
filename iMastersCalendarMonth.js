var casper = require('casper').create();
var events = [];
var futureEvents = [];
var today = new Date();
var eventList = [];
var hasNext = true;

var day = today.getDate();
var month = today.getMonth()+1;
var year = today.getFullYear();
month = month < 10 ? '0' + month : month;
var page = 1;
var baseUrl = 'http://imasters.com.br/agenda/' + year + '/' + month;
var url = '';
var datePattern = /[0-9/]+/;

do {

url = baseUrl + '/?_paged=' + page
casper.echo('Acessing ' + url);

casper.start(url, function() {
  casper.echo('1 - page loaded');
});

casper.waitForSelector('.location', function() {
  casper.echo('2 - checking events');
  eventList.push(casper.evaluate(function() {
    var stringNA = 'Não disponível',
      calendarEvents = [],
      containers = Array.prototype.slice.call(document.querySelectorAll('section.published'));

    containers.forEach(function(container) {
      var qsA = container.querySelector('a'),
        qsDate = container.querySelector('.date'),
        qsLocation = container.querySelector('.location'),
	qsH3 = container.querySelector('h3');

      calendarEvents.push({
        name: qsA ? qsA.title.trim() : qsH3.innerHTML.trim(),
        date: qsDate ? qsDate.innerHTML.trim() : stringNA,
        location: qsLocation ? qsLocation.innerHTML.trim() : stringNA,
        url: qsA ? qsA.href.trim() : stringNA
      });
    });

    page++;
    hasNext = document.querySelectorAll('a.next').length > 0;
    return calendarEvents;
  }));
}, null, 30000);

} while (hasNext)

casper.run(function() {
  casper.echo('4 - printing results\n');
  casper.echo('Next ' + eventList.length + ' events:\n');
  eventList.forEach(function(evt) {
    casper.echo(evt.name + '\nQuando: ' + evt.date +
      '\nOnde: ' + evt.location + '\nSite: ' + evt.url + '\n');
  });
  casper.exit();
});
