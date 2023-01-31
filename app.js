const http = require('http');
const fs = require('fs');

const bodyParser = require('body-parser');
const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use('/login',(req,res,next)=>{

    
        
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/message" method="GET"><input type="text" id="username" name="username" placeholder="Enter Username"><button type="submit"> Send </button></form>');
        

    });
app.get('/message',(req,res,next)=>{
        fs.readFile('message.txt',(err,data)=>{

            if(err)
            {
                console.log(err)
            }
            res.send(`${data}<form action="/" method = "POST" onSubmit = "document.getElementById('username').value = localStorage.getItem('username')" >
            <input type="text" name="message" id = "message" placeholder="Enter Your Message">
            <input type="hidden" id="username" name="username" placeholder="Enter Username">
            <br>
            <button type="submit"> Send </button></form>`);
        });
        
     

    });

app.post('/',(req,res,next)=>{
    console.log(req.body.username);
        console.log(req.body.message);
   
        fs.writeFile('message.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
            err ? console.log(err):res.redirect('/message');
         });
   
       
    });

    




  

    
        



app.listen(3000);

