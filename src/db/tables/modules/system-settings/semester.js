module.exports = `
    create table if not exists semester
    (
        id              mediumint auto_increment primary key not null,
        name            text not null,
        is_current      boolean default false,
        created_at      timestamp default now(),
        is_deleted      boolean   default false,
        deleted_at      timestamp
    );
`;
