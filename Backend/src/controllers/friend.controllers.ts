import { Request, Response } from "express";
import User from "../models/users.model";
import statusResponse from "../utils/status-response";


class FriendControllers {

    addFriend(req: Request, res: Response): void {

        const { userEmail, friendEmail } = req.body;
        
        User.findOne({ email : userEmail}).then(user => {
            //Si existe el usuario
            if (user) {
                User.findOne({email : friendEmail}).then(friend => {
                    if (friend) {
                        if (!user.friends.includes(friendEmail)) {
                            user.friends.push(friendEmail)
                            user.save().then(() => {
                                res.status(statusResponse.SUCCESS).send('Friend added Successfully')
                            }).catch(e => {
                                res.status(statusResponse.BAD_REQUEST).send('Error adding friend')
                            })
                        } else {
                            res.status(statusResponse.BAD_REQUEST).send('This user is already your friend')
                        }
                    }
                })

            } else {
                res.status(statusResponse.NOT_FOUND).send('User not found')
            }
        }).catch(e => {
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong')
        })

    }


    getFriends( req : Request , res : Response) : void {
        const { email } = req.body;
        console.log(email)
        User.findOne({email : email}).then( user => {

            if(user.friends.length > 0){

                const friendList = [];

                for(let i = 0 ; i < user.friends.length; i++ ){
                    User.findOne({ email : user.friends[i]}).then( friend => {

                        if(friend){ // Si existe el amigo
                            friendList.push({name : friend.name , username : friend.username}); //Agregamos nombre y username
                            console.log(friendList[i])
                        }

                        if(i === user.friends.length - 1){ // Si se completa el rango de la lista de amigos
                            res.status(statusResponse.SUCCESS).send(friendList) // mandamos la lista
                        }
                    }).catch( e => {
                        res.status(statusResponse.BAD_REQUEST).send('Error searching friends')
                    })
                }
            }else{
                res.status(statusResponse.NOT_FOUND).send('Friends not found')
            }
        }).catch( e => {
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong')
        })
    }

    deleteFriend( req : Request , res : Response) : void {
        const { userEmail , friendEmail} = req.body;

        User.findOne({ email : userEmail}).then( user => {

            if(user){
                    
                    const index = user.friends.indexOf(friendEmail); // Obtiene el indice del amigo a eliminar 

                    if(index !== -1){
                        user.friends.splice(index, 1) // Elimina el amigo 
                        user.save().then( () => {
                            res.status(statusResponse.SUCCESS).send('Friend removed successfully')
                        }).catch( e => {
                            res.status(statusResponse.BAD_REQUEST).send('Error removing friend')
                        })
                    }else{
                        res.status(statusResponse.NOT_FOUND).send('Friend not found in your list')
                    }
            }else{
                res.status(statusResponse.NOT_FOUND).send('User not found')
            }
        }).catch( e => {
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong')
        })

    }
}

export default new FriendControllers();