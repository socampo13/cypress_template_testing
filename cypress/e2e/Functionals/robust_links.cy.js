describe("The Home Page", () => {
    it("successfully loads and checks links", () => {  
        cy.on('uncaught:exception', (err, runnable) => {
          return false;
        });
      cy.visit("https://12br.com"); // Asegúrate de usar el sitio correcto

  
      cy.get("a").should("have.length.greaterThan", 0).each(($link) => {
        const href = $link.attr("href");
  
        if (href && href.startsWith("http")) {
          cy.request({
            url: href,
            failOnStatusCode: false, // Opcional: para manejar redirecciones y otros códigos de estado
          }).then((resp) => {
            cy.log(`Status for ${href}: ${resp.status}`);
            expect(resp.status).to.be.oneOf([200, 301, 302]);
          });
        }
      });
    });
  });