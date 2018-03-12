const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const util = require('util');

const serializer = require('../data/textfile');

// Export router so it's usable from app.use
module.exports = router;

var ts_entry = require('../model/ts_entry');

/**
 * GET /entries/add
 *
 * Display a form for creating an entry.
 */
// [START add_get]
router.get('/', (req, res) => {
  res.json({message:"HoooooWhooo"})
});

// middleware to use for all requests
router.use(function(req, res, next) {
  // TODO: check authtentication

  // do logging
  console.log('Something is happening.');
  //console.log(req)
  next(); // make sure we go to the next routes and don't stop here
});

// GET /api/lines: get all the lines
// GET /api/lines:N get the last N lines
// POST /api/timestamp create a new Timestamp
// POST /api/note create a new note

router.get('/lines', (req, res) => {
  res.json({lines: serializer.get_lines()})
});

router.post('/timestamp', (req, res) => {
  if (!req.body.timestamp){
    console.log('Timestamp is null!');
    res.status(400);
    res.json({result: 'ko',
              message: 'Invalid request. "timestamp" cannot be empty'});
    return;
  }
  var ts = new ts_entry.TimestampEntry(req.body.timestamp, req.body.value);
  serializer.add_timestamp(ts);
  res.json({result: 'ok'})
})

router.post('/note', (req, res) => {
  if (!req.body.value){
    console.log('Value is null!');
    res.status(400);
    res.json({result: 'ko',
              message: 'Invalid request. "value" cannot be empty'});
    return;
  }
  var ts = new ts_entry.TimestampNote(req.body.value);
  serializer.add_note(ts);
  res.json({result: 'ok'})
})
