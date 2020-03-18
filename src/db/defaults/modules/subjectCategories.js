module.exports = `
    insert into subject_category (name)
    VALUES ('General Education'),
           ('Common Courses'),
           ('Professional Courses'),
           ('Professional Electives'),
           ('Additional Math Requirement'),
           ('PE'),
           ('NSTP') on duplicate key update name = name;
`;