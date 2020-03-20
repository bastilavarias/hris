module.exports = `
    create table if not exists contact
    (
        id               mediumint auto_increment primary key not null,
        telephone_number varchar(50),
        mobile_number    varchar(50),
        email_address    varchar(75),
        created_at       timestamp default now(),
        is_deleted       boolean   default true,
        deleted_at       timestamp
    );
`;