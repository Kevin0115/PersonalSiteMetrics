drop table metric;

create table metric(
  session_id integer not null,
  event_type varchar(50) not null,
  ts timestamp not null,
  inlink varchar(50),
  location varchar(50),
  primary key (session_id, event_type, ts)
);

insert into metric values (6969420,'sessionStart','2019-12-01 12:01 PM');
insert into metric values (6969420,'navTo=Test','2019-12-01 12:02 PM');
insert into metric values (6969420,'linkVisit=Test','2019-12-01 12:03 PM');
