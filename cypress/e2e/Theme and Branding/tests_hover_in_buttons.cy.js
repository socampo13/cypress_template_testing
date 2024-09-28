describe('Checks hover effects in buttons', () => {
   beforeEach(() => {
      cy.visit('https://www.onthefuze.com/');
   });

   it('Hovers are working', () => {
// Save the original styles. NOT NEEDED TO ADD ANY COLOR
      const originalBgColors = [];
      const originalColors = [];
      const originalBorderColors = [];
// Find all elements of buttons and iterate over them
      cy.get('button').each(($btn, index) => {
// Saves the original background-color 
        cy.wrap($btn).invoke('css', 'background-color').then((bgColor) => {
            originalBgColors[index] = bgColor;
        });
// Saves the origianl text color
        cy.wrap($btn).invoke('css', 'color').then((color) => {
            originalColors[index] = color;
        });
// Saves the original border-color
        cy.wrap($btn).invoke('css', 'border-color').then((borderColor) => {
            originalBorderColors[index] = borderColor;
        });
// Triggers the hover state, simulates the mouse getting over the buttons
        cy.wrap($btn).trigger('mouseover', { force: true });
// Checks if styles have changed
        cy.wrap($btn).invoke('css', 'background-color').then((hoverBgColor) => {
            if (hoverBgColor === originalBgColors[index]){
                cy.log(`Button ${index + 1} does not have a hover effect on background-color`);
            }
        });

        cy.wrap($btn).invoke('css', 'color').then((hoverColor) => {
            if (hoverColor === originalColors[index]){
                cy.log(`Button ${index + 1} does not have a hover effect on color`);
            }
        });

        cy.wrap($btn).invoke('css', 'border-color').then((hoverBorderColor) => {
            if (hoverBorderColor === originalBorderColors[index]){
                cy.log(`Button ${index + 1} does not have a hover effect on border-color`);
            }
        });
// Simulates hover state finishes by moving the mouse away from the button
        cy.wrap($btn).trigger('mouseout', { force: true });
      });
   });
});