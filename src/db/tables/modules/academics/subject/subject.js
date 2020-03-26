module.exports = `
    create table if not exists subject
    (
        id                  mediumint auto_increment primary key not null,
        subject_category_id mediumint                            not null,
        code                varchar(50)                          not null,
        title               varchar(150)                         not null,
        description         text,
        units               mediumint                            not null,
        created_at          timestamp default now(),
        is_deleted          boolean   default false,
        deleted_at          timestamp,
        foreign key (subject_category_id) references subject_category (id) on delete cascade
    );
`;