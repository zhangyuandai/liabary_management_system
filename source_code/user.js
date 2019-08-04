var express = require('express');
var router = express.Router();
var app= express();
var multer = require('multer');
var upload = multer({dest:'uploads/'})
var querystring= require('querystring');
var Register = require('./register.js');
var Login = require('./login.js');
var Upload = require('./upload.js');
var Update = require('./update.js');
var Findbook = require('./findbook.js');
var Findall = require('./findall.js');
var Findperson = require('./findperson.js');
var Borrow = require('./borrow.js');
var Still = require('./still.js');
function returnJson(req,res,result){
	 	if(req.jsonp){
	 		res.jsonp(result);
	 	}
	 	else{
	 		res.json(result);
	 	}
}
//注册
router.use('/register',function(req,res){
	var name,phone,password;
	if(req.body.name){
		name = req.body.name;
		phone = req.body.phone;
		password  =req.body.password;
	}
	else if(req.query.name){
		name = req.query.name;
		phone = req.query.phone;
		password = req.query.password;
	}
	Register(name,phone,password,function(result){
		returnJson(req,res,result);
	})
})
//登录
router.use('/login',function(req,res){
	var phone,password;
	if(req.body.phone){
		phone  = req.body.phone;
		password = req.body.password;
	}
	else if(req.query.phone){
		phone = req.query.phone;
		password = req.query.password;
	}
	Login(phone,password,function(result){
		returnJson(req,res,result);
	})
})
//上传书籍
router.use('/upload',function(req,res){
	var number,name,writer,address,num;
	if(req.body.name){
		name = req.body.name;
		writer = req.body.writer;
		address = req.body.address;
		num = req.body.num;
	}
	else if(req.query.name){
		name= req.query.name;
		writer = req.query.writer;
		address = req.query.address;
		num = req.query.num;
	}
	Upload(name,writer,address,num,function(result){
		returnJson(req,res,result);
	})
})
//修改数量
router.use('/update',function(req,res){
	var name,num;
	if(req.body.name){
		name = req.body.name;
		num = req.body.num;
	}
	else if(req.query.name){
		name = req.query.name;
		num = req.query.num;
	}
	Update(name,num,function(result){
		returnJson(req,res,result);
	})
})
//名字查找某本书
router.use('/findbook',function(req,res){
	var name;
	if(req.body.name){
		name = req.body.name;
	}
	else if(req.query.name){
		name = req.query.name;
	}
	Findbook(name,function(result){
		returnJson(req,res,result);
	})
})
//查找所有的书
router.use('/findall',function(req,res,next){
	Findall(function(result){
		returnJson(req,res,result);
	})
})
//查看自己借了什么书
router.use('/findperson',function(req,res){
	if(req.body.phone){
		phone = req.body.phone;
	}
	else if(req.query.phone){
		phone = req.query.phone;
	}
	Findperson(phone,function(result){
		returnJson(req,res,result);
	})
})
//借书(每次借完然后去更新一次数量)
router.use('/borrow',function(req,res){
	var name;
	if(req.body.name){
		name = req.body.name;
		phone =req.body.phone;
	}
	else if(req.query.name){
		name = req.query.name;
		phone =req.query.phone;
	}
	Borrow(name,phone,function(result){
		returnJson(req,res,result);
	})  
})
//还书(每次还完去更新一次数量)
router.use('/still',function(req,res){
	var name;
	if(req.body.name){
		name = req.body.name;
		phone =req.body.phone;
	}
	else if(req.query.name){
		name = req.query.name;
		phone = req.query.phone;
	}
	Still(name,phone,function(result){
		returnJson(req,res,result);
	})
})
module.exports = router;