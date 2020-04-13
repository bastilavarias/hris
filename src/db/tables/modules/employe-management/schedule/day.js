module.exports = `
    create table if not exists day
    (
        id         mediumint auto_increment primary key not null,
        name       varchar(50)                          not null unique,
        created_at timestamp default now(),
        is_deleted boolean   default false,
        deleted_at timestamp
    );
`;
