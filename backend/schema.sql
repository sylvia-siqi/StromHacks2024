DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Goal;
DROP TABLE IF EXISTS GoalHistory;

CREATE TABLE User (
    user_id TEXT PRIMARY KEY,
    cat_name TEXT DEFAULT "Kitty",
    cat_breed TEXT DEFAULT "Tabby"
);

CREATE TABLE Goal (
    goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,    
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    goal_text TEXT,
    category TEXT NOT NULL,   
    FOREIGN KEY (user_id) REFERENCES User (id)
);

CREATE TABLE GoalHistory (
    instance_id INTEGER PRIMARY KEY AUTOINCREMENT,
    [date] TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    goal_id INTEGER,
    complete BOOLEAN NOT NULL,
    FOREIGN KEY (goal_id) REFERENCES Goal (id)
);