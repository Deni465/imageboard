const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;

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
        url: "https://source.unsplash.com/qXMpNtNp1uE/300x510",
        title: "Why You Should Bring Your Dog To Work",
        text: "On Friday, offices around the country celebrated the 15th annual Take Your Dog to Work Day. Though the event's primary goal is to raise awareness for pet adoption, the unanticipated impact may be a slightly more relaxing work environment for any office choosing to participate.",
    },
];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/cards", (req, res) => {
    res.json(cards);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
