var express = require("express");
var mysql = require('mysql');
var upload = function(name,writer,address,num,callback){
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
								result:"连接数据库失败"
							}
							callback(result);
						}
						else{
							if(result.length>0){
								result = {
									err:false,
									result:"该书已经有了"
								}
								callback(result);
							}
							else{
								connection.query("INSERT INTO book (name,writer,address,num)VALUES(?,?,?,?)",[name,writer,address,num],function(err,result){
									if(err){
										console.log(err)
										result= {
											err:true,
											result:"图书上传失败"
										}
									}
									else{
										result = {
											err:false,
											result:"图书上传成功"
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
module.exports = upload;