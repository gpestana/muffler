const nock = require('nock');

const BASE_URL = 'https://api.github.com';

const getOk = nock(BASE_URL)
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

const getDbNotFound = nock(BASE_URL)
  .get('/gists/doentExistDb')
  .reply(404)

const updateOk = nock(BASE_URL)
  .get('/gists/database2')
  .reply(200, { 'updated': 'object' });

