module.exports = `
    create table if not exists day_time_room
    (
        id                  mediumint auto_increment primary key not null,
        faculty_schedule_id mediumint                            not null,
        day_id              mediumint                            not null,
        room_id             mediumint                            not null,
        start_time          time                                 not null,
        end_time            time                                 not null,
        foreign key (faculty_schedule_id) references faculty_schedule (id),
        foreign key (day_id) references day (id),
        foreign key (room_id) references room (id),
        created_at          timestamp default now(),
        is_deleted          boolean   default false,
        deleted_at          timestamp
    );
`;
