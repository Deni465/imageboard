const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const { uploader } = require("./middleware.js");

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
        url: "https://i.pinimg.com/564x/bf/59/f3/bf59f3370c32965d6cf0b829c3b3ec06.jpg",
        title: "Why You Should Bring Your Dog To Work",
        text: "On Friday, offices around the country celebrated the 15th annual Take Your Dog to Work Day. Though the event's primary goal is to raise awareness for pet adoption, the unanticipated impact may be a slightly more relaxing work environment for any office choosing to participate.",
    },
    {
        url: "https://i.pinimg.com/564x/e3/4b/c2/e34bc2083adb6dfff539164e01ddad7f.jpg",
        title: "NASA Has Found Hundreds Of Potential New Planets",
        text: "NASA released a list of 219 new “planet candidates discovered by the Kepler space telescope, 10 of which are similar to Earth’s size and may be habitable by other life forms.",
    },
    {
        url: "https://i.pinimg.com/564x/8c/1e/89/8c1e89c4e9f86dbeda851f6349302b96.jpg",
        title: "This Is Your Body And Brain On Coffee",
        text: " Drinking more caffeine during the coronavirus lockdown? Here's how it can affect you over time and advice on making it better for you.",
    },
    {
        url: "https://i.pinimg.com/564x/ba/bf/3d/babf3d2945911e99ce9df163d12f66f0.jpg",
        title: "Winter Season Is Coming",
        text: "Everyone feels some magic in the air, because of frosts, crystal nights, snow and just this amazing atmosphere.",
    },
];

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.get("/cards", (req, res) => {
    res.json(cards);
});

app.post("/cards", uploader.single("file"), (req, res) => {
    if (req.file) {
        res.json({
            success: true,
            message: "Thank you!",
            path: `/uploads/${req.file.filename}`,
        });
    } else {
        res.json({
            success: false,
            message: "Upload failed!",
        });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
