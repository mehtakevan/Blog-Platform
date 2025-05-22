CREATE DATABASE blog_platform;

USE blog_platform;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id INT,
    tag_id INT,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_user_id ON posts(user_id);
CREATE INDEX idx_tag_name ON tags(name);

SELECT * FROM USERS;

INSERT INTO tags (name) VALUES 
('Technology'),
('Health and Wellness'),
('Finance'),
('Travel and Tourism'),
('Food'),
('Fashion'),
('Sports'),
('Fitness'),
('History'),
('Education'),
('Entertainment'),
('Science'),
('Art and Culture'),
('Politics'),
('Environment');