module.exports = `
    create table if not exists account
    (
        id          mediumint auto_increment primary key not null,
        username    varchar(150)                         not null,
        password    varchar(300)                         not null,
        created_at  timestamp default now(),
        is_deleted   boolean   default false
    );
`;