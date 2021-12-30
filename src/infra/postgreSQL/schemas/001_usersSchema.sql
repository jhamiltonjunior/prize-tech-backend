DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  admin BOOLEAN DEFAULT FALSE,
  moderator BOOLEAN DEFAULT FALSE,
  simple_user BOOLEAN DEFAULT TRUE,
  username VARCHAR(30) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, name, email, password)
VALUES ('jhsj', 'Hamilton', 'hamilton@gmail.com', '12345');

INSERT INTO users (username, name, email, password)
VALUES ('jose', 'José', 'jose@gmail.com', '123456');