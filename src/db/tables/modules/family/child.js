module.exports = `
    create table if not exists child
    (
        id         mediumint auto_increment primary key not null,
        family_id mediumint not null,
        name       varchar(150),
        birthDate  date,
        created_at timestamp default now(),
        is_deleted boolean   default false,
        deleted_at timestamp,
        foreign key (family_id) references family(id)
    );
`;