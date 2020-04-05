module.exports = `
    create table if not exists department_head
    (
        id            mediumint auto_increment primary key not null,
        employee_id   mediumint,
        department_id mediumint                            not null,
        created_at    timestamp default now(),
        is_deleted    boolean   default false,
        deleted_at    timestamp,
        foreign key (employee_id) references employee (id),
        foreign key (department_id) references department (id)
    );
`;
