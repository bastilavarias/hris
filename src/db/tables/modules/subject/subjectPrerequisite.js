module.exports = `
    create table if not exists subject_prerequisite
    (
        id                mediumint auto_increment primary key not null,
        parent_subject_id mediumint                            not null,
        child_subject_id  mediumint                            not null,
        foreign key (child_subject_id) references subject (id)
    );  
`;