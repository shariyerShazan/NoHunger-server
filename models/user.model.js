import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String ,
        required : true
    },
    email: {
        type: String ,
        required : true
    },
    password: {
        type: String ,
        required : true
    },
    photoURL : {
        type: String ,
        required : true
    },
    role: {
        type: String ,
        enum : ["donor" , "user"],
        require: true
    }
})

export const User = mongoose.model("User" , UserSchema)