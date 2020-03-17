module.exports = `
    create table if not exists designation
    (
        id          mediumint auto_increment primary key not null,
        name        varchar(150)                         not null,
        description text,
        created_at  timestamp default now(),
        is_deleted  boolean   default false,
        deleted_at  timestamp
    );
`;