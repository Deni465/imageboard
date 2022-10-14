require("dotenv").config();
const spicedPg = require("spiced-pg");
const db_url = process.env.DATABASE_URL;
const db = spicedPg(db_url);

// query-functions go in here
module.exports.insertImage = function (url, username, title, description) {
    const sql = `INSERT INTO images (url, username, title, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
    return db
        .query(sql, [url, username, title, description])
        .then((result) => result.rows)
        .catch((error) => console.log("error in inserting image", error));
};

module.exports.getAllImages = function () {
    const sql = `SELECT * FROM images
    ORDER BY id DESC;`;
    return db
        .query(sql)
        .then((result) => result.rows)
        .catch((error) => console.log("error in getting images", error));
};
