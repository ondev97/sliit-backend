const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config({path: __dirname + '/.env'});

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res)=>{
    console.log(req.headers);

    const { username, password } = req.body;

    if( !username || typeof username !== 'string'){
        return res.status(400).json({
            "message": "Invalid username"
        })
    }

    if( !password || typeof password !== 'string'){
        return res.status(400).json({
            "message": "Invalid password"
        })
    }

    const user = await User.findOne({username}).lean();
    if(!user){
        return res.status(400).json({
            message : "Invalid username",
        })
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET)
        res.status(200).json({
            message : "User logged in successfully",
            user: user,
            token: token
        })
    }else{
        res.status(400).json({
            message : "Invalid password",
        })
    }
}

exports.register = async (req, res) => {
    console.log(req);
    const {username, password: plainTextPassword, name, mobile, email, is_admin } = req.body;

    if( !username || typeof username !== 'string'){
        return res.status(400).json({
            "message": "Invalid username"
        })
    }

    if( !plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.status(400).json({
            "message": "Invalid password"
        })
    }

    if( !name || typeof name !== 'string'){
        return res.status(400).json({
            "message": "Invalid full name"
        })
    }

    if( !mobile || typeof mobile !== 'string'){
        return res.status(400).json({
            "message": "Invalid mobile number"
        })
    }

    if( !email || typeof email !== 'string'){
        return res.status(400).json({
            "message": "Invalid email"
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 2);

    User.create({
        username: username,
        password: password,
        email: email,
        mobile: mobile,
        name: name,
        is_admin: is_admin
    }).then((user)=>{
        res.status(200).json({
            message : "User created successfully",
            user: user
        })
        console.log(user);
    }).catch((err)=>{
        if(err.code === 11000){
            res.status(400).json({
                message: "Username is already exist"
            })
        }else {
            res.status(400).json({
                message: "Something is wrong"
            })
        }
    });
}