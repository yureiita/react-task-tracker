-- D1 Database Schema for task-tracker
-- This matches the remote production database schema

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  text TEXT NOT NULL,
  day TEXT NOT NULL,
  reminder INTEGER NOT NULL DEFAULT 0 CHECK (reminder IN (0, 1))
);

-- Optional: Seed with sample data
-- INSERT INTO tasks (text, day, reminder) VALUES
--   ('Doctors Appointment', 'Feb 5th at 2:30pm', 1),
--   ('Meeting at School', 'Feb 6th at 1:30pm', 1),
--   ('Food Shopping', 'Feb 5th at 2:30pm', 0);
