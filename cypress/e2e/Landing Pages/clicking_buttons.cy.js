describe('Clicking on buttons works', () => {
   beforeEach(() => {
      cy.visit('https://hubspot.assetguidancegroup.com/landing-page');
   });

   it('Button works', () => {
      cy.contains('VIEW MORE').click();
   });
})