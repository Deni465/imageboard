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
    ORDER BY id DESC
    LIMIT 6;`;
    return db
        .query(sql)
        .then((result) => result.rows)
        .catch((error) => console.log("error in getting images", error));
};

module.exports.getImageById = function (id) {
    const sql = `SELECT * FROM images WHERE id = $1;`;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((error) => console.log("error in getting image by id", error));
};

module.exports.getAllComments = function (id) {
    const sql = `SELECT * FROM comments WHERE image_id = $1 ORDER BY id DESC;`;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("error in getting all comments: ", error)
        );
};

module.exports.insertComment = function (comment, username, image_id) {
    const sql = `INSERT INTO comments (comment, username, image_id) 
    VALUES ($1, $2, $3)
    RETURNING *;`;
    return db
        .query(sql, [comment, username, image_id])
        .then((result) => result.rows)
        .catch((error) => console.log("error in inserting comment: ", error));
};

module.exports.getMoreImages = function (id) {
    const sql = `SELECT *, (SELECT id FROM images ORDER BY id LIMIT 1) AS "lowestId" FROM images WHERE id < $1 ORDER BY id DESC LIMIT 6;`;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((error) => console.log("error in loading more images: ", error));
};
