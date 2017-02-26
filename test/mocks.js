const nock = require('nock');

const getOk = nock('https://api.github.com')
  .persist()
  .get('/gists/database1')
  .reply(200, {
    files: {
      "document1.json": {
      "filename": "document1.json",
      "type": "application/json",
      "language": "JSON",
      "content": "{\"hello\": \"world\"}"
      }
    }
  });

const getDbNotFound = nock('https://api.github.com')
  .get('/gists/doentExistDb')
  .reply(404)

