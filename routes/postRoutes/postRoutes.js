import express from "express";
import ctrlGetAll from "../../controllers/post/getAll.js";
import ctrlCreate from "../../controllers/post/addPost.js";
import ctrlGetById from "../../controllers/post/getById.js";
import ctrlDelete from "../../controllers/post/getById.js";
import ctrlUpdate from "../../controllers/post/update.js";
import { authinticate } from "../../middleWare/authinticate.js";
const router = express.Router();

router.get("/", ctrlGetAll);
router.post("/", authinticate, ctrlCreate);
router.get("/:id", ctrlGetById);
router.delete("/:id", ctrlDelete);
router.put("/:id", ctrlUpdate);

export default router;
