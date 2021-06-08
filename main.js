const express = require('express');
const path = require('path');
const web = express();
const port = 8080;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '13.209.85.54',
    user: 'root',
    password: '594573',
    port: '58417',
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
    console.log(req.body);
    
    db.query('INSERT INTO ac_table ()', function(err, res){
        if(err) {
            console.log(err);
        }
        console.log(res)
    })

})

web.listen(port, () =>{
    console.log('Express App on port ' + port + '!');    
});