import { db } from "../server.js";


export const getCategories = async (req, res) => {
    //fetch categories query
    const fetchCategoriesQuery = "SELECT * FROM `categories` WHERE `categories`.`isActive` = true";
    db.query(fetchCategoriesQuery, (err, data) => {
        if (err) return res.status(401).json("Failed to get categories");
        res.status(200).json(data);
    });
}

export const getArticleCategories = async (req, res) => {
    const articleSlug = req.params.slug;
    //fetch categories by article slug query
    const fetchArticleCategoriesQuery = "SELECT c.id, c.name, c.slug FROM `categories` AS c JOIN `article_categories` AS ac ON c.id = ac.categoryId JOIN `articles` AS a ON a.id = ac.articleId WHERE a.status = 'publish' AND a.visibility = 'public' AND a.slug = ?  ORDER BY c.id";
    db.query(fetchArticleCategoriesQuery, [articleSlug], (err, data) => {
        if(err) return res.status(400).json("Failed to get articles");
        res.status(200).json(data);
    });
}
