module.exports = `
    create table if not exists school_year
    (
        id              mediumint auto_increment primary key not null,
        custom_id       varchar(15) not null unique,
        start_year      mediumint not null,
        end_year        mediumint not null,
        created_at      timestamp default now(),
        is_deleted      boolean   default false,
        deleted_at      timestamp
    );
`;
