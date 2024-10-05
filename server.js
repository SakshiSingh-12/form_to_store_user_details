const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');


const app = express();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'enter ypur password',
    database: 'formdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit', upload.single('image'), (req, res) => {
    const { name, gender, mobile, email } = req.body;
    const image = req.file.buffer;

    let sql = 'INSERT INTO users (name, gender, mobile, email, image) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, gender, mobile, email, image], (err, result) => {
        if (err) throw err;
        res.send('Go and watch http://localhost:3000/view_users in your browser');
    });
});


app.get('/view_users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/api/view_users', (req, res) => {
    let sql = 'SELECT id, name, gender, mobile, email FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/api/user_image/:id', (req, res) => {
    const userId = req.params.id;
    let sql = 'SELECT image FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(result[0].image);
        } else {
            res.status(404).send('Image not found');
        }
    });
});

// Delete user route
app.delete('/api/delete_user/:id', (req, res) => {
    const userId = req.params.id;
    let sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});



app.post('/submit', upload.single('image'), (req, res) => {
    const { name, gender, mobile, email } = req.body;
    const image = req.file.buffer;
    

    let sql = 'INSERT INTO users (name, gender, mobile, email, image) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, gender, mobile, email, image], (err, result) => {
        if (err) throw err;
        res.send('Go and watch http://localhost:3000/view_users in your browser');
    });
});


    
app.get('/view_users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/api/view_users', (req, res) => {
    let sql = 'SELECT id, name, gender, mobile, email FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

    
app.get('/api/user_image/:id', (req, res) => {
    const userId = req.params.id;
    let sql = 'SELECT image FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(result[0].image);
        } else {
            res.status(404).send('Image not found');
        }
    });
});


// Delete user route
app.delete('/api/delete_user/:id', (req, res) => {
    const userId = req.params.id;
    let sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});







