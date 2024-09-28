describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("https://12br.com"); // Add the site you want to review. Use the same format as it appears

    cy.get("a").each((link) => {
      const href = link.attr("href");

      if (href && href.startsWith("http")) {
        cy.request(href).then((resp) => {
          expect(resp.status).to.eq(200);
        });
      }
    });
  });
});
// This test will only test that all <a></a> tags are not empty or redirecting to broken links. 
// It won't test correct redirection. This will be done in a different test as it must be done completely manual. 