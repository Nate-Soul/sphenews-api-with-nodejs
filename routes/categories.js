import express from "express";
import { 
    getArticleCategories, getCategories 
} from "../controllers/categories.js";

const router = express.Router();

router.get("/", getCategories);

router.get("/in/:slug", getArticleCategories);

export default router;
