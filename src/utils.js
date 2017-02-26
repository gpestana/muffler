const _ = require('ramda');
const Maybe = require('data.maybe'); 

// safePath :: [String] -> Object -> Maybe a
module.exports.safePath = _.curry((path, obj) => 
  Maybe.fromNullable(_.path(path, obj)));
