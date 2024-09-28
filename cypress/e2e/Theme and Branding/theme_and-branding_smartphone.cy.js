describe("Font sizes for smartphone are correct", () => {
  const baseUrl = "https://45122471.hs-sites.com/style-guide";

  beforeEach(() => {
    cy.viewport(453, 816);
  });

  it("Check that H tags are the correct size", () => {
    cy.visit(baseUrl);

    cy.get("h1").should("have.css", "font-size", "40px");
    cy.get("h2").should("have.css", "font-size", "36px");
    cy.get("h3").should("have.css", "font-size", "32px");
    cy.get("h4").should("have.css", "font-size", "26px");
    cy.get("h5").should("have.css", "font-size", "20px");
    cy.get("h6").should("have.css", "font-size", "18px");
  });

  it("Check that the font-family is correct and paragraphs size are correct", () => {
    cy.visit(baseUrl);

    cy.get("body").should("have.css", "font-family", "Raleway");
    cy.get("p").should("have.css", "font-size", "16px");
  });
});
