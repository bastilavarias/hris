module.exports = `
    create table if not exists government_id
    (
        id         mediumint auto_increment primary key not null,
        government_id varchar(50),
        licence_number varchar(50),
        issuance_date date,
        issuance_place varchar(100),
        created_at timestamp default now(),
        is_deleted boolean   default false,
        deleted_at timestamp
    );
`;