describe('Tests Contact Form', () => {
   it('Should send correctly the form', () => {
      cy.visit('https://www.onthefuze.com/contact');
      cy.get('input[name="name"]').type('Test Name');
      cy.get('input[name="email"]').type('support@onthefuze.com');
      cy.get('textarea[name="message"]').type('This is a test message. Please ignore');
      cy.get('button[button="submit"]').click();

      cy.contains('Thanks for contacting us').should('be.visible');
   });

   it('Should show an error message with invalid email', () => {
        cy.visit('https://www.onthefuze.com/contact');
        cy.get('input[name="name"]').type('Test Name');
        cy.get('input[name="email"]').type('test@test.com');
        cy.get('textarea[name="message"]').type('This is a test message. Please ignore');
        cy.get('button[button="submit"]').click();

        cy.get('input[name="email"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please enter a valid email address')
        });
   });
});