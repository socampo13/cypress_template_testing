describe('Test functionality of the pillar page', () => {

    const baseUrl = 'https://39951248.hs-sites.com/pillar-page';
   it('should work the side-menu', () => {

      cy.visit(baseUrl);
      
      cy.get('li').click({ multiple: true });
      cy.get('.pillar-page-one--parent > li:nth-child(2) > a').click();

      cy.get('.pillar-page-one--parent > li:nth-child(3) > a').click();

      cy.get('.pillar-page-one--parent > li:nth-child(4) > a').click();

      cy.get('.pillar-page-one--parent > li:nth-child(5) > a').click();

      cy.get('.pillar-page-one--parent > li:nth-child(3) > a').click();
   });

   it('back to top button should work', () => {
      cy.visit(baseUrl);

      cy.scrollTo('bottom');
      cy.scrollTo('center');
      cy.wait(2000);
      
      cy.get('.scroll-top__button').click();
   });
});