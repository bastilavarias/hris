module.exports = `
    create table if not exists benefit
    (
        id                     mediumint auto_increment primary key not null,
        gsis_id                text                                 not null,
        pagibig_id             text                                 not null,
        philhealth_id          text                                 not null,
        sss_number             text                                 not null,
        tin_number             text                                 not null,
        agency_employee_number text                                 not null,
        created_at             timestamp default now(),
        is_deleted             boolean   default true,
        deleted_at             timestamp
    );
`;