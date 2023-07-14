const db = require('../db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.Registeration = async (req,res) => {
    const {userName,email, password} = req.body;
    console.log(req.body);
    
    const q = `SELECT * From users WHERE email = ? OR userName = ?  `

     db.query(q, [email,userName], async (err,data) => {
        
        if(err){
            return res.json({msg:err});
        }
        
        if(data.length){
            return res.status(409).json({msg:'Already a user, Login'});
        }else{
            const saltRound = await bcrypt.genSalt();
            const hashpassword = await bcrypt.hash(password,saltRound);
       
           const query = `INSERT INTO users(userName, email, password ) VALUES(?,?,?)`
       
           db.query(query,[userName,email,hashpassword],(err,data)=> {
               if(err) res.json(err)
               console.log(data);
               return res.status(200).json({data,msg:'Created Succesfully'})
           });
        }

     });

   

}

module.exports.Login =  (req,res) => {
    const{email, password} = req.body;

    const q = `SELECT * From users WHERE email = ?  `

    db.query(q, [email], async (err,data)=>{
        if(err){
            return res.json(err);
        }
        if(data.length ){
            const userExist = await bcrypt.compare(password,data[0].password);      
            if(userExist){
                const token = jwt.sign({id:data[0].id }, "JwtSecretKey");
                const {password,...other} = data[0]
                return res.cookie('access_token',token).status(200).json({data:other,msg:'Login Successful'})
                
            }
        }
        return res.status(404).json({msg:'Invalid UserName/Password'});
        
        
      
    })


}
module.exports.Logout = async (req,res) => {
    
   return res.clearCookie('access_token').status(200).json("User has been loged out.")

}