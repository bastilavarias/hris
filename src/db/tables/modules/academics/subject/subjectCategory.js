module.exports = `
    create table if not exists subject_category
    (
        id   mediumint auto_increment primary key not null,
        name varchar(50)                          not null unique
    );
`;
