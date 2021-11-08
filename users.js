const express = require("express")
const router = express.Router()
const userModel = require("./model.js")


router.get('/',async (req,res)=>{
    try{
        let users =  await userModel.find()
        res.json(users)
    }catch(e){
        res.status(500).json({message : e.message})
    }
})

router.get('/:id',getUser,(req,res)=>{
    res.send(res.user)
})

router.post('/',async (req,res)=>{
    let user = new userModel({
        name :req.body.name,
        userName :req.body.userName,
        password :req.body.password
    })
    try{
        let newUser = await user.save()
        res.status(201).json(newUser)
    }catch(e){
        res.status(400).json({message : e.message})
    }

})

router.patch('/:id',getUser,async (req,res)=>{
    if(req.body.name!=null){
        res.user.name = req.body.name
    }
    if(req.body.userName!=null){
        res.user.userName = req.body.userName
    }
    if(req.body.password!=null){
        res.status(400).json({message : "cannot change password"})
    }

    try{
        let updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(e){
        res.status(400).json({message : e.message})
    }
    
})

router.delete('/:id',getUser,async (req,res)=>{
    try{
        await res.user.remove()
        res.json({message : "user deleted"})
    }catch(e){
        res.status(500).json({message : e.message})
    }
})

async function getUser(req,res,next){
    let user
    try{
        user = await userModel.findById(req.params.id)
        if(user==null){
            return res.status(404).json({message : "user not found"})
        }
    }catch(e){
        return res.status(505).json({message : e.message})
    }
    res.user = user
    next()
}

module.exports = router