import mongoose, { Schema , model  } from "mongoose";

const postSchema = new Schema({

    title : { type : String },
    description : { type : String },
    content : { type : String },
    createdAt : { type : Date },
    author : { type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
})

const Posts = model('Post' , postSchema);
export default Posts;