select phases.id, phase_name, description, done, displayname, show_dropdown, company, role from phases
join users on users.id = phases.assigned_employee_id
where phases.project_id = $1
order by phases.id