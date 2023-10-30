const Signup = require('../modal/signup')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const { tokenkey } = require('../utils/utils')

const signUp =async (req,res) => {
    console.log(req.body)
    const{name,email,password}=req.body;
    try{
        const signupDulpicate = await Signup.findOne({name});
        if(signupDulpicate){
            return res.status(401).json({error:"already existed"});
        }
        else{

            const hashedPassword = await bcrypt.hash(password, 10);

            const newSignup = new Signup({
                name,email,password:hashedPassword
            });
            await newSignup.save();
            console.log(newSignup)
            return res.status(201).json({newSignup,message:"Successfully created"})
        }
    }catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

const login = async (req,res)=>{
    console.log(req.body)
    const{loginemail,loginpassword}=req.body;
    console.log("Received email:", loginemail);
    console.log("Received password:", loginpassword);
    try{
        const user = await Signup.findOne({ email:loginemail });
        console.log("User from database:", user);
        if(!user) {
            return res.status(401).json({error:"Invalid email"})
        }

        const passwordMatch = await bcrypt.compare(loginpassword,user.password).catch((err)=>{console.error('bcrypt compare error',err);});
        
        console.log("Password match:", passwordMatch);
        if(!passwordMatch){
            return res.status(401).json({error:'Incorrect Password'})
        }

        const token = jwt.sign(
            {id : user._id,email:user.email},
            tokenkey,
            {expiresIn:'1h'}

        );

        res.status(200).json({token ,message : 'login succesfull'});

    }catch(error){
        console.error("Authentication error:", error);
        return res.status(500).json({error : 'internal server error'})
    }


}

module.exports={
    signUp,
    login,
}
