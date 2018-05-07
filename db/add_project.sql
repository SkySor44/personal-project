insert into projects(name, location)
values($1, $2);

select id from projects
where name = $1 and
location = $2;