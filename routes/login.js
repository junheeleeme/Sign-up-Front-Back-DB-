"use strict";

const express = require('express');
const login = express.Router();
const db = require("./db");
const bcrypt = require('bcrypt');
const path = require('path');

const bodyParser = require('body-parser'); //바디파서
login.use(bodyParser.urlencoded( {extended : true } )); //바디파서 설정 
login.use(bodyParser.json()); //바디파서 설정


login.post('/users/login', (req, res)=>{
    
	const user_id = req.body.id;
	const user_pw = req.body.pw;	

	db.query(`SELECT u_pw FROM ac WHERE u_id = '${user_id}';`, function(err, getPasswd){

		if(!err){
			
			bcrypt.compare(user_pw , getPasswd[0].u_pw, (err, same) => { //passwd 비교
				
				if(err){
					
					res.status(400).send();
					console.log(err);
					
				}else{
					
					if(same === true){ //로그인 성공
						res.status(200).send();
						console.log("Login Successful");
					}else{				//로그인 실패
						res.status(400).send();
						console.log("Login Failed");
					}
					
				}
			})
		}else{
			console.log(err)
			console.log('DB ERROR!');
		}
	})  

});


module.exports = login;