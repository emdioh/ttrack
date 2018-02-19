const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const util = require('util')

const model = require('../data/textfile')

module.exports = router;

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * GET /entries/add
 *
 * Display a form for creating an entry.
 */
// [START add_get]
router.get('/', (req, res) => {
  res.render('../views/new_entry.pug', {
    entry: {},
    action: 'Add'
  });
});
// [END add_get]

/**
 * POST /entries/add
 *
 * Create a book.
 */
// [START add_post]
router.post('/', (req, res, next) => {
  const data = req.body;
  if (!data.timestamp) {
    var date = new Date()
    data.timestamp = util.format("%s:%s", date.getHours(), date.getMinutes())
  }

  model.add_timestamp(date.timestamp, data.text);
  res.redirect(`${req.baseUrl}/`);
});
// [END add_post]
