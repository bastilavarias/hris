const helperService = require("../helper/service");
const jsonWebTokenService = require("../jsonWebToken/service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  ACCOUNT_TABLE_NAME,
  ACCOUNT_TABLE_USERNAME_COLUMN_NAME,
} = require("./type");

const accountService = {
  login: async (username, password) => {
    const error = {};
    const gotRawAccount = await helperService.getRaw(
      ACCOUNT_TABLE_NAME,
      ACCOUNT_TABLE_USERNAME_COLUMN_NAME,
      username
    );
    if (Object.keys(gotRawAccount).length === 0) {
      error.username = "Account username was not found.";
      return {
        error,
      };
    }
    const isValidPassword = await accountService.compareHashedPassword(
      password,
      gotRawAccount.password
    );
    if (!isValidPassword) {
      error.password = "Invalid password.";
      return {
        error,
      };
    }
    const currentAccount = {
      username,
      password,
      employeeNumber: "XXX-xxxx-XXX",
      designation: {
        title: "Human Resource Staff",
      },
      profile: {
        firstName: "Test",
        middleName: "Test",
        lastName: "Account",
        extension: "",
        imageUrl: "https://i.redd.it/sgratkx3xj731.png",
      },
      actions: accountService.getCurrentAccountactions(username),
    };
    const token = jsonWebTokenService.getBearerToken(currentAccount);
    return {
      error,
      token,
    };
  },

  compareHashedPassword: async (plainTextPassword, hashedPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  },

  // This code is temporary
  getCurrentAccountactions: (username) => {
    let actions = [];
    switch (username) {
      case "encoder":
        actions = [
          {
            text: "Subject Management",
            icon: "mdi-text-subject",
            to: { name: "subject-list" },
          },

          {
            text: "College Management",
            icon: "mdi-school",
            to: { name: "college-list" },
          },

          {
            text: "Course Management",
            icon: "mdi-book-multiple",
            to: { name: "course-list" },
          },

          {
            text: "Section Management",
            icon: "mdi-google-classroom",
            to: { name: "section-list" },
          },

          {
            text: "Building Management",
            icon: "mdi-domain",
            to: { name: "building-list" },
          },

          {
            text: "Room Management",
            icon: "mdi-door",
            to: { name: "room-list" },
          },
        ];
        break;

      case "faculty":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Personal FTA Management",
            icon: "mdi-calendar-multiple-check",
            to: { name: "personal-faculty-teaching-assignment-list" },
          },
        ];
        break;

      case "personnel":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Schedule Viewer",
            icon: "mdi-calendar",
            to: { name: "personnel-schedule-viewer" },
          },
        ];
        break;

      case "dean":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Personal FTA Management",
            icon: "mdi-calendar-multiple-check",
            to: { name: "personal-faculty-teaching-assignment-list" },
          },

          {
            text: "FTA Management",
            icon: "mdi-calendar-multiple-check",
            to: { name: "faculty-teaching-assignment-list" },
          },
        ];
        break;

      case "personnel_head":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Schedule Viewer",
            icon: "mdi-calendar",
            to: { name: "personnel-schedule-viewer" },
          },

          {
            text: "Employee Schedule Tagger",
            icon: "mdi-calendar-account",
            to: { name: "employee-schedule-tagger" },
          },
        ];
        break;

      case "hr":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Employee Management",
            icon: "mdi-account-tie",
            to: { name: "employee-list" },
          },

          {
            text: "Department Management",
            icon: "mdi-account-group",
            to: { name: "department-list" },
          },

          {
            text: "Designation Management",
            icon: "mdi-account-box",
            to: { name: "designation-list" },
          },

          {
            text: "Leave Management",
            icon: "mdi-account-arrow-right",
            to: { name: "leave-list" },
          },

          {
            text: "Activity Log",
            icon: "mdi-post",
            to: { name: "activity-log" },
          },
        ];
        break;

      case "hr_head":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Employee Management",
            icon: "mdi-account-tie",
            to: { name: "employee-list" },
          },

          {
            text: "Department Management",
            icon: "mdi-account-group",
            to: { name: "department-list" },
          },

          {
            text: "Designation Management",
            icon: "mdi-account-box",
            to: { name: "designation-list" },
          },

          {
            text: "Leave Management",
            icon: "mdi-account-arrow-right",
            to: { name: "leave-list" },
          },

          {
            text: "Activity Log",
            icon: "mdi-post",
            to: { name: "activity-log" },
          },
        ];
        break;

      case "accountant":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Salary Maintenance",
            icon: "mdi-cash-multiple",
            to: { name: "salary-list" },
          },
        ];
        break;

      case "vpaa":
        actions = [
          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "Semester Management",
            icon: "mdi-chair-school",
            to: { name: "semester-list" },
          },

          {
            text: "School Year Management",
            icon: "mdi-calendar-range",
            to: { name: "school-year-list" },
          },

          {
            text: "Year Level Management",
            icon: "mdi-filter-variant",
            to: { name: "year-level-list" },
          },
        ];
        break;

      case "developer":
        actions = [
          {
            text: "Subject Management",
            icon: "mdi-text-subject",
            to: { name: "subject-list" },
          },

          {
            text: "College Management",
            icon: "mdi-school",
            to: { name: "college-list" },
          },

          {
            text: "Course Management",
            icon: "mdi-book-multiple",
            to: { name: "course-list" },
          },

          {
            text: "Section Management",
            icon: "mdi-google-classroom",
            to: { name: "section-list" },
          },

          {
            text: "Building Management",
            icon: "mdi-domain",
            to: { name: "building-list" },
          },

          {
            text: "Room Management",
            icon: "mdi-door",
            to: { name: "room-list" },
          },

          {
            text: "Personal Data Sheet",
            icon: "mdi-file-account",
            to: { name: "personal-data-sheet" },
          },

          {
            text: "FTA Management",
            icon: "mdi-calendar-multiple-check",
            to: { name: "faculty-teaching-assignment-list" },
          },

          {
            text: "Employee Schedule Tagger",
            icon: "mdi-calendar-account",
            to: { name: "employee-schedule-tagger" },
          },

          {
            text: "Employee Management",
            icon: "mdi-account-tie",
            to: { name: "employee-list" },
          },

          {
            text: "Department Management",
            icon: "mdi-account-group",
            to: { name: "department-list" },
          },

          {
            text: "Designation Management",
            icon: "mdi-account-box",
            to: { name: "designation-list" },
          },

          {
            text: "Leave Management",
            icon: "mdi-account-arrow-right",
            to: { name: "leave-list" },
          },

          {
            text: "Salary Maintenance",
            icon: "mdi-cash-multiple",
            to: { name: "salary-list" },
          },

          {
            text: "Semester Management",
            icon: "mdi-chair-school",
            to: { name: "semester-list" },
          },

          {
            text: "School Year Management",
            icon: "mdi-calendar-range",
            to: { name: "school-year-list" },
          },

          {
            text: "Year Level Management",
            icon: "mdi-filter-variant",
            to: { name: "year-level-list" },
          },

          {
            text: "Account Action Management",
            icon: "mdi-account-details",
            to: { name: "account-action-list" },
          },

          {
            text: "Authorization Management",
            icon: "mdi-badge-account-horizontal",
            to: { name: "authorization-list" },
          },
        ];
        break;
    }
    return actions;
  },
};

module.exports = accountService;
