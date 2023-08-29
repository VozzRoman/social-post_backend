import express from "express";
import ctrlCreateComment from "../../controllers/comment/add.js";
import ctrlGetAllComments from "../../controllers/comment/getAll.js";
import { authinticate } from "../../middleWare/authinticate.js";
const router = express.Router();

router.post("/:id", authinticate, ctrlCreateComment);
router.get("/post/:id", ctrlGetAllComments);

export default router;
