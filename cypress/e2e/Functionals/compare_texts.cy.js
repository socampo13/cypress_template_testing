// As this comparison is done in non-main pages, the cy.origin is used. 
describe('Comparar textos de dos páginas diferentes', () => {
    it('Debería comparar el texto de dos páginas', () => {
      // Variables to store the texts from both pages
      let textoPagina1;
      let textoPagina2;
  
      // Navigate to the first page and extract the text
      cy.origin('https://45425856.hs-sites.com/', () => {
        cy.visit('https://45425856.hs-sites.com/cit_on_nasdaq');
        cy.get("h1"); // Titles
        cy.get("p") // Texts
        /* cy.get(".ctaText") // CTA/Buttons
        cy.get(".postTitle") // Link texts */
        // If needed, change, add or delete all of the selectors
          .invoke('text')
          .then((texto) => {
            textoPagina1 = texto.trim();
          });
      });
  
      // Navigate to the second page and extract the text
      cy.origin('https://engage.dcmol.com/', () => {
        cy.visit('https://engage.dcmol.com/CIT_on_nasdaq');
        cy.get("p"); // Texts
        /* cy.get("h2"); // Titles */
        cy.get("h1"); // Titles 
        cy.get("span") // Link texts 
        // If needed, change, add or delete all of the selectors
          .invoke('text')
          .then((texto) => {
            textoPagina2 = texto.trim();
          });
      });
  
      // Compare the texts after both are obtained
      cy.then(() => {
        expect(textoPagina1).to.equal(textoPagina2);
      });
    });
  });
  