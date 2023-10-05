const express = require('express');
const Stream = require('node-rtsp-stream');
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const multiparty = require('multiparty');

const hostname = '192.168.2.27';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        const form = new multiparty.Form();
    
        form.parse(req, (err, fields) => {
          if (err) {
            res.statusCode = 400;
            res.end('Error parsing form data');
            return;
          }
    
          // Lấy giá trị của trường 'data'
          const data = fields.data[0];
    
          // Ghi log giá trị dữ liệu nhận được từ phía frontend
          console.log('Received data:', data);
    
          // Trả về phản hồi cho phía frontend
          res.statusCode = 200;
          res.end('Data received');
        });
      } else {
        res.statusCode = 404;
        res.end();
      }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

