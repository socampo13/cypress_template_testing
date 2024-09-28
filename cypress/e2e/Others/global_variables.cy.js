describe('Ejemplo de uso de variables de entorno', () => {
    it('Acceder a variables de entorno', () => {
      /* const username = Cypress.env('username');
      const password = Cypress.env('password'); */
  
      cy.visit('https://app.hubspot.com/login/beta');
        cy.get('#username').dblclick();
        cy.get('#username').click();
        cy.get('#username').type('{backspace}');
        cy.get('#username').type('support@onthefuze.com');
        cy.get('#loginBtn > i18n-string').click();
        cy.get('form').submit();
        cy.get('.GoogleLoginButtonstyles__ButtonText-sc-1n3aib7-2 > i18n-string').click();
        cy.url().should('contains', 'https://accounts.google.com/o/oauth2/auth');
        cy.url().should('contains', 'https://app.hubspot.com/login/googleLoginRedirect');
        cy.url().should('contains', 'https://app.hubspot.com/home-beta');
        cy.url().should('contains', 'https://app.hubspot.com/reports-dashboard/45742934');
        cy.url().should('contains', 'https://app.hubspot.com/calling-cross-tab-embed/45742934/embed');
        cy.url().should('contains', 'https://app.hubspot.com/live-notifications-embed/45742934/embed');

  
      // Agrega las aserciones necesarias
    });
  });
  