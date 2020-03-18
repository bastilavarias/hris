module.exports = `
    create table if not exists employee
    (
        id              mediumint auto_increment primary key not null,
        department_id  mediumint                            not null,
        designation_id  mediumint                            not null,
        profile_id      mediumint                            not null,
        employee_number varchar(150) unique                  not null,
        is_full_time    boolean                              not null,
        created_at      timestamp default now(),
        is_deleted      boolean   default false,
        foreign key (department_id) references department (id),
        foreign key (designation_id) references designation (id),
        foreign key (profile_id) references profile (id),
        deleted_at      timestamp
    );
`;