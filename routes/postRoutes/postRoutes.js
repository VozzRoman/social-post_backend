import express from "express";
import ctrlGetAll from "../../controllers/post/getAll.js";
import ctrlCreate from "../../controllers/post/addPost.js";
import ctrlGetById from "../../controllers/post/getById.js";
import ctrlDelete from "../../controllers/post/remove.js";
import ctrlUpdate from "../../controllers/post/update.js";
import ctrlGetUserPost from "../../controllers/post/getUserPosts.js";
import ctrlUpdatePostLikes from "../../controllers/post/updatePostLikes.js";
import ctrlUpdateDislIkes from "../../controllers/post/updatePosDislike.js";
import { authinticate } from "../../middleWare/authinticate.js";
const router = express.Router();

router.get("/", authinticate, ctrlGetAll);
router.post("/", authinticate, ctrlCreate);
router.get("/:id", ctrlGetById);
router.delete("/:id", authinticate, ctrlDelete);
router.put("/:id", authinticate, ctrlUpdate);

router.get("/user/my", authinticate, ctrlGetUserPost);
router.patch("/:id/like", authinticate, ctrlUpdatePostLikes);
router.patch("/:id/dislike", authinticate, ctrlUpdateDislIkes);
export default router;
