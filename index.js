const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
var bodyParser = require('body-parser');
var path = require('path');
const URL = "mongodb+srv://SAGAR_VASHISTHA:2oZScyMYdtU7tqvZ@cluster0.eubhu.mongodb.net/PrithviEnterPrises?retryWrites=true&w=majority";
const cors = require('cors');
var mysql = require('mysql');
const mongoose = require('mongoose');
const Vehicle = require('./modals/vehicleSchema');
const Infinity = require('./modals/infinityScema');
const Users = require('./modals/userSchema');
mongoose.set('strictQuery', true);
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected To MongoDB")
    }
});

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello')
    console.log('hello')
})

app.delete('/api/deleteUser',(req,res) => {
  
    const {id} = req.body;

    try{
        Users.findByIdAndDelete(id ,(err,result)=>{
            if(err){
                res.json({
                    status: 417,
                    message: "Failure",
                    data: {}
                })
                console.log(err)
            }else{
                res.json({
                    status: 204,
                    message: "User Deleted",
                    data: result
                })
                console.log(result)
            }

        })
    }catch(err){
        res.json({
            status: 500,
            message: "Error",
            data: {},
        })
        console.log(err)
    }
})

app.post('/api/createNewUser',async(req,res) => {
    const {username,password,firstName,lastName} =  req.body;
    console.log(username,password,firstName,lastName)
    try{
        Users.create({createdAt:new Date(),"username":username,"password":password,"role":"user","firstName":firstName,"lastName":lastName,"identifier":"first"},(err,result) => {
            if(err){
                console.log('there is some error',err)
                res.statusCode = 417;
                res.statusMessage = "Something went wrong";
                res.json({
                    status: 417,
                    message: "Failure",
                    data: {}
                })

            }else{
                console.log(result)
                res.statusCode = 417;
                res.statusMessage = "User Created";
                res.json({
                    status: 201,
                    message: "User created",
                    data: result,
                })
            }
        })
    }catch(error){
        console.log(error)
        res.json({
            status: 500,
            message: "Error",
            data: {},
        })
    }
})

app.get('/api/getUsersList', async (req,res) => {
    try{
        const users = await Users.find();
            if(!users){
                console.log('Get User List Api fails')
            }else{
                console.log('this is the result',users)
                res.status = 200;
                res.statusMessage = "User List Fetched";
                // res.header({"report":"ok"})
                // res.writeHead({
                //     Accept: 'application/json',
                //     'Content-Type': 'application/json'
                // })
                res.json({
                    status: 200,
                    message: "success",
                    data: users,
                })
            }
        }catch(error){
        res.status = 500;
        res.json({
            status: 500,
            message: "Server Error",
            data:[],
        })
    }

});

app.post('/api/login', async (req, res) => {
    // console.log(req.body.username)
    const { username, password ,androidId} = req.body;
    if(!androidId){

        res.statusCode = 404;
        res.statusMessage = "Please Update Your App";
        res.json({
            status: "failed",
            message: "Please Update Your App"
        })
        return;

    }
    console.log(androidId)
    const user = await Users.findOne({ username }).lean();
    console.log(user)

    if (!user) {
        res.statusCode = 404;
        res.statusMessage = "User Not Found";
        res.json({
            status: "failed",
            message: "user not found"
        })
    }
    else if (user.password === password) {
        if(user.identifier === 'first'){
            res.statusCode = 200;
            res.statusMessage = "User Found";
            res.json({
                status: "success",
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
            });
            const result = Users.findByIdAndUpdate(user._id,{identifier:androidId},(err,res)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(res)
                }
            })
        } else if(user.identifier === androidId) {
            res.statusCode = 200;
            res.statusMessage = "User Found";
            res.json({
                status: "success",
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
            });
        } else{

            res.statusCode = 401;
            res.statusMessage = "already login on other device";
            res.json({
                status: "failed",
                message: "Already Login On Other Device",
            })

        }
        // res.statusCode = 200;
        // res.statusMessage = "User Found";
        // res.json({
        //     status: "success",
        //     role: user.role,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     userName: user.userName,
        // });
    } else {
        res.statusCode = 401;
        res.statusMessage = "Password not match";
        res.json({
            status: "failed",
            message: "Password Not Match",
        })
    }
});

// app.post('/api/getVehicleData', async (req, res) => {
//     const vehicles = await Vehicle.find({registration_number:{$regex:req.body.value}}).sort({registration_number:1});
//     res.json({
//         status: 200,
//         message: "success",
//         data: vehicles,
//     })
// });


app.post('/api/getInfinityData', async (req, res) => {
    try{
        const infinityData = await Infinity.find({registration_number:{$regex:req.body.value}}).sort({registration_number:1});
            if(!infinityData){
                res.statusCode = 417;
                res.statusMessage= "Failure";
                res.json({
                    status: 417,
                    message: "Failure",
                    data:[],
                })
            }else{
                res.statusCode = 200;
                res.statusMessage= "Success";
                res.json({
                    status: 200,
                    message: "success",
                    data: infinityData,
                })
            }
      
        // console.log(infinityData)
        // res.json({
        //     status: 200,
        //     message: "success",
        //     data: infinityData,
        // })
    }
    catch(error){
        res.statusCode = 500;
        res.statusMessage = "Server Error"
        res.json({
            status: 500,
            message: "Server Error",
            data:[],
        })
    }
});

app.post('/api/getDataViaChasis', async (req, res) => {
    try{
        const infinityData = await Infinity.find({chasis_number:{$regex:req.body.value}}).sort({registration_number:1});
            if(!infinityData){
                res.statusCode = 417;
                res.statusMessage= "Failure";
                res.json({
                    status: 417,
                    message: "Failure",
                    data:[],
                })
            }else{
                res.statusCode = 200;
                res.statusMessage= "Success";
                res.json({
                    status: 200,
                    message: "success",
                    data: infinityData,
                })
            }
      
        // console.log(infinityData)
        // res.json({
        //     status: 200,
        //     message: "success",
        //     data: infinityData,
        // })
    }
    catch(error){
        res.statusCode = 500;
        res.statusMessage = "Server Error"
        res.json({
            status: 500,
            message: "Server Error",
            data:[],
        })
    }
});


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`PE server is running at port ${port}`);
    }
});
