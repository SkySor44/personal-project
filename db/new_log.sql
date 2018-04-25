insert into progress(content, user_id, project_id, time_stamp)
values($1, $2, $3, $4)
returning *;

select max(id) from progress;