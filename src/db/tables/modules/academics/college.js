module.exports = `
    create table if not exists college
    (
        id          mediumint auto_increment primary key not null,
        custom_id   varchar(150)                         not null unique,
        name        varchar(150)                         not null,
        description text,
        created_at  timestamp default now(),
        is_deleted  boolean   default false,
        deleted_at  timestamp
    );
`;