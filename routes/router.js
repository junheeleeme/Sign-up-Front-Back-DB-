"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');


router.use(express.static(path.join(__dirname, '../public')));
//정적 파일 제공을 위한 선언

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))    
}); 

router.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/login.html'))    
}); 

router.get('/join', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/join.html'))    
}); 


module.exports = router;