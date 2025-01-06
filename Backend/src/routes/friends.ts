import { Router } from "express";
import friendControllers from "../controllers/friend.controllers";

const router = Router();

router.post('/addFriend' , friendControllers.addFriend );
router.get('', friendControllers.getFriends)
router.delete('/deleteFriend' , friendControllers.deleteFriend);

export default router;