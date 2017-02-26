# Muffler.js

#### JSON objects storage for fast prototyping. Sitting on top of Github's gist.

![muffler](https://raw.githubusercontent.com/gpestana/muffler/master/muffler.png)


### Features
- JSON objects storage
- No backend required
- HTTPS
- API
  - `get()`
  - `update()`
  - `delete()`
- Backend and frontend integration

### API

#### get(accountId, objectId)

```javascript
const muffler = require('muffler');

muffler.get('userAccount', '274bff0b1fb7a8f1f130cf1de266d111', (err, res) => {
  if(err) return console.log(err);
  console.log(res);
}); 
```

#### update(accountId, objectId, contents, authToken)

```javascript
const muffler = require('muffler');

const newContent = 'this is the new content';
const authToken = ' fa249990930b19bef4949f8af1d36db70a91123'
muffler.update(
  'userAccount', '274bff0b1fb7a8f1f130cf1de266d111', newContent, authToken, 
  (err, res) => {
    if(err) return console.log(err);
    console.log(`Updated with ${newContent}`);
});
```

#### delete(accountId, objectId, authToken)

```javascript
const muffler = require('muffler');

const authToken = ' fa249990930b19bef4949f8af1d36db70a91123'
muffler.delete('userAccount', '274bff0b1fb7a8f1f130cf1de266d111', authToken, 
  (err, res) => {
    if(err) return console.log(err);
    console.log('object deleted');
});

```

### Security considerations
When using Muffler.js in the frontend, do not forget you are exposing the 
authentication token to the world. Only expose the authentication token when 
update/delete is necessary. Obfuscate the code when keeping auhtentication
token in the browser, but bear in mind this is no silver bullet. **Important**:
if using the access token on the browser, create a token authorized to modify
only gist documents.

Use in production at your own responsability.


---
```
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
