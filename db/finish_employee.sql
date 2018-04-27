update users
set company = $1,
role = $2,
supervisor_id = $3
where id = $4
returning *;