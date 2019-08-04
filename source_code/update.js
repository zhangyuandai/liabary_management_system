var express = require("express");
var mysql = require('mysql');
var update = function(name,num,callback){
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
					connection.query("update book SET num = ? where name = ?",[num,name],function(err,result){
						if(err){
							result= {
								err:true,
								result:"更新失败"
							}
							console.log(err);
						}
						else{
							result ={
								err:false,
								result:"更新图书数量成功"
							}
						}
						callback(result);
					})
			}
		})
}
module.exports = update;