import { Request , response, Response } from "express";
import statusResponse from "../utils/status-response";
import Posts from "../models/post.model";
import User from "../models/users.model";

class PostController{


    //Crear post
    createPost( req : Request , res : Response ) : void {

        const { email , title , description , content } = req.body //Obtencion de datos

        User.findOne({ email }).then( user  => { //Busca el usuario
            if(!user){
                res.status(statusResponse.NOT_FOUND).send('User not found')
            }

            const newPost = {
                title ,
                description ,
                content , 
                author : user._id,
                createdAt : Date.now()
            }
            
            return Posts.create(newPost)// Crea el post
            .then( post  => {
                user.posts.push(post._id)
                return user.save()
            }); 
        }).then( () => {
            res.status(statusResponse.SUCCESS).send('Post was created')
        }).catch( e  => {
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong')
        })
    }



    getPosts( req : Request , res : Response) : void {
        const email = req.body.email

        User.findOne({email : email}).populate('posts').then( user  => {
            res.status(statusResponse.SUCCESS).send(user.posts)
        }).catch( e  => {
            console.error('Error while fetching posts:', e);
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong');
        })
    }


    deletePost( req : Request , res : Response ) : void {
        const  { id } = req.params
        const {email} = req.body
        
        console.log(`id: ${id} email: ${email}`)

        User.findOne( { email  }).then( user  => {

            if(!user){
                res.status(statusResponse.NOT_FOUND).send('User not found')
            }

            console.log('Encontre el user: ' , user.posts)
            
            return Posts.findByIdAndDelete(id).then(() => {
                user.posts = user.posts.filter(postId  => postId.toString() !== id );
                return user.save()
            })

        })
        .then( ()  => {
            res.status(statusResponse.SUCCESS).send('Post  deleted successfully')
        })
        .catch( e  => {
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong')
        })
    }
}

export default new PostController()