"use strict";

const express = require('express');
const join = express.Router();
const db = require("./db");
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser'); //바디파서
join.use(bodyParser.urlencoded( {extended : true } )); //바디파서 설정 
join.use(bodyParser.json()); //바디파서 설정


//POST - 아이디 중복 체크
join.post('/users/id/check', (req, res)=>{
    
	const chk_id = req.body.account;
	let succeed = true;
	
    db.query(`SELECT u_id FROM ac;`, function(err, dbData){
        if(err) {
            console.log(err);
        }else{
			
            for(let i=0 ; i<dbData.length ; i++){
                if(dbData[i].u_id === chk_id.id){      
                    res.status(400).send('Not found'); //중복된 id가 있을 경우	
					console.log('아이디 중복 체크 : duplicated');
					succeed = false;
                }
            }
			if(succeed){
				res.sendStatus(200); //성공 호출을 위해 받은 데이터 그대로 송신
				console.log('아이디 중복 체크 : Not duplicated');
			}            
        }  
    })
});

//POST - email 중복 체크
join.post('/users/email/check', (req, res)=>{
    
	const chk_email = req.body.account;
	let succeed = true;
		
    db.query(`SELECT u_email FROM ac;`, (err, dbData) => {
        if(err) {
            console.log(err);
        }else{
			
            for(let i=0 ; i<dbData.length ; i++){
                if(dbData[i].u_email === chk_email.email){      
                    res.status(400).send('Not found'); //중복된 id가 있을 경우	
					console.log('아이디 중복 체크 : duplicated');
					succeed = false;
                }
            }
			
			if(succeed){
				res.status(200).send(); //성공
				console.log('아이디 중복 체크 : Not duplicated');
			}
			
        }  
    })
});

//POST - 회원가입
join.post('/create/users/account', (req, res) => {
    
    console.log(req.body);
	
	const encrypted_pw = bcrypt.hashSync(req.body.pw, 10);
	/*
    //받은 회원 정보 DB 입력
    db.query(`INSERT INTO ac (u_id, u_pw, u_name, u_birth, u_phone, u_email, u_gender)
            VALUES('${req.body.id}', '${encrypted_pw}', '${req.body.name}', '${req.body.birth}',
            '${req.body.phone}', '${req.body.email}', '${req.body.gender}');`, (err, dbData) => {
        
		console.log(err);
		if(err) {
			res.status(400).send();
            console.log(err);
        }else{
            res.redirect(200, '/login.html');
            console.log('succeed join!');
        }
		
    })
	*/
	res.redirect(200, '/login');
});


module.exports = join;


//로그인 기능 
/*
const passwd = 'as!594573';
const cryted_pw = bcrypt.hashSync(passwd, 10);

router.post('/login_request', (req, res)=>{

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

