describe('Checks that the internal links are working', () => {
   it('Should redirect to About page', () => {
      cy.visit('https://www.onthefuze.com');
      cy.get('a[href="/about"]').click();
      cy.url().should('include', '/about');
      cy.get('h1').should('contain', 'About');
   });
});