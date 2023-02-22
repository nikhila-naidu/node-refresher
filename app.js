const http = require('http');

http
  .createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
      res.end(JSON.stringify({ loggedIn: 'false', method: 'GET' }));
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        console.log(body);
        const parsedBody = JSON.parse(body);

        // this is from database
        const password = 'iwillhack';

        if (parsedBody.password !== password) {
          res.end(JSON.stringify({ loggedIn: 'false', method: 'POST' }));
        }

        res.end(JSON.stringify({ loggedIn: 'true', method: 'POST' }));
      });
    }
  })
  .listen(5005);
