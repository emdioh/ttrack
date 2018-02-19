const fs = require('fs');
const config = require('./config')
const util = require('util')

// specify the path to the file, and create a buffer with characters we want to write
let PATH = config.get("LOG_FILE");

function write_file(text) {
  // open the file in writing mode, adding a callback function where we do the actual writing
  fs.open(PATH, 'a+', function(err, fd) {
      if (err) {
          throw 'could not open file: ' + err;
      }

      buffer = new Buffer(text);
      // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
      fs.write(fd, buffer, 0, buffer.length, null, function(err) {
          if (err) throw 'error writing file: ' + err;
          fs.close(fd, function() {
              console.log('wrote the file successfully');
          });
      });
  });
}

function add_timestamp(timestamp, entry) {
  write_file(util.format("* %s : %s\n", timestamp, entry))
}

function add_note(timestamp, entry) {
  write_file(util.format("  * %s\n", entry))
}

module.exports = {
  add_timestamp,
  add_note
}
