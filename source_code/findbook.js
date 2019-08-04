var express = require("express");
var mysql = require('mysql');
var findbook = function(name,callback){
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
					connection.query("select * from book where name = ?",[name],function(err,result){
						if(err){
							result= {
								err:true,
								result:"查找失败"
							}
						}
						else{
							if(result.length==1){
								result = {
									err:false,
									result:result
								}
							}
							else{
								result = {
									err:true,
									result:"没有书"
								}
							}
						}
						callback(result);
					})
			}
		})
}
module.exports = findbook;