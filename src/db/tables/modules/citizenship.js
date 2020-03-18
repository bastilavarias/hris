module.exports = `
    create table if not exists citizenship
    (
        id                   mediumint auto_increment primary key not null,
        basic_information_id mediumint                            not null,
        nationality          varchar(150)                         not null,
        created_at           timestamp default now(),
        is_deleted           boolean   default true,
        deleted_at           timestamp,
        foreign key (basic_information_id) references basic_information (id)
    );
`;