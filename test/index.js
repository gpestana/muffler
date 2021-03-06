const tap = require('tap');
const muffler = require('../index');
const mocks = require('./mocks');


tap.test('gets database index', t => {
  muffler.databaseIndex('database', (err, res) => {
    t.equal(res.length, 3, 'result should have 3 documents')
    t.notOk(err, 'err should be null');
    t.end(); 
  });
});

tap.test('gets non existing database', t => {
  muffler.databaseIndex('indexDbNotFound', (err, res) => {
      t.equal(err, '404', 'err should be 404');
      t.notOk(res, 'err should be null');
      t.end();
    });
});

tap.test('gets existing object', t => {
  muffler.get('database1', 'document1.json', (err, res) => {
    t.equal(typeof res, 'object', 'response should be an object');
    t.equal(res.hello, 'world', 'result should be correct')
    t.notOk(err, 'err should be null');
    t.end(); 
  });
});

tap.test('gets non existing object', t => {
  muffler.get('database1', 'doesntExistDoc.json', (err, res) => {
    t.equal(typeof err, 'string', 'err should be a string');
    t.equal(err, 'doesntExistDoc.json not found', 'err msg should be correct')
    t.notOk(res, 'res should be null');
    t.end(); 
  });
});

tap.test('gets from non existing database', t => {
  muffler.get('doentExistDb', 'doc.json', (err, res) => {
    t.equal(typeof err, 'string', 'err should be a string');
    t.equal(err, '404', 'err should be 404')
    t.notOk(res, 'res should be null');
    t.end(); 
  });
});

tap.test('updates object', t => {
  const authToken = "authTokenForTesting";
  const newContent = { 'updated': 'object' };
  muffler.update('database2', 'existingDoc.json', newContent, authToken, 
    (err, res) => {
      t.equal(typeof res, 'object', 'res should be an object');
      t.equal(res.updated, 'object', 
        'when updated successfully, res is new content');
      t.notOk(err, 'err should be null');
      t.end();
    });
});

tap.test('updates object with string', t => {
  const authToken = "authTokenForTesting";
  const newContent = "new content string";
  muffler.update('database3', 'existingDoc.json', newContent, authToken, 
    (err, res) => {
      t.equal(typeof err, 'string', 'err message. docs must be json');
      t.notOk(res, 'err should be null');
      t.end();
    });
});

tap.test('updates in non existing database', t => {
  const authToken = "authTokenForTesting";
  const newContent = {'new': 'content'};
  muffler.update('updateDbNotFound', 'Doc.json', newContent, authToken, 
    (err, res) => {
      t.equal(err, '404', 'err should be 404');
      t.notOk(res, 'err should be null');
      t.end();
    });
});


tap.test('creates object', t => {
  const authToken = "authTokenForTesting";
  const newContent = { 'updated': 'object' };
  muffler.create('database2', 'existingDoc.json', newContent, authToken, 
    (err, res) => {
      t.equal(typeof res, 'object', 'res should be an object');
      t.equal(res.updated, 'object', 
        'when created successfully, res is new content');
      t.notOk(err, 'err should be null');
      t.end();
    });
});

tap.test('creates object with string', t => {
  const authToken = "authTokenForTesting";
  const newContent = "new content string";
  muffler.create('database3', 'existingDoc.json', newContent, authToken, 
    (err, res) => {
      t.equal(typeof err, 'string', 'err message. docs must be json');
      t.notOk(res, 'err should be null');
      t.end();
    });
});

tap.test('creates in non existing database', t => {
  const authToken = "authTokenForTesting";
  const newContent = {'new': 'content'};
  muffler.create('createDbNotFound', 'Doc.json', newContent, authToken, 
    (err, res) => {
      t.equal(err, '404', 'err should be 404');
      t.notOk(res, 'err should be null');
      t.end();
    });
});

tap.test('deletes object', t => {
  const authToken = "authTokenForTesting";
  muffler.delete('database3', 'existingDoc.json', authToken, 
    (err, res) => {
      t.equal(res, '204', 'res should be 204 No Content code');
      t.notOk(err, 'err should be null');
      t.end();
    });
});

tap.test('deletes on non existing database', t => {
  const authToken = "authTokenForTesting";
  muffler.delete('deleteDbNotFound', 'Doc.json', authToken, 
    (err, res) => {
      t.equal(err, '404', 'err should be 404');
      t.notOk(res, 'err should be null');
      t.end();
    });
});
