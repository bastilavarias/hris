module.exports = `
    create table if not exists photo
    (
        id        mediumint auto_increment primary key not null,
        url       varchar(2083),
        public_id varchar(250)
    );
`;