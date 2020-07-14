var express= require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();

var authController = require('./controllers/auth');

const {autho}  = require("./middlewares")

process.env.SECRET_KEY = "mykey";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/api/authenticate',authController.authenticate);
app.use('/api/admin',router);
app.use(express.static('./public'))
// router.use(function(req,res,next){
//     var token = req.body.token || req.header['token'];
//     console.log(token)
//     if(token){
//         jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
//             if(err){
//                 console.log(process.env.SECRET_KEY)
//                 res.status(500).send('token invalid');
//             }else{
//                 next();
//             }
//         })
//     }else {
//         res.send('please send a token');
//     }
// })

// router.get('/home',function(req,res){
//     res.send('token Verified');
// })

// router.get('/api/admin',[a])

// app.get("/api/admin",[autho.verifyToken], (req,res)=>{
//     res.send("admin content")
// })

// app.prefix('/api/admin',[autho.verifyToken],(home)=>{
//     home.route('/dashboard').get((req,res)=>{
//         res.send("dashboard");
//     })
//     home.route('/setting').get((req,res)=>{
//         res.send("setting");
//     })
// })
app.get("/dashboard",[autho.verifyToken,autho.isAdmin],(req,res)=>{
    console.log(autho)
        res.send("admin content")
    })
router.get("/dashboard",[autho.verifyToken,autho.isAdmin],(req,res)=>{
    console.log(autho)
        res.send("admin content")
    })
app.listen(3000);