delete from project_user
where project_id = $1 and
users_id = $2;

update phases
set assigned_employee_id = 17
where project_id = $1 and
assigned_employee_id = $2;
