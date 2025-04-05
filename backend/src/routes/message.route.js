import express from 'express';

const router = express.Router();

router.get("/users",protectRoute,getUsersForSideBar)

export default router;