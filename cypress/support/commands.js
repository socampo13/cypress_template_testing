// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
/* //Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://saucedemo.com',
        body: {
            username: 'standard_user',
            password: 'secret_sauce'
        }
    }).then((resp) => {
        window.localStorage.setItem('authToken', resp.body.token);
    });
}); */
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Command for reading the XLSX files using the xlsx library
const XLSX = require('xlsx')

Cypress.Commands.add('readExcelFile', (filePath) => {
    return cy.readFile(filePath, 'binary').then((content) => {
      const workbook = XLSX.read(content, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: '' }); // Empty cells won't cause problems
      return data;
    });
  });