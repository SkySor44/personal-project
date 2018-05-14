select message, messages.user_id, project_id, time_stamp, displayname, company, role, supervisor_id, type from messages
join users on users.id = messages.user_id
where messages.project_id = $1 and messages.type = 'client'
order by messages.id asc