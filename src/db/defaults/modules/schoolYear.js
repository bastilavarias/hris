module.exports = `
    insert into school_year (custom_id, start_year, end_year) 
    values ("current", year(curdate()), year(curdate())) 
    on duplicate key update custom_id = custom_id;
`;
