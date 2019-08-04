let express = require('express');
let http = require('http');
let app = express();
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest:'uploads/'})
let cookieParser = require('cookie-parser');
let session = require('cookie-session');
let router = express.Router();
let bodyParser = require('body-parser');
let user = require('./user');
app.use(cookieParser(''));
app.use(session({
	secret: ' Sessiontest',
	name: 'session_from_lb',
	cookie:{maxAge:36000 * 24 * 30},
	resave: true,
	saveUnitialized:true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*",function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
	next();
});
app.use('/user/',user);
app.listen(1337);
console.log("localhost:1337")