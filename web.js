"use strict";
// 모듈
const express = require('express');
const web = express(); 
const path = require('path');
const bodyParser = require('body-parser'); //바디파서
const mysql = require('mysql'); //mysql
//Mysql 데이터는 다른 경로의 파일로 만들어 노출되지 않도록 다루고 .gitignore에 등록
const db = mysql.createConnection({//mysql info
    host: '3.35.13.17',
    user: 'root',
    password: '594573',
    port: '55338',
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


//POST 수신 대기 - uid 중복 체크
web.post('/chk_overlap_id', (req, res)=>{
    console.log(req.body)
    db.query(`SELECT u_id FROM ac;`, function(err, dbData){
        if(err) {
            console.log(err);
        }else{
            for(let i=0 ; i<dbData.length ; i++){
                if(dbData[i].u_id === req.body.id){      
                    res.send("overlap is true"); //중복된 id가 있을 경우 다른 값 송신
                }
            }
            res.send(req.body); //성공 호출을 위해 받은 데이터 그대로 송신
        }  
    })
})


//POST 수신 대기 - 회원가입 신청
web.post('/create_ac', (req, res)=>{
    
    res.send(req.body);    
    //받은 회원 정보 DB 입력
    db.query(`INSERT INTO ac (u_id, u_pw, u_name, u_birth, u_phone, u_email, u_gender)
            VALUES('${req.body.id}', '${req.body.pw}', '${req.body.name}', '${req.body.birth}', ${req.body.phone}, '${req.body.email}', '${req.body.gender}');`, function(err, dbData){
        if(err) {
            console.log(err);
        }else{
            console.log('회원가입 완료');
        }
    })
})

module.exports = web;
