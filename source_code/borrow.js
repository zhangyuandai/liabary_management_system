var express = require("express");
var mysql = require('mysql');
var borrow = function(name,phone,callback){
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
					connection.query("INSERT INTO borrow (name,phone)VALUES(?,?)",[name,phone],function(err,result){

						if(err){
							console.log(err)
							result= {
								err:true,
								result:"上传失败"
							}
						}
						else{
								result = {
									err:false,
									result:"借书成功"
								}
						}
						callback(result);
					})
			}
		})
}
module.exports = borrow;