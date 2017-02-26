const t = require('node-tap');
const muffler = require('../index.js');
const nock = require('nock');

const gist = nock('https://api.github.com')
  .get('/gist/idrequst1')
  .reply(200, {
    files: {
      "document.json": {
        "filename": "document.json",
        "type": "application/json",
        "language": "JSON",
        "content": "{\"hello\": \"world\"}"
      }
    }
  });

t.test('creates new object', t => {
  const databse = "dbId";


});
