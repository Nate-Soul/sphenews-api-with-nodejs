import { db } from "../server.js";


export const createArticleCategories = async (req, res) => {
    const sql = "INSERT INTO `article_categories` (`articleId`, `categoryId`) VALUES (?)";
    const values = [req.body.articleId, req.body.categoryId];
    db.query(sql, [values], err => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("success");
    });
}

export const modifyArticleCategories = async (req, res) => {
    const sql = "UPDATE `article_categories` SET `categoryId` = ? WHERE `articleId` = ?";
    const values = [req.body.categoryId, req.params.id];
    db.query(sql, [values], err => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("success");
    });
}
