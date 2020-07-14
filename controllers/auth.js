var jwt = require('jsonwebtoken');
var connection = require('./../config');

module.exports.authenticate= function(req, res){    
    var email = req.body.email;
    var password = req.body.password;
    var queryString = "SELECT * FROM users WHERE email=? AND password =?";
    connection.query(queryString,[email,password],function(err,results,fields){
        if(err){
            res.json({
                status:false,
                message:'error with query or connection'
            });
        }else{

            console.log(email)
            console.log(password)
            if(results.length > 0){
                var id = results[0].id
                var payload = {id}
                console.log(payload)
                var token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:5000
                });
                res.json({
                    id:results[0].id,
                    username:results[0].username,
                    email:results[0].email,
                    role:results[0].role,
                    status:true,                    
                    token:token
                })
            }else{
                res.json({
                    status:false,
                    message:"Email or password invalid"
                });
            }
        }
    });
}