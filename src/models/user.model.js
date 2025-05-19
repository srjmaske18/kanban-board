import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
    avatar : {
        type : {
            url : String,
            localpath: String
        },
        default : {
            url : `https://placehold.com/600x400`,
            localpath: ""
        }
    },
    username:{
        type :String,
        required : true,
        unique : true,
        lowercase: true,
        trim : true,
    },
    email:{
        type :String,
        required : true,
        unique : true,
        lowercase: true,
        trim : true,
    },
    fullname:{
        type :String,
        required : true,
    },
    password:{
        type :String,
        required : [true," password is required"],
    },
    isEmailVerified :{
        type :Boolean,
        default: false
    },
     forgotPasswordToken :{
        type :String,
    },
     forgotpasswordExpire :{
        type : Date
    },
    refreshToken :{
        type : String
    },
    emailVerificationToken :{
        type : String
    },
    emailVerifivationExpire :{
        type : String
    }
}, { timestamps : true})

userSchema.pre("save", async function(next){
    if(!this.ismModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})




userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password ,  this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username : this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateTemporaryToken = function(){
    const unHashedToke = crypto.randomBytes(20).toString("hex")
    const hashedToken =  crypto.createHash("sha256").update(unHashedToke).digest("hex")
    const tokenExpiry = Date.now() + (20*60*1000) // 20 min

    return {hashedToken, unHashedToke, tokenExpiry}
}

export const User = mongoose.model("User", userSchema)