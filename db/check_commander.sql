SELECT comm_id, title, password
FROM commanders
WHERE title = $1;