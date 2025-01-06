import express , { Router } from 'express';
import user from './user'
import posts from './posts'
import statusResponse from '../utils/status-response';

const router  = Router();

router.use(user)

router.use('/post' , posts )


router.get('' , (req , res) => {
    res.send('Api is working')
})





export default router;