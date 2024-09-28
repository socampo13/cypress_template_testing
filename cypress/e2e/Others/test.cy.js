describe("The Home Page", () => {
    it("successfully loads and checks links", () => {
      cy.visit("https://vercara.com");
  
      // Handle HTTP requests and check links
      cy.get("a").each(($link) => {
        const href = $link.prop("href");
  
        if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
          cy.request({
            url: href,
            failOnStatusCode: false  // Don't fail the test on non-200 status codes
          }).then((resp) => {
            expect(resp.status).to.eq(200);
          }).catch((err) => {
            // Log any failed requests
            Cypress.log({
              name: 'Request Failed',
              message: `Failed to request ${href}: ${err.message}`,
              consoleProps: () => ({ href, error: err.message })
            });
          });
        }
      });
  
      // Handling uncaught exceptions
      Cypress.on("uncaught:exception", (err, runnable) => {
        // Log uncaught exceptions
        Cypress.log({
          name: 'Uncaught Exception',
          message: `Uncaught exception occurred: ${err.message}`,
          consoleProps: () => ({ error: err.message })
        });
        // Fail the test if an uncaught exception occurs
        throw err;
      });
    });
  });
  