insert into users(user_id, displayname)
values ($1, $2)
returning *;