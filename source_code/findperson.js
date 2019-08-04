var express = require("express");
var mysql = require('mysql');
var findall = function(phone,callback){
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
					result: "查找是否借书失败" 
				}
				callback(result);
			}
			else{
					connection.query("select * from borrow where phone =?",[phone],function(err,result){
						if(err){
							result= {
								err:true,
								result:"查找借书失败"
							}
						}
						else{
							if(result.length>0){
								result = {
									err:false,
									result:result
								}
							}
							else{
								result = {
									err:true,
									result:"没有借书"
								}
							}
						}
						callback(result);
					})
			}
		})
}
module.exports = findall;