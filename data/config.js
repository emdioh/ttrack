// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
const nconf = module.exports = require('nconf');
const path = require('path');

nconf
// 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'LOG_FILE',
    'NODE_ENV',
    'PORT',
    'DATA_BACKEND',
    'PASSWORD',
  ])
  // 3. Config file
  .file({
    file: path.join(__dirname, 'config.json')
  })
  // 4. Defaults
  .defaults({
    // dataBackend can be text
    DATA_BACKEND: 'text',

    // This is the id of your project in the Google Cloud Developers Console.
    // GCLOUD_PROJECT: '',
    PORT: 3000
  });

// Check for required settings

if (nconf.get('DATA_BACKEND') === 'text') {
  checkConfig('LOG_FILE');
}

function checkConfig(setting) {
  if (!nconf.get(setting)) {
    throw new Error(
      `You must set ${setting} as an environment variable or in config.json!`
    );
  }
}
