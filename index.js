const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', ( req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('index', {files: files});
    })
    // res.send("Welcome! The Server is working!Errors: None");
});

app.post('/file/create', ( req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.desc, (err) => {
        res.redirect('/');
    })
});

app.get('/file/:filename', ( req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, fileData) => {
        res.render('show', {filename: req.params.filename, fileData: fileData});
    });
});

app.get('/file/delete/:filename', ( req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        if(err) return err;
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});