const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const { uploader } = require("./middleware.js");
const aws = require("aws-sdk");
const fs = require("fs");

const cards = [
    {
        url: "https://source.unsplash.com/75S9fpDJVdo/300x510",
        title: "NASA Has Found Hundreds Of Potential New Planets",
        text: "NASA released a list of 219 new “planet candidates discovered by the Kepler space telescope, 10 of which are similar to Earth’s size and may be habitable by other life forms.",
    },
    {
        url: "https://source.unsplash.com/71u2fOofI-U/300x510",
        title: "This Is Your Body And Brain On Coffee",
        text: " Drinking more caffeine during the coronavirus lockdown? Here's how it can affect you over time and advice on making it better for you.",
    },
    {
        url: "https://source.unsplash.com/qXMpNtNp1uE/300x510",
        title: "Why You Should Bring Your Dog To Work",
        text: "On Friday, offices around the country celebrated the 15th annual Take Your Dog to Work Day. Though the event's primary goal is to raise awareness for pet adoption, the unanticipated impact may be a slightly more relaxing work environment for any office choosing to participate.",
    },
];

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
    res.json(cards);
});

app.post("/cards", uploader.single("file"), (req, res) => {
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

        promise
            .then(() => {
                console.log("success");
                // it worked!!!
                res.json({
                    success: true,
                    message: "Thank you!",
                    path: `https://s3.amazonaws.com/spicedling/${filename}`,
                });
            })
            .catch((err) => {
                // uh oh
                console.log(err); 
            });
    } else {
        res.json({
            success: false,
            message: "You didn't pick a file!",
        });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
