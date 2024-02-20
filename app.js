const express = require('express');
const Stream = require('node-rtsp-stream');
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const multiparty = require('multiparty');
var  mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud'
});

const hostname = '192.168.2.26';
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
          const id = fields.id[0];
          const username = fields.username[0];
          const age = fields.age[0];
          const city = fields.city[0];
        
          res.statusCode = 200;
          res.end('Data received');
          connection.connect(function(err) {
            if (err) throw err;
            
            var sql = `INSERT INTO employs (id, username, age, city) VALUES (${id}, '${username}', ${age}, '${city}')`
            connection.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
            connection.query("SELECT * FROM employs WHERE id=2", function (err, result, fields) {
              if (err) throw err;
              console.log(result);
            });
          });
        });
      } else {
        res.statusCode = 404;
        res.end();
      }
});
connection.query("SELECT * FROM employs WHERE id=2", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

