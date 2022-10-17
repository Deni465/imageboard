const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const { uploader } = require("./middleware.js");
const aws = require("aws-sdk");
const fs = require("fs");
const db = require("./db");
const { log } = require("console");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.get("/cards", (req, res) => {
    db.getAllImages().then((cards) => {
        res.json(cards);
    });
});

app.get("/more-cards/:lowestId", (req, res) => {
    const { lowestId } = req.params;
    console.log("req.params.lowestId", lowestId);
    db.getMoreImages(lowestId).then((cards) => {
        console.log(cards);
        res.json(cards);
    });
});

app.post("/cards", uploader.single("file"), (req, res) => {
    console.log("title:", req.body.title);
    console.log("description:", req.body.description);
    console.log("username:", req.body.username);
    // console.log("url:", req.body.file);

    if (req.file) {
        const { filename, mimetype, size, path } = req.file;
        const promise = s3
            .putObject({
                Bucket: "spicedling",
                ACL: "public-read",
                Key: filename,
                Body: fs.createReadStream(path),
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise();

        let url = `https://s3.amazonaws.com/spicedling/${filename}`;
        promise
            .then(() => {
                console.log("success");
                // console.log("req.file", req.file);
                return db.insertImage(
                    url,
                    req.body.username,
                    req.body.title,
                    req.body.description
                );
            })
            .then((data) => {
                console.log("we send to the client data", data);

                res.json({
                    success: true,
                    message: "Thank you!",
                    id: data[0].id,
                    created_at: data[0].created_at,
                    url,
                    title: req.body.title,
                    description: req.body.description,
                    username: req.body.username,
                });
                // console.log("url", url);
                fs.unlinkSync(path, () => {});
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({
            success: false,
            message: "You didn't pick a file!",
        });
    }
});

app.get("/cards/:id", (req, res) => {
    const id = req.params.id;
    // console.log("req.params.id", req.params.id);

    db.getImageById(id)
        .then((data) => {
            console.log("data", data);
            res.json(data);
        })
        .catch((err) => {
            console.log("err", err);
            res.status(400);
        });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
