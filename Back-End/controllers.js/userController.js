const bcrypt = require('bcrypt')
const {User} = require('../models/model')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email) => {
    return jwt.sign(
        {id, email}, 
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
        )
}

class UserController {
    async registration(req,res, next){
        
        const {email, password} = req.body
        if(!email || !password) {
           return next(console.log('Missing Field'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(console.log('User with this email already exists'))
        }
        
        
        const hashPassword = await bcrypt.hash(password, 2)
        const user = await User.create({email, password: hashPassword})
        const token = generateJWT(user.id, user.email)
            return res.json({token})
    }
    async login(req,res){
        const {email, password} = req.body
        
        const user = await User.findOne({where: {email}})
        if (!user) {
            console.log("User is not found")
        }
        
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            console.log("Wrong password")
        }
        const token = generateJWT(user.id, user.email)
        return res.json({token})
    }
    async check(req,res){
        const token = generateJWT(req.user.id, req.user.email)
        return res.json({token})
    
    }

}

module.exports = new UserController()