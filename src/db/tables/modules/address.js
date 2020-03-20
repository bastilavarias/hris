module.exports = `
    create table if not exists address
    (
        id                     mediumint auto_increment primary key not null,
        permanent_house_number varchar(100),
        permanent_street       varchar(100),
        permanent_subdivision  varchar(100),
        permanent_barangay     varchar(100),
        permanent_city         varchar(50),
        permanent_province     varchar(50),
        permanent_zip_code     varchar(100),
        residential_house_number varchar(100),
        residential_street       varchar(100),
        residential_subdivision  varchar(100),
        residential_barangay     varchar(100),
        residential_city         varchar(50),
        residential_province     varchar(50),
        residential_zip_code     varchar(100),
        created_at             timestamp default now(),
        is_deleted             boolean   default true,
        deleted_at             timestamp
    );
`;