module.exports = `
    create table if not exists school_year
    (
        id              mediumint auto_increment primary key not null,
        semester_id mediumint not null,
        start_year      mediumint not null,
        end_year        mediumint not null,
        is_current      boolean default false,
        created_at      timestamp default now(),
        is_deleted      boolean   default false,
        deleted_at      timestamp,
        foreign key (semester_id) references semester (id)
    );
`;
