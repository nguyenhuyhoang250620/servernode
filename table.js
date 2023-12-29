const sqlite3 = require('sqlite3').verbose();

// Kết nối đến cơ sở dữ liệu đã tồn tại có tên là 'example.db'
const db = new sqlite3.Database('quote.db');

// Thêm cột mới có tên là 'new_column' vào bảng 'your_table'
const sql = 'ALTER TABLE quote ADD COLUMN ghichu TEXT';

db.run(sql, [], (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Cột mới đã được thêm vào thành công!');
    }
});

// Đóng kết nối với cơ sở dữ liệu
db.close();