describe("Check if the template is having padding issues in tablet and smartphone size", () => {
  const baseUrl = "https://46257773.hubspotpagebuilder.com/pillar-page";
  beforeEach(() => {
    cy.viewport(453, 816);
  });
  it("Check if the template has the mobile menu active and working", () => {
    cy.visit(baseUrl);

    cy.get(".pillar-page-index__btn-open").click();
    cy.get(".pillar-page-one--parent > li:nth-child(2) > a").click();
    cy.get(".pillar-page-index__btn-open").click();
    cy.get(".pillar-page-one--parent > li:nth-child(4) > a").click();
  });

  it("Check that the Back To Top button works in this resolution", () => {
    cy.visit(baseUrl);

      cy.scrollTo('bottom');
      cy.scrollTo('center');
      cy.wait(2000);
      
      cy.get('.scroll-top__button').click({ force: true });
  });
});
