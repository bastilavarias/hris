module.exports = `
    create table if not exists voluntary_work_experience
    (
        id           mediumint auto_increment primary key not null,
        profile_id   mediumint                            not null,
        company_name varchar(150),
        position     varchar(50),
        address      varchar(100),
        date_from    date,  
        date_to      date,
        hours_number int,
        created_at   timestamp default now(),
        is_deleted   boolean   default false,
        deleted_at   timestamp,
        foreign key (profile_id) references profile (id)
    );
`;