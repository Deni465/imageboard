DROP TABLE IF EXISTS images;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://source.unsplash.com/75S9fpDJVdo/300x510',
    'funkychicken',
    'NASA Has Found Hundreds Of Potential New Planets',
    'NASA released a list of 219 new “planet candidates discovered by the Kepler space telescope, 10 of which are similar to Earths size and may be habitable by other life forms.'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://source.unsplash.com/71u2fOofI-U/300x510',
    'sourchicken',
    'This Is Your Body And Brain On Coffee',
    'Drinking more caffeine during the coronavirus lockdown? Here iss how it can affect you over time and advice on making it better for you.'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://source.unsplash.com/qXMpNtNp1uE/300x510',
    'sweetchicken',
    'Why You Should Bring Your Dog To Work',
    'On Friday, offices around the country celebrated the 15th annual Take Your Dog to Work Day. Though the events primary goal is to raise awareness for pet adoption, the unanticipated impact may be a slightly more relaxing work environment for any office choosing to participate.'
);
 