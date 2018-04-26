select phases.id, phase_name, description, done, displayname, show_dropdown, company, to_char(due_date, 'mm/dd/yyyy') as due_date, role from phases
join users on users.id = phases.assigned_employee_id
where phases.project_id = 1
order by phases.due_date;