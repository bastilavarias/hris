module.exports = `
    create table if not exists benefit
    (
        id                     mediumint auto_increment primary key not null,
        gsis_id                varchar(50),
        pagibig_id             varchar(50),
        philhealth_id          varchar(50),
        sss_number             varchar(50),
        tin_number             varchar(50),
        agency_employee_number varchar(50),
        created_at             timestamp default now(),
        is_deleted             boolean   default true,
        deleted_at             timestamp
    );
`;