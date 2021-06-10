"use strict";
// 모듈
const express = require('express');
const web = express(); 
const path = require('path');
const bodyParser = require('body-parser'); //바디파서
const mysql = require('mysql'); //mysql
const db = mysql.createConnection({//mysql info
    host: '3.34.124.239',
    user: 'root',
    password: '594573',
    port: '59686',
    database: 'account'
})

const home = require("./routes/home"); //라우팅

web.use(bodyParser.urlencoded( {extended : true } )); //바디파서 설정 
web.use(bodyParser.json()); //바디파서 설정


web.set("views", "../views");
web.set("view engine", "ejs");

web.use(express.static(path.join(__dirname, '/')));
web.use("/", home); //use -> 미들 웨어를 등록해주는 메서드

web.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))    
})


web.get('/join', (req, res) =>{
    res.sendFile(path.join(__dirname, 'join.html'))    
}); 

/*
web.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, 'login.html'))    
})
*/


web.post('/chk_overlap_id', (req, res)=>{
    let user_id;
    db.query(`SELECT u_id FROM ac;`, function(err, dbData){
        if(err) {
            console.log(err);
        }else{
            for(let i=0 ; i<dbData.length ; i++){
                if(dbData[i].u_id === req.body.id){      
                    res.send("overlap is true");
                }
            }
            res.send(req.body);
        }  
    })
})

web.post('/create_ac', (req, res)=>{
    console.log(req.body)
    res.send(req.body);    
    
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
