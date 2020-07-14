const jwt = require("jsonwebtoken");
const connection = require('./../config');
const queryString = "SELECT role FROM users WHERE id=?";
    verifyToken = (req,res,next)=>{
        var token = req.body.token || req.header['token'];
        if(!token){
            console.log("gagal token")
            return res.status(403).send({
                message:'Unauthorized!'
            })
        }
        jwt.verify(token,process.env.SECRET_KEY, (err,decoded)=>{
            if(err){
                console.log("gagal token")
                return res.status(401).send({
                    message:'Unauthorized!'
                });
            }
            console.log("berhasil token")
            req.userId = decoded.id;      
            next();  
        });        
    };

    isAdmin = (req,res,next)=>{  
                     
        connection.query(queryString,[req.userId], (err,results,fileds)=>{
            console.log("gagal query")
            console.log(results[0].role);
            if(err){
                console.log("gagal database")
                return res.status(500).send({
                    message:'Error chekc database'
                });
            }            
                if(results[0].role == 'admin'){
                    console.log("admin berhasil")
                    next(this.isUser);
                    return
                }else{
                    console.log("admin gagal")
                    res.status(403).send({
                        message:"hany admin"
                    });
                }            
        });
    };

    isUser = (req,res,next)=>{
        connection.query(queryString,[req.userId], (err,results,fileds)=>{
            if(err){
                console.log("error user")
                return res.status(500).send({
                    message:'Error chekc database'
                });
            }
            
                console.log("berhasil user")
                if(results[0].role == 'user'){
                    next();
                    return
                }else{
                    console.log("gagal user")
                    res.status(403).send({
                        message:"hanya user"
                    });
                }            
        });
    };

    const autho = {
        verifyToken:verifyToken,
        isAdmin:isAdmin,
        isUser:isUser
    }

    module.exports = autho