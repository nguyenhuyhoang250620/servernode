const WebSocket = require('ws');
const http = require('http');

// Tạo máy chủ HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running!');
});

// Kết nối máy chủ WebSocket với máy chủ HTTP
const wss = new WebSocket.Server({ server });

// Xử lý sự kiện khi có kết nối mới
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Xử lý sự kiện khi nhận dữ liệu từ client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });

  // Gửi dữ liệu đến client
  ws.send('Hello, client!');

  // Xử lý sự kiện khi kết nối đóng
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Lắng nghe cổng 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
