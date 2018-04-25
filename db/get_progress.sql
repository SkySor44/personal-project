select progress.project_id, content, displayname, progress.id, time_stamp from project_progress 
right join progress on progress.id = project_progress.progress_id
join users on users.id = progress.user_id 
where progress.project_id = $1
order by progress.id desc