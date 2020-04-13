module.exports = `
    insert into day (name)
    values ('Monday'),
           ('Tuesday'),
           ('Wednesday'),
           ('Thursday'),
           ('Friday'),
           ('Saturday'),
           ('Sunday') on duplicate key update name = name;
`;
