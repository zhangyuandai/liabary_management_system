var express = require("express");
var mysql = require('mysql');
var register = function(phone,password,callback){
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
					connection.query("select * from user where phone = ? and password = ?",[phone,password],function(err,result){
						if(err){
							result= {
								err:true,
								result:"上传数据失败"
							}
						}
						else{
							if(result.length==1){
								result = {
									err:false,
									result:"登陆成功"
								}
							}
							else{
								result = {
									err:true,
									result:"登录失败"
								}
							}
						}
						callback(result);
					})
			}
		})
}
module.exports = register;