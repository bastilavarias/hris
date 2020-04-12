module.exports = `
    create table if not exists room
    (
        id              mediumint auto_increment primary key not null,
        building_id     mediumint not null,
        name            varchar(300) not null,
        created_at      timestamp default now(),
        is_deleted      boolean   default false,
        deleted_at      timestamp,
        foreign key (building_id) references building (id)
    );
`;
