describe('Check that buttons have texts', () => {
   beforeEach(() => {
      cy.visit('https://spelmanlogistics.com/')
   });

   it('Ensures all buttons have text', () => {
      cy.get('button').each(($btn) => {
        cy.wrap($btn).invoke('text').should('not.be.empty');
      });
   });
});