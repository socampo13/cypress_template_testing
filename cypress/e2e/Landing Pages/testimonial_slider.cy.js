describe('Test the Testimonial Slider', () => {
   it('Testimonial Slider module functionality', () => {
    
      cy.visit('https://hubspot.assetguidancegroup.com/landing-page'); // Remember to change URL to the one you're using

      cy.get('.testimonial-slider')
        .as('testimonial slider');

      cy.get('@testimonial slider')
        .invoke('val', 50)
        .trigger('change');
      
      cy.get('@testimonial slider')
        .should('have.value', '50');  

      cy.get('.swiper-pagination-bullet').click({ multiple:true })
        
      cy.get('.swiper-pagination-bullet-active').click()
        
   });

});

// If test approves, it means the functionality of moving the cards is correct