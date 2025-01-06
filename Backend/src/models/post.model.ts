import mongoose, { Schema , model  } from "mongoose";

const postSchema = new Schema({

    title : { type : String },
    description : { type : String },
    content : { type : String },
    createdAt : { type : Date , default : Date.now },
    author : { type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
})

const Posts = model('Posts' , postSchema);
export default Posts;