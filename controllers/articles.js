import jwt from "jsonwebtoken";
import { db } from "../server.js";

export const createArticle = async (req, res) => { 
    //check if token
    // const token = req.cookies.access_token;
    // if(!token) return res.status(403).json("You're not authenticated");
    // //verify token
    // jwt.verify(token, process.env.SECRET, (err, authData) => {

        // if(err) return res.status(401).json("Invalid Token!");
        
        //insert new article
        const createArticleQuery = "INSERT INTO `articles` (userId, title, slug, excerpt, content, featured_image, status, visibility) VALUES (?)";
        const values = [
            req.body.userId,
            req.body.title,
            req.body.slug,
            req.body.excerpt,
            req.body.content,
            req.body.featured_image,
            req.body.status,
            req.body.visibility
        ];
        db.query(createArticleQuery, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({msg: "Article Saved", lastInsertedId: data.insertId});
        });

    // });
}

export const modifyArticle = async (req, res) => {
    //check if token
    // const token = req.cookies.access_token;
    // if(!token) return res.status(403).json("You're not authenticated");
    // //verify token
    // jwt.verify(token, process.env.SECRET, (err, authData) => {

        // if(err) return res.status(401).json("Invalid Token!");
        
        //modify article
        const modifyArticleQuery = "UPDATE `articles` SET `title` = ?, `slug` = ?, `excerpt` = ?, `content` = ?, `featured_image` = ?, `status` = ?, `visibility`= ? WHERE `id` = ? AND `userId` = ?";
        const values = [
            req.body.title,
            req.body.slug,
            req.body.excerpt,
            req.body.content,
            req.body.featured_image,
            req.body.status,
            req.body.visibility
        ];

        db.query(modifyArticleQuery, [...values, req.params.id, req.body.userId], (err) => {
            if(err) return res.status(403).json(err);
            return res.status(200).json("Article Modified");
        });

    // });
}

export const deleteArticle = async (req, res) => {
    //check if token
    // const token = req.cookies.access_token;
    // if(!token) return res.status(403).json("You're not authenticated");

    //verify token
    // jwt.verify(token, process.env.SECRET, (err, authData) => {

        if(err) return res.status(401).json("Invalid Token!");
        
        //delete article
        const deleteArticleQuery = "DELETE FROM `articles` WHERE `articles`.`slug` = ? AND `articles`.`userId` = ?";
        db.query(deleteArticleQuery, [req.params.slug, authData.id], (err) => {
            if(err) return res.status(403).json("You are not authorized to delete this post");
            return res.status(200).json("Article Deleted");
        });

    // });
}

export const getArticle = async (req, res) => {

    const articleQuery = "SELECT a.*, u.username As author, u.avatar FROM `articles` AS a JOIN `users` AS u ON a.userId = u.id WHERE a.slug = ? LIMIT 1";

    db.query(articleQuery, [req.params.slug], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data[0]);
    });
}

export const getArticles = async (req, res) => {
        
    const fetchActiveArticlesQuery = "SELECT * FROM `articles` WHERE `articles`.`status` = 'publish' AND `articles`.`visibility` = 'public' ORDER BY `articles`.`createdAt`";

    db.query(fetchActiveArticlesQuery, (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    });
}

export const getSimilarArticles = async (req, res) => {
    const getSimilarArticlesQuery = "SELECT a.id, a.title, a.slug, a.featured_image FROM `articles` AS a WHERE a.slug LIKE ?";
    db.query(getSimilarArticlesQuery, [`%${req.params.slug}%`], (err, data)=>{
        if(err) return res.status(400).json("Failed to get articles");
        res.status(200).json(data);
    })
};



export const getArticlesByCategory = async (req, res) => {
    
    const categorySlug = req.params.category;
    
    //fetch articles by category slug
    const fetchArticlesByCategoryQuery = "SELECT a.*, c.name, c.slug AS categorySlug, c.descripton FROM `articles` AS a JOIN `article_categories` AS ac ON a.id = ac.articleId JOIN `categories` AS c ON c.id = ac.categoryId WHERE a.status = 'publish' AND a.visibility = 'public' AND c.slug = ?";

    db.query(fetchArticlesByCategoryQuery, [categorySlug], (err, data) => {
        if (err) return res.status(401).json("Failed to get Articles");
        res.status(200).json(data);
    });

}

export const getArticlesByAuthor = async (req, res) => {

    const author = req.params.author

    const sql = "SELECT a.* FROM `articles` As a JOIN `users` u ON a.userId = u.id WHERE a.visibility = 'public' AND a.status='publish' AND u.username = ?";

    db.query(sql, [author], (err, data) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(data);
    });
}