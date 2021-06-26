"use strict";
// 모듈
const express = require('express');
const web = express();
const router = require("./routes/router");
const join = require("./routes/join");
const port = 9000;


// page router
web.use('/', router);
web.use('/join', router);


web.listen(port, () =>{
    console.log('Express App on port ' + port + '!');    
});

// 회원가입
web.post('/users/id/check', join); //아이디 중복 체크
web.post('/users/email/check', join); // 이메일 중복 체크
web.post('/create_ac', join); // 회원등록


module.exports = router;

