const _ = require('ramda');
const request = require('request');
const validator = require('validator');
const utils = require('./utils');


const GIST_ENDPOINT = 'https://api.github.com/gists';

module.exports.databaseIndex = (databaseId, cb) => {
  const requestOpts = { 
    url: `${GIST_ENDPOINT}/${databaseId}`, 
    headers: { 'User-Agent': 'muffler' }
  };
  request(requestOpts, (err, res, rawBody) => {
    if(err) return err;
    if(res.statusCode != 200) return cb(`${res.statusCode}`, null);
    const documents = utils.safePath(['files'], JSON.parse(rawBody))
      .map(files => files ? _.keys(files) : [] ).getOrElse([]);
  return cb(null, documents);
  });
};

module.exports.get = (databaseId, documentId, cb) => {
  const requestOpts = { 
    url: `${GIST_ENDPOINT}/${databaseId}`, 
    headers: { 'User-Agent': 'muffler' }
  };
  request(requestOpts, (err, res, rawBody) => {
    if(err) return err;
    if(res.statusCode != 200) return cb(`${res.statusCode}`, null);
    const body = JSON.parse(rawBody);
    const doc = utils.safePath(['files', documentId], body)
      .map(d => d ? d : {}).getOrElse({});
    if(_.isEmpty(doc)) return cb(`${documentId} not found`, null);
    if(doc.language != 'JSON') return cb(`${documentId} is not JSON`, null);
    return cb(null, JSON.parse(utils.safePath(['content'], doc).getOrElse({})));
  });
};

module.exports.delete = (databaseId, documentId, authToken, cb) => {
  const body = JSON.stringify(
      {files: _.assoc(documentId, { content: null }, {})});
  const requestOpts = { 
    url: `${GIST_ENDPOINT}/${databaseId}`, 
    headers: { 
      'User-Agent': 'muffler',
      'Authorization': `token ${authToken}` 
    },
    method: 'PATCH',
    form: body 
  };
  request(requestOpts, (err, res, rawBody) => {
    if(res.statusCode != 204) return cb(`${res.statusCode}`, null);
    return cb(null, '204'); 
  });
};

const createUpdate = (databaseId, documentId, newContent, authToken, cb) => { 
  const newContentStr = JSON.stringify(newContent);
  if(!validator.isJSON(newContentStr)) 
    return cb('New content must be a valid JSON object', null);  

  const body = JSON.stringify(
      {files: _.assoc(documentId, {content: newContentStr}, {})});
  const requestOpts = { 
    url: `${GIST_ENDPOINT}/${databaseId}`, 
    headers: { 
      'User-Agent': 'muffler',
      'Authorization': `token ${authToken}` 
    },
    method: 'PATCH',
    form: body 
  };
  request(requestOpts, (err, res, rawBody) => {
    if(res.statusCode != 200) return cb(`${res.statusCode}`, null);
    const body = JSON.parse(rawBody); 
    return cb(null, newContent); 
  });
};

module.exports.update = createUpdate;
module.exports.create = createUpdate;
