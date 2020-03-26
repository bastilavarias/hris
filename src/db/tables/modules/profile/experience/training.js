module.exports = `
    create table if not exists training
    (
        id            mediumint auto_increment primary key not null,
        profile_id    mediumint                            not null,
        program_title varchar(150),
        date_from     date,
        date_to       date,
        hours_number  int,
        type          varchar(300),
        sponsor       varchar(300),
        created_at    timestamp default now(),
        is_deleted    boolean   default false,
        deleted_at    timestamp,
        foreign key (profile_id) references profile (id)
    );
`;