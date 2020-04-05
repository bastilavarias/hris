module.exports = `
    create table if not exists personnel_schedule
    (
        id          mediumint auto_increment primary key not null,
        employee_id mediumint                            not null,
        curr_date   date                                 not null,
        start_time  time                                 not null,
        end_time    time                                 not null,
        foreign key (employee_id) references employee (id),
        created_at  timestamp default now(),
        is_deleted  boolean   default false,
        deleted_at  timestamp
    );
`;