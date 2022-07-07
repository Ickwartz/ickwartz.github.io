/* 
* Create and initialise db content
*/

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    member_since DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_accounts (
    user_id INT NOT NULL PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (email) REFERENCES users (email) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS exercises (
    exercise_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS personalized_exercises (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    exercise_id NOT NULL,
    user_id INT NOT NULL,
    reps int,
    sets int,
    training_id int NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises (exercise_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS training (
    training_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    user_id INTEGER NOT NULL
);