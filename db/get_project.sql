select name, location, percentdone, phases, complete from project_user
join projects on projects.id = project_user.project_id
join users on users.id = project_user.user_id
where users.id = $1 and projects.id = $2