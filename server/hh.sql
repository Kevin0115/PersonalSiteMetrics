drop table metric;

create table metric(
  session_id integer not null,
  event_type varchar(20) not null,
  ts timestamp not null,
  primary key (session_id, event_type, ts)
);

insert into metric values (1111111,'sessionStart','2019-12-01 12:01 PM');
insert into metric values (1111111,'navTo=Skills','2019-12-01 12:01 PM');
insert into metric values (1111111,'linkVisit=Smartender','2019-12-01 12:03 PM');
insert into metric values (1111112,'sessionStart','2019-12-01 12:02 PM');
insert into metric values (1111112,'linkVisit=GitHub','2019-12-01 12:03 PM');
insert into metric values (1111113,'sessionStart','2019-12-01 12:04 PM');
insert into metric values (1111114,'sessionStart','2019-12-01 12:05 PM');
insert into metric values (1111115,'sessionStart','2019-12-01 12:06 PM');
insert into metric values (1111116,'sessionStart','2019-12-01 12:07s PM');
