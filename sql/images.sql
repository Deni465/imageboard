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
    'https://wallpapercave.com/wp/wp6944170.jpg',
    'funkychicken',
    'Orange Landscape',
    'This is the first of many pictures.'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://i.pinimg.com/564x/89/d7/f3/89d7f3978eef1bb5cf0171c30d0d3c3f.jpg',
    'sourchicken',
    'Sweeeeeeets 😍',
    'Since its october sweets have to be orange as well!'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://i.pinimg.com/564x/aa/9c/10/aa9c10588452102d134bcf4841972386.jpg',
    'sweetchicken',
    'Orange Oranges are Orange in Autumn',
    'Just a little rime for the sweet and sometimes sour sensation.'
);
 