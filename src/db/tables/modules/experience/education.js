module.exports = `
    create table if not exists education
    (
        id         mediumint auto_increment primary key not null,
        profile_id mediumint not null,
        level varchar(50),
        degree varchar(100),
        school_name varchar(150),
        year_form int,
        year_to int,
        year_graduated int,
        recognition varchar(300),
        scholarship varchar(300),
        created_at timestamp default now(),
        is_deleted boolean   default false,
        deleted_at timestamp,
        foreign key (profile_id) references profile (id)
    );
`;