describe('Check if the template is having padding issues in tablet and smartphone size', () => {
   const baseUrl = 'https://45763993.hs-sites.com/blog/shaping-web-content-future'
   beforeEach(() => {
    cy.viewport(768, 1024);
   });
   it('Go to Related posts in tablet size and verify padding', () => {
      
    cy.visit(baseUrl);
    
    cy.get('.blog-related').within(() => {
        cy.get('.blog-related__grid').then((cards) => {
            cy.wrap(cards).first().should('have.css', 'padding', '0px');
            cy.wrap(cards).first().should('have.css', 'padding', '0px');
        });
    });
    cy.get('.blog-related__content').should('have.css', 'padding', '32px');
    cy.get('.blog-related__content').should('have.css', 'padding', '32px'); 
   });
});