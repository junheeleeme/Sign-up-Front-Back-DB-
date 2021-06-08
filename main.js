const express = require('express');
const path = require('path');
const web = express();
const port = 8080;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '54.180.116.191',
    user: 'root',
    password: '594573',
    port: '58420',
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

web.post('/create_ac', (req, res)=>{
    
    res.send(req.body);
    //const ac = [res.body.id, res.body.pw, res.body.id, res.body.birth, res.body.phone, res.body.email, res.body.gender];
    

    db.query(`INSERT INTO ac (u_id, u_pw, u_name, u_birth, u_phone, u_email, u_gender)
            VALUES('${req.body.id}', '${req.body.pw}', '${req.body.id}', '${req.body.birth}', ${req.body.phone}, '${req.body.email}', '${req.body.gender}')`, function(err, res){
        if(err) {
            console.log(err);
        }else{
            console.log('회원가입 완료');
        }
        
    })
    /*
    db.query(`INSERT INTO ac_table (u_id, u_pw, u_name, u_birth, u_phone, u_email, u_gender)
            VALUES( ${ac[0]}, ${ac[1]}, ${ac[2]}, ${ac[3]}, ${ac[4]}, ${ac[5]}, ${ac[6]})`,
    function(err, res){
                if(err){
                    console.log(err)
                }
                console.log("success!");
    })
    */
})

web.listen(port, () =>{
    console.log('Express App on port ' + port + '!');    
});