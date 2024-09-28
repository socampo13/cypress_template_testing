describe('Security Tests', () => {
   it('Should be served through HTTPS', () => {
      cy.visit('https://www.onthefuze.com');
      cy.location('protocol').should('eq', 'https:')
   });
});