const nock = require('nock');

const BASE_URL = 'https://api.github.com';

const index = nock(BASE_URL)
  .get('/gists/database')
  .reply(200, {
    files: {
      'document1': {},
      'document2': {},
      'document3': {} 
    }
  });

const indexDbNotFound = nock(BASE_URL)
  .get('/gists/indexDbNotFound')
  .reply(404)

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
  .persist()
  .patch('/gists/database2')
  .reply(200, {'updated': 'object'});

const updateDbNotFound = nock(BASE_URL)
  .persist()
  .patch('/gists/updateDbNotFound')
  .reply(404);

const createDbNotFound = nock(BASE_URL)
  .persist()
  .patch('/gists/createDbNotFound')
  .reply(404);

const deleteOk = nock(BASE_URL)
  .patch('/gists/database3')
  .reply(204, '204')

const deleteDbNotFound = nock(BASE_URL)
  .persist()
  .patch('/gists/deleteDbNotFound')
  .reply(404);


