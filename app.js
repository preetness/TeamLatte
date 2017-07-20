const express = require('express');
const app = express();

app.listen(3000);

app.get('/', function(req, res) {

  let options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile('index.html', options);
});
