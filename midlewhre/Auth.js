const jwt =require('jsonwebtoken')
const Emodal=require('../modal/Logsin')

exports.tokensecure=async(req,res,next)=>{
    try {
        const token =req.headers.authorization
        if(!token) throw new Error('Attach Token')
            const tokenverify =jwt.verify(token,'surat')
        const userverify=await Emodal.findById(tokenverify.id)
        if(!userverify) throw new Error('user not Found')

req.user={
    userId:userverify._id
}

            next()

    } catch (error) {
        res.status(404).json({
            status:'fail',
            Message:error.Message
        })
    }
}