module.exports = `
    create table if not exists faculty_schedule
    (
        id                mediumint auto_increment primary key not null,
        section_id        mediumint                            not null,
        subject_id        mediumint                            not null,
        employee_id       mediumint                            not null,
        semester_id       mediumint                            not null,
        start_year        mediumint                            not null,
        end_year          mediumint                            not null,
        foreign key (section_id) references section (id),
        foreign key (subject_id) references subject (id),
        foreign key (employee_id) references employee (id),
        foreign key (semester_id) references semester (id),
        created_at        timestamp default now(),
        is_deleted        boolean   default false,
        deleted_at        timestamp
    );
`;
