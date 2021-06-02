use bookmark;

drop procedure if exists touch_procedure;
DELIMITER $$
create procedure touch_procedure(IN userId INT)
begin
	declare cnt INT;
    select visit into cnt from bookmark.urls where id=userId;
    if(cnt<100000000) then
		set cnt = cnt+1;
    end if;
	update bookmark.urls set visit=cnt+1 , visitedAt=now() where id=userId;
end $$
DELIMITER ;