var express = require("express");
var mysql = require('mysql');
var register = function(name,phone,password,callback){
	var result;
	pool = mysql.createPool({
		host : "localhost",
		port : 3306,
		database: 'book',
		user : "root",
		password : '123456' 
	})
		pool.getConnection(function(err,connection){
			if(err){
				result={
					err: true,
					result: "查找匹配注册失败" 
				}
				callback(result);
			}
			else{
					connection.query("select * from user where phone = ?",[phone],function(err,result){
						if(err){
							result= {
								err:true,
								result:"查找数据失败"
							}
							callback(result);
						}
						else{
							if(result.length>0){
								result = {
									err:false,
									result:"该用户已经注册"
								}
								callback(result);
							}
							else{
								connection.query("INSERT INTO user(name,phone,password)VALUES(?,?,?)",[name,phone,password],function(err,result){
									if(err){
										result= {
											err:true,
											result:"上传数据失败"
										}
										console.log(err);
									}
									else{
										result = {
											err:false,
											result:"数据初步存入数据库开启验证"
										}
									}
									callback(result);
								})
							}
						}
					})

			}
		})
}
module.exports = register;