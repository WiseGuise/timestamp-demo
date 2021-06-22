// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// json container to return timestamp
let timestamp = {};
// data analyzing request
app.get('/api/:date_string', (req, res) => {
  // states required parameter for processing
  let date_string = req.params.date_string;
  // searches for strings including spaces or dashes
  if (date_string.includes('-') || date_string.includes(' ')) {
    // returns date_string converted to utc and unix time
    timestamp['unix'] = new Date(date_string).getTime();
    timestamp['utc'] = new Date(date_string).toUTCString();
  } else {
    // parse date_string into integer format
    date_string = parseInt(date_string);
    // convert integer format back into date_string
    timestamp['unix'] = new Date(date_string).getTime();
    timestamp['utc'] = new Date(date_string).toUTCString();
  }
  // instruction to throw error if not recognized time format
  if(!timestamp['unix'] || !timestamp['utc']){
    res.json({error: 'Invalid Date'});
  }
  
  // returns
  res.json(timestamp);
});

// returns main variables after processing
app.get('/api/', (req, res) => {
  timestamp['unix'] = new Date().getTime();
  timestamp['utc'] = new Date().toUTCString();
  res.json(timestamp);
});
