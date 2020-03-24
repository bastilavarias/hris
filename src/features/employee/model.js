const db = require("../../db");

module.exports = {
    create: async ({employeeNumber, departmentId, designationId, isFullTime, profileId, accountId}) => {
        const query = `insert into employee (department_id, designation_id, profile_id, account_id, employee_number,
                                             is_full_time)
                       values (?, ?, ?, ?, ?, ?);`;
        const params = [
            departmentId,
            designationId,
            profileId,
            accountId,
            employeeNumber,
            isFullTime
        ];
        await db.executeQuery(query, params);
    },

    getAll: async () => {
        const query = `select mainEmployee.id,
                              mainEmployee.employee_number               as employeeNumber,
                              mainEmployee.is_deleted                    as isDeleted,
                              mainEmployee.created_at                    as createdAt,
                              (select json_object('id', d.id, 'name', d.name)
                               from department d
                               where d.id = mainEmployee.department_id)  as department,
                              (select json_object('id', d.id, 'name', d.name)
                               from designation d
                               where d.id = mainEmployee.designation_id) as designation,
                              (select json_object('id', p.id, 'firstName', p.first_name, 'middleName', p.middle_name,
                                                  'lastName', p.last_name, 'extension', p.extension)
                               from profile p
                               where p.id = mainEmployee.profile_id)     as profile
                       from employee mainEmployee;`;
        const params = [];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    search: async (option, value) => {
        const targetTable = option === "employee_number" ? `mainEmployee` : `mainProfile`;
        const query = `select mainEmployee.id,
                              mainEmployee.employee_number               as employeeNumber,
                              mainEmployee.is_deleted                    as isDeleted,
                              mainEmployee.created_at                    as createdAt,
                              (select json_object('id', d.id, 'name', d.name)
                               from department d
                               where d.id = mainEmployee.department_id)  as department,
                              (select json_object('id', d.id, 'name', d.name)
                               from designation d
                               where d.id = mainEmployee.designation_id) as designation,
                              (select json_object('id', p.id, 'firstName', p.first_name, 'middleName', p.middle_name,
                                                  'lastName', p.last_name, 'extension', p.extension)
                               from profile p
                               where p.id = mainEmployee.profile_id)     as profile
                       from employee mainEmployee join profile mainProfile on mainEmployee.profile_id = mainProfile.id where ${targetTable}.${option} like '%${value}%';`;
        const params = [];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    getSingle: async (employeeId) => {
        const query = `select e.id,
                              e.employee_number             as employeeNumber,
                              e.is_full_time                as isFullTime,
                              (select json_object('id', id, 'name', name)
                               from department
                               where id = e.department_id)  as department,
                              (select json_object('id', id, 'name', name)
                               from designation
                               where id = e.designation_id) as designation,
                              (select json_object(
                                              'firstName', first_name,
                                              'middleName', middle_name,
                                              'lastName', last_name,
                                              'extension', extension,
                                              'birthDate', birth_date,
                                              'birthPlace', birth_place,
                                              'sex', sex,
                                              'civilStatus', civil_status,
                                              'citizenship', (select json_arrayagg(name)
                                                              from citizenship
                                                              where profile_id = p.id),
                                              'bloodType', blood_type,
                                              'height', height,
                                              'weight', weight,
                                              'photo', (select json_object(
                                                                       'url', url
                                                                   )
                                                        from photo
                                                        where id = p.photo_id),
                                              'benefit',
                                              (select json_object(
                                                              'id', id,
                                                              'gsisId', gsis_id,
                                                              'pagibigId', pagibig_id,
                                                              'philhealthId', philhealth_id,
                                                              'sssNumber', sss_number,
                                                              'tinNumber', tin_number,
                                                              'agencyEmployeeNumber', agency_employee_number
                                                          )
                                               from benefit
                                               where id = p.benefit_id),
                                              'contact', (select json_object(
                                                                         'id', id,
                                                                         'telephoneNumber', telephone_number,
                                                                         'mobileNumber', mobile_number,
                                                                         'emailAddress', email_address
                                                                     )
                                                          from contact
                                                          where id = p.contact_id),
                                              'address', (select json_object(
                                                                         'permanent', (select json_object(
                                                                                                      'houseNumber',
                                                                                                      permanent_house_number,
                                                                                                      'street',
                                                                                                      permanent_street,
                                                                                                      'subdivision',
                                                                                                      permanent_subdivision,
                                                                                                      'barangay',
                                                                                                      permanent_barangay,
                                                                                                      'city',
                                                                                                      permanent_city,
                                                                                                      'province',
                                                                                                      permanent_province,
                                                                                                      'zipCode',
                                                                                                      permanent_zip_code)),
                                                                         'residential', (select json_object(
                                                                                                        'houseNumber',
                                                                                                        residential_house_number,
                                                                                                        'street',
                                                                                                        residential_street,
                                                                                                        'subdivision',
                                                                                                        residential_subdivision,
                                                                                                        'barangay',
                                                                                                        residential_barangay,
                                                                                                        'city',
                                                                                                        residential_city,
                                                                                                        'province',
                                                                                                        residential_province,
                                                                                                        'zipCode',
                                                                                                        residential_zip_code))
                                                                     )
                                                          from address
                                                          where id = p.address_id),
                                              'family', (select json_object('id', id,
                                                                            'spouse', (select json_object(
                                                                                                      'firstName',
                                                                                                      spouse_first_name,
                                                                                                      'middleName',
                                                                                                      spouse_middle_name,
                                                                                                      'lastName',
                                                                                                      spouse_last_name,
                                                                                                      'extension',
                                                                                                      spouse_extension
                                                                                                  )),
                                                                            'father', (select json_object(
                                                                                                      'firstName',
                                                                                                      father_first_name,
                                                                                                      'middleName',
                                                                                                      father_middle_name,
                                                                                                      'lastName',
                                                                                                      father_last_name,
                                                                                                      'extension',
                                                                                                      father_extension
                                                                                                  )),
                                                                            'mother', (select json_object(
                                                                                                      'firstName',
                                                                                                      mother_first_name,
                                                                                                      'middleName',
                                                                                                      mother_middle_name,
                                                                                                      'lastName',
                                                                                                      mother_last_name,
                                                                                                      'extension',
                                                                                                      mother_extension
                                                                                                  )),
                                                                            'children',
                                                                            (select json_arrayagg(json_object('name', name, 'birthDate', birthDate))
                                                                             from child
                                                                             where family_id = p.family_id)
                                                                    )
                                                         from family
                                                         where id = p.family_id),
                                              'education', (select json_arrayagg(json_object(
                                              'level', level,
                                              'degree', degree,
                                              'schoolName', school_name,
                                              'yearFrom', year_form,
                                              'yearTo', year_to,
                                              'yearGraduated', year_graduated,
                                              'recognition', recognition,
                                              'scholarship', scholarship
                                          ))
                                                            from education
                                                            where profile_id = e.profile_id),
                                              'civilServiceEligibility', (select json_arrayagg(json_object(
                                              'licenseTitle', license_title,
                                              'licenseNumber', license_number,
                                              'rating', rating,
                                              'validityDate', validity_date,
                                              'examinationDate', examination_date,
                                              'examinationPlace', examination_place
                                          ))
                                                                          from civil_service_eligibility
                                                                          where profile_id = e.profile_id),
                                              'workExperiences', (select json_arrayagg(json_object(
                                              'companyName', company_name,
                                              'position', position,
                                              'yearFrom', year_from,
                                              'yearTo', year_to,
                                              'monthlySalary', monthly_salary,
                                              'isFullTime', is_full_time,
                                              'isGovernmentService', is_government_service
                                          ))
                                                                  from work_experience
                                                                  where profile_id = e.profile_id),
                                              'voluntaryWorkExperiences',
                                              (select json_arrayagg(json_object(
                                                      'companyName', company_name,
                                                      'position', position,
                                                      'address', address,
                                                      'yearFrom', year_from,
                                                      'yearTo', year_to,
                                                      'hoursNumber', hours_number
                                                  ))
                                               from voluntary_work_experience
                                               where profile_id = e.profile_id),
                                              'trainings', (select json_arrayagg(json_object(
                                              'programTitle', program_title,
                                              'dateFrom', date_from,
                                              'dateTo', date_to,
                                              'hoursNumber', hours_number,
                                              'type', type,
                                              'sponsor', sponsor
                                          ))
                                                            from training
                                                            where profile_id = e.profile_id),
                                              'hobbies',
                                              (select json_arrayagg(name) from hobby where profile_id = e.profile_id),
                                              'recognitions',
                                              (select json_arrayagg(name)
                                               from recognition
                                               where profile_id = e.profile_id),
                                              'organizations',
                                              (select json_arrayagg(name)
                                               from organization
                                               where profile_id = e.profile_id),
                                              'references',
                                              (select json_arrayagg(json_object('name', name, 'address', address,
                                                                                'contactNumber', contact_number))
                                               from reference
                                               where profile_id = e.profile_id),
                                              'governmentIssueId',
                                              (select json_object(
                                                              'governmentId', government_id,
                                                              'licenseNumber', licence_number,
                                                              'issuanceDate', issuance_date,
                                                              'issuancePlace', issuance_place
                                                          )
                                               from government_issue_id
                                               where id = p.government_issue_id_id)
                                          )
                               from profile
                               where id = p.id)             as profile
                       from employee e
                                join profile p on e.profile_id = p.id
                       where e.id = ?;`;
        const params = [employeeId];
        const results = await db.executeQuery(query, params);
        return results[0][0] ? results[0][0] : {};
    },

    update: async (employeeId, {departmentId, designationId, isFullTime}) => {
        const query = `update employee
                       set department_id  = ?,
                           designation_id = ?,
                           is_full_time   = ?
                       where id = ?;`;
        const params = [departmentId, designationId, isFullTime, employeeId];
        await db.executeQuery(query, params);
    },

    getRaw: async (employeeId) => {
        const query = `select id,
                              department_id,
                              designation_id,
                              profile_id as profileId,
                              employee_number,
                              is_full_time,
                              created_at,
                              is_deleted,
                              deleted_at
                       from employee
                       where id = ?;`;
        const params = [employeeId];
        const results = await db.executeQuery(query, params);
        return results[0][0] ? results[0][0] : {};
    },

    getSingleByAccountId: async (accountId) => {
        const query = `select e.id,
                              e.employee_number         as employeeNumber,
                              e.created_at              as createdAt,
                              (select json_object(
                                              'firstName', first_name,
                                              'middleName', middle_name,
                                              'lastName', last_name,
                                              'extension', extension,
                                              'photo', (select url from photo where id = p.photo_id)
                                          )
                               from profile
                               where id = e.profile_id) as profile,
                              (select json_object('username', username)
                               from account
                               where id = e.account_id) as account,
                              d.name                    as designation
                       from employee e
                                join profile p on e.profile_id = p.id
                                join designation d on e.designation_id = d.id
                       where e.account_id = ?
                         AND e.is_deleted = ?;`;
        const params = [accountId, false];
        const results = await db.executeQuery(query, params);
        return results[0][0] ? results[0][0] : {};
    }
};