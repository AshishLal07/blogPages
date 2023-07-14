const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

const app = express();


app.use(express.json());
app.use(cors({origin:true,credentials:true}));
app.use(cookieParser());

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname + '-' + Date.now())
    }
  })

const uploads = multer({storage});

app.post('/upload', uploads.single('file'), (req,res)=>{
    const file = req.file
    
    res.status(200).json(file.filename)
})




app.use('/', require('./routes'));


app.listen(3001, (err)=>{
    if(err) throw err;
    console.log('Server is running on Port:3001')
})
