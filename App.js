var express = require('express');
var multer = require('multer');

var app = express();

var storage = multer.diskStorage({
    destination: function (req , file, callback) {
        callback(null, './uploads');
    },
    filename : function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+'.jpg');
    }
});

var upload = multer({storage: storage}).single('userPhoto');

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo', function (req, res) {
    upload(req, res, function (err) {
        if(err){
            return res.end("Error Uploading File");
        }
        res.end("File Is Uploaded SuccessFully.... :)");
    });
});

app.listen(4000, function () {
    console.log("Server is Running on Port : 4000");
});