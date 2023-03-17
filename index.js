import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import "./server.js";
import cookieParser from "cookie-parser";
import articleRoutes from "./routes/articles.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import articleCategoryRoutes from "./routes/article_categories.js";

dotenv.config();

const app  = express();
const port = process.env.PORT || 5500;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

app.post("/api/upload/article/featured", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file ? file.filename: "");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/article-categories", articleCategoryRoutes);

app.get("/api/test", (req, res) => {
    res.send(`Sphenews API is up and running on ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});