import express from "express";

const router = express.Router();
import ctrlGetAllUsers from "../../controllers/users/getAll.js";
import ctrlGetById from "../../controllers/users/getById.js";
import ctrlGetPostsByIdUser from "../../controllers/users/getUserPostById.js";

router.get("/", ctrlGetAllUsers);
// router.get("/:id", ctrlGetById);
router.get("/:id/posts", ctrlGetPostsByIdUser);

export default router;
