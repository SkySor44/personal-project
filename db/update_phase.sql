update phases
set phase_name = $1,
due_date = $2,
description = $3
where id = $4;
