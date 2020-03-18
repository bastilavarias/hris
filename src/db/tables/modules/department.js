module.exports = `
    create table if not exists department
    (
        id              mediumint auto_increment primary key not null,
        employee_id mediumint,
        name varchar(150) not null unique,
        description text not null,
        created_at      timestamp default now(),
        is_deleted      boolean   default false,
        foreign key (employee_id) references employee (id),
        deleted_at      timestamp
    );
`;
