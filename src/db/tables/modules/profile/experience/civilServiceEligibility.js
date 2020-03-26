module.exports = `
    create table if not exists civil_service_eligibility
    (
        id                mediumint auto_increment primary key not null,
        profile_id        mediumint                            not null,
        license_title     varchar(150),
        rating            varchar(50),
        examination_date  date,
        examination_place varchar(300),
        license_number    varchar(50),
        validity_date     date,
        created_at        timestamp default now(),
        is_deleted        boolean   default false,
        deleted_at        timestamp,
        foreign key (profile_id) references profile (id)
    );
`;