import express , { Router } from 'express';
import user from './user'
import statusResponse from '../utils/status-response';

const router  = Router();
router.use(user)

router.get('' , (req , res) => {
    res.send('Api is working')
})





export default router;