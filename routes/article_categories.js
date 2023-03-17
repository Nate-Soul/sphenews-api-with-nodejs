import express from "express";
import { 
   createArticleCategories, modifyArticleCategories
} from "../controllers/article_categories.js";

const router = express.Router();

//create article
router.post("/", createArticleCategories);

//update article
router.put("/:id", modifyArticleCategories);

export default router;