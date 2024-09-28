describe('Form submission test', () => {
    it('Should fill out and submit the form', () => {
      // Visit the page with the form
      cy.visit('https://hubspot.assetguidancegroup.com/landing-page'); // Replace with the actual URL of your form
  
      // Fill out the form fields using different types of selectors
      cy.get('input[Name="firstname"]').type('John'); // Using the 'name' attribute
      cy.get('input[Name="lastname"]').type('Doe'); // Using the 'name' attribute
      cy.get('input[placeholder="(907) 555-0101"]').type('5555555555'); // Using the 'placeholder' attribute
      cy.get('input[type="email"]').type('support@onthefuze.com'); // Using the 'type' attribute
      cy.get('input[placeholder="Your company name"]').type('Example Inc.'); // Using the 'placeholder' attribute
      cy.get('input[placeholder="Medical Assistant"]').type('Test Title'); // Using the 'placeholder' attribute
      cy.get('textarea[placeholder="Leave us a message"]').type('This is a test message.'); // Using the 'placeholder' attribute
  
      // Check the accept button
      cy.get('input[type="checkbox"]').check({ force:true }); // Using the 'type' attribute
  
      // Submit the form
      cy.get('.hs-button').click(); // Using the 'type' attribute for the submit button
    });
  });
  