DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Goal;
DROP TABLE IF EXISTS GoalHistory;

CREATE TABLE User (
    user_id INTEGER PRIMARY KEY,
    breed TEXT DEFAULT "Tabby"
);

CREATE TABLE Goal (
    goal_id INTEGER PRIMARY KEY,
    user_id INTEGER,    
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    goal_text TEXT,
    category TEXT NOT NULL,   
    FOREIGN KEY (user_id) REFERENCES User (id)
);

CREATE TABLE GoalHistory (
    instance_id INTEGER PRIMARY KEY,
    [date] TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    goal_id INTEGER,
    complete BOOLEAN DEFAULT "0",
    FOREIGN KEY (goal_id) REFERENCES Goal (id)
);