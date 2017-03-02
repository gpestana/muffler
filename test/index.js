const tap = require('tap');
const muffler = require('../index');
const mocks = require('./mocks');


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
  const newContent = { 'updated': 'object' };
  muffler.update('database2', 'existingDoc.json', newContent, (err, res) => {
    t.equal(typeof res, 'object', 'res should be an object');
    t.equal(res.updated, 'object', 
      'when updated successfully, res is new content');
    t.notOk(err, 'err should be null');
    t.end();
  });
});


