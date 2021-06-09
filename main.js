const express = require('express');
const path = require('path');
const web = express();
const port = 8080;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '3.34.124.239',
    user: 'root',
    password: '594573',
    port: '59686',
    database: 'account'
})
/*
db.connect();
db.query('SELECT * FROM ac', function(err, res){
    if(err) {
        console.log(err);
    }
    console.log(res)
})


db.query(`INSERT INTO ac_table (u_id, u_pw, u_name, u_birth, u_phone, u_email, u_gender)
            VALUES(hello8836, 594573, 이다솔, 19940830, 01043211234, some321@naver.com, female)`),{
        if(err) {
            console.log(err);
        }
        console.log('Success!');
    })
*/


web.use(bodyParser.urlencoded( {extended : true } )); 
web.use(bodyParser.json());

web.use('/', express.static(path.join(__dirname)));

web.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))    
})

web.get('/detail', (req, res) =>{
    res.sendFile(path.join(__dirname, 'detail-page.html'))    
});

web.get('/join', (req, res) =>{
    res.sendFile(path.join(__dirname, 'join.html'))    
}); 

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
    
    /*
    
*/
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

web.listen(port, () =>{
    console.log('Express App on port ' + port + '!');    
});