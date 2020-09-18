INSERT INTO commanders
(title, password)
VALUES
(${title}, ${hash})
RETURNING comm_id, title;