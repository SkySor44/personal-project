update users
set company = $1,
role = $2
where id = $3
returning *;