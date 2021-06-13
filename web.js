"use strict";
// 모듈
const express = require('express');
const web = express(); 
const path = require('path');
const axios = require("axios");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); //바디파서
const mysql = require('mysql'); //mysql
//Mysql 데이터는 다른 경로의 파일로 만들어 노출되지 않도록 다루고 .gitignore에 등록

const db = mysql.createConnection({//mysql info
    host: '15.164.95.58',
    user: 'root',
    password: '594573',
    port: '53450',
    database: 'account'
})

web.use(bodyParser.urlencoded( {extended : true } )); //바디파서 설정 
web.use(bodyParser.json()); //바디파서 설정

//정적 파일 제공을 위한 선언
web.use(express.static(path.join(__dirname, '/web/src/views'))); 

//join 대기
web.get('/join', (req, res) =>{
    res.sendFile(path.join(__dirname, './web/src/views/join.html'))    
}); 



//로그인 기능 
/*
const passwd = 'as!594573';
const cryted_pw = bcrypt.hashSync(passwd, 10);

web.post('/login_request', (req, res)=>{

    db.query(`SELECT u_pw FROM ac where u_no = 4;`, function(err, cryted_pw){
        
        bcrypt.compare(passwd , cryted_pw[0].u_pw, (err, same) => {
            if(err){
                console.log(err);
            }else{
                if(same === true){
                    console.log("로그인 성공");
                }else{
                    console.log("로그인 실패");
                }	
            }
        })
    })  
})
*/

//POST 수신 대기 - uid 중복 체크
web.post('/chk_overlap_id', (req, res)=>{
    
	const chk_id = req.body.account;
	let succeed = true;
	
    db.query(`SELECT u_id FROM ac;`, function(err, dbData){
        if(err) {
            console.log(err);
        }else{
			
            for(let i=0 ; i<dbData.length ; i++){
                if(dbData[i].u_id === chk_id.id){      
                    res.status(400).send('Not found'); //중복된 id가 있을 경우	
					console.log('/chk_overlap_id : users id overlap');
					succeed = false;
                }
            }
			if(succeed){
				res.sendStatus(200); //성공 호출을 위해 받은 데이터 그대로 송신
				console.log('/chk_overlap_id : users id not overlap')
			}            
        }  
    })
})

//POST 수신 대기 - email 중복 체크
web.post('/chk_overlap_email', (req, res)=>{
    
	const chk_email = req.body.account;
	let succeed = true;
	console.log(req.body)
	
    db.query(`SELECT u_email FROM ac;`, function(err, dbData){
        if(err) {
            console.log(err);
        }else{
			
            for(let i=0 ; i<dbData.length ; i++){
                if(dbData[i].u_email === chk_email.email){      
                    res.status(400).send('Not found'); //중복된 id가 있을 경우	
					console.log('/chk_overlap_email : users email overlap');
					succeed = false;
                }
            }
			if(succeed){
				res.sendStatus(200); //성공 호출을 위해 받은 데이터 그대로 송신
				console.log('/chk_overlap_email : users email not overlap')
			}            
        }  
    })
})

//POST 수신 대기 - 회원가입
web.post('/create_ac', (req, res)=>{
    
    console.log(req.body)
	
	const encrypted_pw = bcrypt.hashSync(req.body.pw, 10);
	
    //받은 회원 정보 DB 입력
    db.query(`INSERT INTO ac (u_id, u_pw, u_name, u_birth, u_phone, u_email, u_gender)
            VALUES('${req.body.id}', '${encrypted_pw}', '${req.body.name}', '${req.body.birth}',
            '${req.body.phone}', '${req.body.email}', '${req.body.gender}');`, function(err, dbData){
        if(err) {
            console.log(err);
            res.status(400).send();
        }else{
            res.status(200).send();
            console.log('회원가입 완료');
        }
    })
})
module.exports = web;
