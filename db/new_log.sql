insert into progress(content, user_id, project_id, time_stamp, image_url)
values($1, $2, $3, $4, $5)
returning *;

select max(id) from progress;