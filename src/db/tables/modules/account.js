module.exports = `
    create table if not exists account
    (
        id          mediumint auto_increment primary key not null,
        username varchar(150) not null, 
        password varchar(150) not null,
        created_at  timestamp default now(),
        is_active  boolean   default true,
        disabled_at  timestamp
#     disabled by
    );
`;