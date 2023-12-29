const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite = require('sqlite3').verbose();
const url = require("url");
let sql;
const db = new sqlite.Database('./quote.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

app.use(bodyParser.json());

app.post('/quote', (req, res) => {
    try {
        const { movie, quote, character,ghichu } = req.body;
        sql = "INSERT INTO quote(movie, quote, character,ghichu) VALUES (?,?,?,?)"
        db.run(sql, [movie, quote, character,ghichu], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err });

            console.log("successful input", movie, quote, character);
        })
        res.json({
            status: 200,
            success: true,
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
})


//  get request
app.get("/quote", (req, res) => { 
    sql = "SELECT * FROM quote";
    console.log(sql)
    try {
        db.all(sql, [], (err,rows)=>{
            if(!req.app){
                return res.status(400).send("invalid request");
            }
            console.log("rows",rows)
            if(err) return res.json({ status: 300, success: false, error: err });

            if(rows.length < 1)
                return res.json({ status: 300, success: false, error: "No match" });

            return res.json({ status: 200, data: rows, success: true})
        
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
})


app.delete("/quote", (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ status: 400, success: false, error: "Missing 'id' parameter" });
    }

    const sql = "DELETE FROM quote WHERE id = ?";

    try {
        db.run(sql, id, (err) => {
            if (err) {
                return res.json({ status: 300, success: false, error: err });
            }

            return res.json({ status: 200, success: true, message: "Item deleted successfully" });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
});
app.listen(3000, ()=>{
    console.log("Your app is running!"); 
});