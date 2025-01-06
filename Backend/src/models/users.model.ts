import mongoose, { Schema , model  } from "mongoose";

const userSchema = new Schema({

    name : { type : String , required : true },
    username : { type : String , required : true },
    email : { type : String , required : true },
    password : { type : String , required : true },
    image : { type : String},
    birthday : { type : Date , required : true },
    gender : { type : String , required : true },
    status : { type : String , default : 'new' }, 
    friends : [{ type : String }],
    posts : [ { type : mongoose.Schema.Types.ObjectId , ref : 'Posts'} ]
})

const User  = model('User' , userSchema);
export default User;