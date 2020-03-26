module.exports = `
    create table if not exists citizenship
    (
        id         mediumint auto_increment primary key not null,
        profile_id mediumint                            not null,
        name       varchar(150)                         not null,
        created_at timestamp default now(),
        is_deleted boolean   default true,
        deleted_at timestamp,
        foreign key (profile_id) references profile (id)
    );
`;