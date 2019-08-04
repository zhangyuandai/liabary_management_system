var express = require("express");
var mysql = require('mysql');
var still = function(name,phone,callback){
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
					connection.query("delete from borrow where name = ? and phone=?",[name,phone],function(err,result){
						if(err){
							result= {
								err:true,
								result:"还书失败"
							}
							console.log(err);
						}
						else{
								result = {
									err:false,
									result:"还书成功"
								}
						}
						callback(result);
					})
			}
		})
}
module.exports = still;