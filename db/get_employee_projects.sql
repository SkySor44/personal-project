select name, location, displayname, company from project_user
join projects on projects.id = project_user.project_id
join users on users.id = project_user.users_id
where project_user.users_id = $1