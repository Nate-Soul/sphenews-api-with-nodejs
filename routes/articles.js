import express from "express";
import { 
   createArticle, modifyArticle, deleteArticle, getArticle, getArticles, getSimilarArticles, getArticlesByCategory, getArticlesByAuthor
} from "../controllers/articles.js";

const router = express.Router();

//get articles
router.get("/", getArticles);

//get similar articles
router.get("/similar/:slug", getSimilarArticles);

//get articles by category
router.get("/in/:category", getArticlesByCategory);

//get articles by author
router.get("/by/:author", getArticlesByAuthor)

//get article
router.get("/:slug", getArticle);

//create article
router.post("/", createArticle);

//update article
router.put("/:id", modifyArticle);

//delete article
router.delete("/:slug", deleteArticle);

export default router;