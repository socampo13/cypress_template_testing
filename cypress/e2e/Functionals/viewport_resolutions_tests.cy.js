describe("My First Test", () => {
  const viewports = [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 768, height: 1024 },
    { width: 453, height: 816 },
    { width: 390, height: 844 },
  ];

  viewports.forEach((viewport) => {
    it(`Resolutions test ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit("https://www.onthefuze.com");
      cy.get('#hs-eu-decline-button').click({ multiple: true });
      cy.scrollTo('center').wait(3000);
      cy.scrollTo('bottom').wait(3000);

      // Verificar que los elementos estén dentro de sus contenedores
      cy.get('.row-fluid').children().each(($element) => {
        cy.wrap($element).should('be.visible');
        cy.wrap($element).should('have.css', 'position', 'static');
        cy.wrap($element).should('have.css', 'overflow', 'visible');
      });

      // Verificar la alineación de los elementos
      cy.get('.row-fluid').should(($element) => {
        const padding = parseInt($element.css('padding'), 10);
        const border = parseInt($element.css('border-width'), 10);

        // Verificar la alineación vertical
        expect($element.offset().top + padding + border).to.be.closeTo($element.parent().offset().top + padding, 2);

        // Verificar la alineación horizontal
        expect($element.offset().left + padding + border).to.be.closeTo($element.parent().offset().left + padding, 2);
      });

      // Verificar que no hay elementos salidos de sus contenedores
      cy.get('body').should('not.have.property', 'scrollHeight', 'greaterThan', 'viewportHeight');
  
      // Verificar que no hay elementos con ancho mayor al de su contenedor
      cy.get('.row-fluid').children().should(($element) => {
        expect($element.width()).to.be.at.most($element.parent().width());
      });

      // Verificar que no hay elementos con altura mayor a la de su contenedor
      cy.get('.row-fluid').children().should(($element) => {
        expect($element.height()).to.be.at.most($element.parent().height());
      });
    });
  });
});
