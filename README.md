# Muffler.js

#### JSON objects storage for fast prototyping, sitting on top of Github's gist.

![muffler](https://raw.githubusercontent.com/gpestana/muffler/master/muffler.png)

Muffler is the ideal database for prototyping web services which require a 
document-based storage. No need for setting up any infra, pay for any service 
nor learn any new technology. Just plug Muffler.js in and start storing and
retrieving json blobs from/in the clouds.

Muffler.js uses Github's gist to store the data. For now, all the data must be
publicly available.

If the data storage requirements are loose enough, Muffler.js can be also used
in production.

### Features
- JSON objects storage
- No backend required
- HTTPS
- CRUD API
  - `create()`
  - `get()`
  - `update()`
  - `delete()`
- Backend and frontend integration


### Get it running
```
npm install muffler
```

### API

#### databaseIndex(databaseId, cb)
Lists all documents in a database

```javascript
const muffler = require('muffler');

muffler.databaseIndex(
  'databaseId', (err, res) => {
    if(err) return console.log(err);
    console.log(res);
});
```

#### create(databaseId, newDoc, authToken, cb)
Creates a document in a database

```javascript
const muffler = require('muffler');

const newContent = 'this is the new content';
const authToken = ' fa249990930b19bef4949f8af1d36db70a91123'
muffler.update(
  'userAccount', '274bff0b1fb7a8f1f130cf1de266d111', newContent, authToken, 
  (err, res) => {
    if(err) return console.log(err);
    console.log(`New document created with content ${newContent}`);
});
```

#### get(databaseId, documentId, cb)
Gets a document from database

```javascript
const muffler = require('muffler');

muffler.get('274bff0b1fb7a8f1f130cf1de266d111', 'document.json', (err, res) => {
  if(err) return console.log(err);
  console.log(res);
}); 
```

#### update(accountId, objectId, contents, authToken, cb)
Updates a document from a database. If the document does not exist, created it.

```javascript
const muffler = require('muffler');

const updateContent = 'this is the new content';
const authToken = ' fa249990930b19bef4949f8af1d36db70a91123'
muffler.update(
  'userAccount', '274bff0b1fb7a8f1f130cf1de266d111', updateContent, authToken, 
  (err, res) => {
    if(err) return console.log(err);
    console.log(`Updated with ${newContent}`);
});
```

#### delete(accountId, objectId, authToken)
Deletes a document from a database

```javascript
const muffler = require('muffler');

const authToken = ' fa249990930b19bef4949f8af1d36db70a91123'
muffler.delete('userAccount', '274bff0b1fb7a8f1f130cf1de266d111', authToken, 
  (err, res) => {
    if(err) return console.log(err);
    console.log('object deleted');
});
```


### Caveats
There is no way to ensure atomicity of transactions.

The document is the finer granularity for edit/update. This means that at
this point, when a field changes the whole blob needs to be updated. 

**Security**: When using Muffler.js in the frontend, do not forget you are exposing the 
authentication token to the world. Only expose the authentication token when 
create/update/delete is necessary. Obfuscate the code when keeping auhtentication
token in the browser, but bear in mind this is no silver bullet. **Important**:
if using the access token on the browser, create a token authorized to modify
only gist documents.

Use in production at your own responsability.


