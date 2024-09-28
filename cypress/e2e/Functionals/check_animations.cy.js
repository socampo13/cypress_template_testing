describe('Check if there are animations in the page and if theyre working correctly', () => {
   beforeEach(() => {
      cy.visit('https://www-crnrstone-com.sandbox.hs-sites.com/fintech-hustle-2');
   });

   it('Check for animation class inside', () => {
      cy.wait(5000);

      cy.get('.aos-init.aos-animate').should('have.class', 'aos-animate')
   });

   it('Should check if element is in final position after animation', () => {
      cy.wait(5000);

      cy.get('.aos-init.aos-animate').should($el => {
         const rect = $el[0].getBoundingClientRect();
         expect(rect.top).to.be.closeTo(218, 5);
         expect(rect.left).to.be.closeTo(372, 5);
      });

      // Expected numbers can appear in the log with decimal numbers, round them to the closest number up high
      // That's why it is used the , 5 to have an error bound
   });

   it('Should log the coordinates of the animated element', () => {
      cy.wait(5000);

      cy.get('.aos-init.aos-animate').then($el => {
         const rect = $el[0].getBoundingClientRect();
         cy.log(`Top: ${rect.top}, Left: ${rect.left}, Right: ${rect.right}, Bottom: ${rect.bottom}`)
      });
      // You can confirmate coordinates with this assertion
   });
});

// IMPORTANT !!!!!!!
// To find the coordinates of the elements wanted use the following javascript code iniside the console of the DevTools of your browser

// const element = document.querySelector('here goes the .class or #id of the element you want to find'); 
// const rect = element.getBoundingClientRect();
// console.log(rect);