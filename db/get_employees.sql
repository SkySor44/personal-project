select displayname, company, role, id from users
where supervisor_id = $1