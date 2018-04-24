select project_user.project_id, name, location from project_user
join projects on projects.id = project_user.project_id
join users on users.id = project_user.user_id
where users.id = $1