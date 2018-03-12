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

function check_today(today){
    lines = get_lines();
    date_re = /^(#\s)*(\d{4}-\d{2}-\d{2})$/;
    for(var i=lines.length-1; i>=0; i--){
      l = lines[i];
      m = l.match(date_re);
      console.log(m);
      if (m){
        return m[2] == today;
      }
    }
}

function add_timestamp(timestamp) {
  ts_day = timestamp.time.format('YYYY-MM-DD');
  ts_time = timestamp.time.format('hh:mm');
  if (!check_today(ts_day)){
    write_file(util.format("\n# %s\n", ts_day))
  }
  write_file(util.format("* %s : %s\n", ts_time, timestamp.entry))
}

function add_note(note) {
  write_file(util.format("  * %s\n", note.entry))
}

function get_lines(count){
  lines = String(fs.readFileSync(PATH)).split('\n');
  console.log("Count is " + count)
  if (count > 0){
    console.log(count);
    start = Math.max(0, lines.length-count);
    return lines.slice(start, lines.length);
  }
  return lines;
}

module.exports = {
  add_timestamp,
  add_note,
  get_lines
}
