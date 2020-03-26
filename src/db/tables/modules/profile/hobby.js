module.exports = `
    create table if not exists hobby
    (
        id         mediumint auto_increment primary key not null,
        profile_id mediumint                            not null,
        name       varchar(100),
        created_at timestamp default now(),
        is_deleted boolean   default false,
        deleted_at timestamp,
        foreign key (profile_id) references profile (id)
    );
`;