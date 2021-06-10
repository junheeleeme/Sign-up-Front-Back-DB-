"use strict";
//모듈
const web = require("../../web");
const port = 8080;

web.listen(port, () =>{
    console.log('Express App on port ' + port + '!');    
});
