var casper = require('casper').create();
var eventList = [];

casper.start('http://imasters.com.br/agenda/', function() {
  casper.echo('1 - page loaded');
});


casper.waitForSelector('.location', function() {
  casper.echo('2 - checking events');
  eventList = casper.evaluate(function() {
   var stringNA = 'Não disponível',
        calendarEvents = [],
        containers = document.querySelectorAll('section.published');

    for(var i = 0; i < containers.length; i++) {
      var qsA = containers[i].querySelector('a'),
          qsDate = containers[i].querySelector('.date'),
          qsLocation = containers[i].querySelector('.location');

      calendarEvents.push({
        name: qsA ? qsA.title.trim() : stringNA,
        date: qsDate ? qsDate.innerHTML.trim() : stringNA,
        location: qsLocation ? qsLocation.innerHTML.trim() : stringNA,
        url: qsA ? qsA.href.trim() : stringNA
      });
    }

    return calendarEvents;
  });
}, null, 30000);


casper.run(function() {
  casper.echo('3 - printing results\n');
  casper.echo(eventList.length + ' events found:\n');
  eventList.forEach(function(evt) {
    casper.echo(evt.name + '\nQuando: ' + evt.date +
      '\nOnde: ' + evt.location + '\nSite: ' + evt.url + '\n');
  });
  casper.exit();
});
