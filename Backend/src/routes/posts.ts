import { Router } from "express";
import postsControllers from "../controllers/posts.controllers";

const router = Router();

router.post('/newPost' , postsControllers.createPost);

router.get('/getPost' , postsControllers.getPosts);

    router.delete('/deletePost/:id' , postsControllers.deletePost)


export default router