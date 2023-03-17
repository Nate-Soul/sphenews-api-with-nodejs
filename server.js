import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myblog"
});

db.connect((err) => {
    if(err) throw err;
    console.log("Database Connected!");
});