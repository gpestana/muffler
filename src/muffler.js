const _ = require('ramda');
const request = require('request');
const utils = require('./utils');

const GIST_ENDPOINT = 'https://api.github.com/gists';

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
