module.exports = `
    create table if not exists family
    (
        id                 mediumint auto_increment primary key not null,
        spouse_first_name  varchar(150)                         not null,
        spouse_middle_name varchar(150)                         not null,
        spouse_last_name   varchar(150)                         not null,
        spouse_extension   varchar(50)                          not null,
        father_first_name  varchar(150)                         not null,
        father_middle_name varchar(150)                         not null,
        father_last_name   varchar(150)                         not null,
        father_extension   varchar(50)                          not null,
        mother_first_name  varchar(150)                         not null,
        mother_middle_name varchar(150)                         not null,
        mother_last_name   varchar(150)                         not null,
        mother_extension   varchar(50)                          not null,
        created_at         timestamp default now(),
        is_deleted         boolean   default false,
        deleted_at         timestamp
    );
`;