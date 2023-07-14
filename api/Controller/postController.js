const db = require("../db");
const jwt = require('jsonwebtoken');

module.exports.getPosts = async (req,res)=> {
    
    const q = req.query.cat ? `SELECT * FROM posts WHERE cat = ? `:`SELECT * FROM posts `;
    
    db.query(q,[req.query.cat], (err,data)=> {
        if(err)  return res.status(500).send(err);
        // console.log(q,data);
        return res.status(200).json(data);
    })
}
module.exports.getPost = async (req,res)=> {
    
    const q = "SELECT p.id, userName, title, description, postImg,userImg, cat, createdAt FROM users u JOIN posts p ON  u.id = p.userId  WHERE p.id = ?";
    
    db.query(q,[req.params.id], (err, data)=>{
        if(err) return res.status(500).json(err);

        return res.status(200).json(data[0])
    })
}
module.exports.addPost = async (req,res)=> {
    const token = req.cookies.access_token
    if(!token) return res.status(500).json('Not Authenticated!');


    jwt.verify(token, 'JwtSecretKey', (err,user)=>{
        if(err) return res.status(403).json("Invalid Token");

        // const postId =  req.params.id;
        const q = "INSERT INTO posts (title, description, postImg, createdAt, cat, userId) VALUES (?,?,?,?,?,?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.date,
            req.body.cat,
            user.id ] ;
            
            db.query(q,[...values],(err,data)=>{
            if(err) return res.status(403).json(err);
            return res.status(200).json('Post Added Successfully');
        })

     });
}
module.exports.deletePost = async (req,res)=> {
    const token = req.cookies.access_token

    
    if(!token) return res.status(500).json('Not Authenticated!');

     jwt.verify(token, 'JwtSecretKey', (err,user)=>{
        if(err) return res.status(403).json("Invalid Token");

        const postId =  req.params.id;
        const q = "DELETE FROM posts where id = ? and userId = ?";

        db.query(q,[postId,user.id],(err,data)=>{
            if(err)return res.status(403).json("Invalid User");

            return res.status(200).json('Deleted Successfully');
        });

     });


}
module.exports.updatePost = async (req,res)=> {
    const token = req.cookies.access_token
    if(!token) return res.status(500).json('Not Authenticated!');


    jwt.verify(token, 'JwtSecretKey', (err,user)=>{
        if(err) return res.status(403).json("Invalid Token");

        const postId =  req.params.id;
        const q = "UPDATE posts SET title = ?, description = ?, postImg = ?, createdAt = ?, cat = ? WHERE id = ? AND userId = ?";

        const values = [
            req.body.title, 
            req.body.desc,
            req.body.img,
            req.body.date,
            req.body.cat,
            postId,
            user.id];

        db.query(q,[...values],(err,data)=>{
            if(err) return res.status(403).json(err);
            return res.status(200).json('Post Updated Successfully');
        })

     });
}