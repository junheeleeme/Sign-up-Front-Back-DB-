"use strict";

const mysql = require('mysql'); //mysql
//Mysql 데이터는 다른 경로의 파일로 만들어 노출되지 않도록 다루고 .gitignore에 등록

const db = mysql.createConnection({//mysql connect info
    // 어차피 아이피랑 포트 매일 바뀜
    host: '3.36.128.148',
    user: 'root',
    password: '',
    port: '51513',
    database: 'account'
})

module.exports = db;