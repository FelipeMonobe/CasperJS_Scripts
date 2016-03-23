# CasperJS_Scripts
Automated browsing tasks

Heads up!
To run these scripts in your machine you'll need installed:
- PhantomJS
- CasperJS

Specific requirements:
- facebookLoginAndMsg: at same-level directory create a credentials.json with the following structure
**credentials.json**
```json
{
  "email": "your@email.com",
  "password": "yourpass"
}
```
And run it passing two arguments (**receipt** and **message**)
`$ casperjs facebookLoginAndMsg.js "Felipe Monobe" "hey man"`

- facebookLoginAndPrint: run it passing two options (**email** and **pass**)
`$ casperjs facebookLoginAndPrint.js --email=your@email.com --pass=yourPass`

- iMastersCalendarMonth: WIP

- iMastersCalendarNextTen: just run it
`$ casperjs iMastersCalendarNextTen.js`
