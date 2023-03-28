const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  res.statusCode = 200;

  if (req.url.startsWith('/static')) {
    let parsedURL = req.url.split('/');
    let extension = parsedURL[3].split('.')[1];

    if (extension === 'css') {
      res.setHeader('Content-Type', 'text/css');
      const cssFile = fs.readFileSync(`./assets/css/${parsedURL[3]}`);
      return res.end(cssFile);
    }

    if (extension === 'jpg') {
      res.setHeader('Content-Type', 'image/jpeg');
      const dogImage = fs.readFileSync(`./assets/images/${parsedURL[3]}`);
      return res.end(dogImage);
    }
  }

  const index = fs.readFileSync('./index.html');
  res.setHeader('Content-Type', 'text/html');
  return res.end(index);
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
