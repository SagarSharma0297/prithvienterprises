const express = require('express');
const app = express();
const port = process.env.PORT||9000;
var bodyParser = require('body-parser');
var path = require('path');
const URL = "mongodb+srv://SAGAR_VASHISTHA:72zqqEgfaRpddPh5@cluster0.eubhu.mongodb.net/maskoTMS?retryWrites=true&w=majority";
const cors = require('cors');
var mysql = require('mysql');

app.use(bodyParser());
app.use(cors());
app.use(express.static(__dirname + '/public'));

// var connection = mysql.createConnection({
// 	host:"localhost",
// 	user:"root",
// 	password:"Vashistha@0297",
// 	database : "vehicledb",
// })


var connection = mysql.createPool({
	host:"bgubididdk0qtmvnlqpf-mysql.services.clever-cloud.com",
	user:"ugdyn620pbgoihzr",
	password:"DFQxqRCp1e1J0jZfzwlN",
	database : "bgubididdk0qtmvnlqpf",
})

// connection.connect(function(err) {
// 	if(err){
// 	console.log("Error in the connection")
// 	console.log(err)
// 	}
// 	else{
// 	console.log(`Database Connected`)
// 	connection.query(`SHOW DATABASES`,
// 	function (err, result) {
// 		if(err)
// 		console.log(`Error executing the query - ${err}`)
// 		else
// 		console.log("Result: ",result)
// 	})
// 	}
// })


app.post('/api/login',(req,res) => {
    console.log(req.body.username)
    connection.query(`select * from users where username = '${req.body.username}'`,(err,result) => {
        if(err){
            console.log(err)
            res.statusCode = 400;
            res.statusMessage ='Bad Request';
            res.json({
                status:"failed",
                message:err,
            })
        }
        else {
           if(result.length === 0){
               res.statusCode = 404;
               res.statusMessage = "User Not Found";
               res.json({
                   status:"failed",
                   message:"user not found"
               });
           }
           else {
               if(req.body.password === result[0].password){
                res.statusCode = 200;
                res.statusMessage = "User Found";
                res.json({
                    status:"success",
                    role:result[0].role
                });
               } else{
                res.statusCode = 401;
                res.statusMessage = "Password not match";
                res.json({
                    status:"failed",
                    message:"Password Not Match"
                })

               }
           }
        }
    })
});


app.use('/api/getdata',(req,res) => {
    connection.query(`select * from vehiclelist`,(err,result) => {
        if(err){
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});

app.use('/api/getdetaildata',(req,res) => {
    console.log(req.query)
    connection.query(`select * from vehiclelist where registration like '%${req.query.searchvalue}%'`,(err,result) => {
        if(err){
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/login.html'),(err)=>{
        if(err) {
            console.log(err)
        }
    })
});

app.get('/main',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/main.html'),(err)=>{
        if(err) {
            console.log(err)
        }
    })
});

app.get('/detailpage',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/detailpage.html'),(err)=>{
        if(err) {
            console.log(err)
        }
    })
});

app.get('/api/getvaluebylan',(req,res)=>{
    console.log(req.query.role);
    // res.send(req.query)
    // res.sendFile(path.join(__dirname+'/public/detailpage.html'),(err)=>{
    //     if(err) {
    //         console.log(err)
    //     }
    // })
    if(req.query.role == "admin"){
        connection.query(`select * from vehiclelist where LAN = '${req.query.searchVal}'`,(err,result) => {
            if(err){
                console.log(err)
            }
            else {
                    res.send(result)
            }
        })
    }
    else {
        connection.query(`select LAN,CUSTOMER_NAME,REGISTRATION,ASSET_MODEL,VIN,ENGINE from vehiclelist where LAN = '${req.query.searchVal}'`,(err,result) => {
            if(err){
                console.log(err)
            }
            else {
                    res.send(result)
            }
        })
    }
   
});



app.listen(port,(err)=>{
    if(err){
        console.log(err)
    } else {
        console.log(`TMS server is running at port ${port}`);
    }
});
