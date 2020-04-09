module.exports = `
    insert into subject_category (name)
    values ('General Education'),
           ('Common Courses'),
           ('Professional Courses'),
           ('Professional Electives'),
           ('Additional Math Requirement'),
           ('PE'),
           ('NSTP') on duplicate key update name = name;
`;
