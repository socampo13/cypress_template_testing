describe('Checks that the internal links are working', () => {
   it('Should redirect to About page', () => {
      cy.visit('https://www.onthefuze.com');
      cy.get('.row-number-1').click();
      cy.url().should('contain', '/');
      cy.get('h1').should('contain', 'Maximize HubSpot');
   });
});