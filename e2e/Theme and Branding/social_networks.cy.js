describe("Checks that the social network links exists and are working properly", () => {
  const baseUrl =
    "https://7512626.hs-sites.com/rapid-pump-meter-service-co-style-guide"; //Use the theme and branding template link of the PUBLISHED test page

  it("Clients logo is working and redirects to homepage", () => {
    cy.visit(baseUrl);

    cy.scrollTo("bottom");

    cy.wait(3000); // This wait is used for making sure that all of the elements of the footer are loaded. This prevents false negatives

    cy.get(".featured-image__image", { timeout: 10000 }) // Checks the logo/image, confirms it is clickable and that it contains a link inside the a attribute
      .should("exist")
      .and("be.visible")
      .parent("a")
      .should("have.attr", "href")
      .then((href) => {
        expect(href).to.not.be.null;

        // Clicks the logo/image
        cy.get(".featured-image__image").click();

        cy.wait(3000); // Time to view that the redirection page is correct 
      });
  });

  it("Checks if social network logos are visible", () => {
    cy.visit(baseUrl);

    cy.scrollTo("bottom");

    cy.get(".social-links").should("exist");

    cy.get(".social-links")
      .find("#facebook-f1")
      .should("exist");

    cy.get(".social-links")
      .find("#instagram2")
      .should("exist");

    cy.get(".social-links")
      .find("#linkedin-in3")
      .should("exist");

    /* cy.get(".social-links")
      .find("#linkedin-in3")
      .should("exist"); */ // Use only if there are more logos needed to review 
  });

  it("Facebook link is working correctly", () => {
    cy.visit(baseUrl);

    cy.scrollTo("bottom");

    cy.get(".social-links")
      .find("a")
      .should("have.attr", "href")
      .and("include", "facebook")
      .then((href) => {
        cy.request(href)
          .its("status")
          .should("eq", 200);
      });
  });

  it("LinkedIn link is working properly", () => {
    cy.visit(baseUrl);

    cy.scrollTo("bottom");

    cy.get(".social-links")
      .find('a[href*="linkedin"]')
      .should("have.attr", "href")
      .and("include", "linkedin")
      .then((href) => {
        cy.request(href)
          .its("status")
          .should("eq", 200);
      });
  });

  it("Instagram link is working properly", () => {
    cy.visit(baseUrl);

    cy.scrollTo("bottom");

    cy.get(".social-links")
      .find('a[href*="instagram"]')
      .should("have.attr", "href")
      .and("include", "instagram")
      .then((href) => {
        cy.request(href)
          .its("status")
          .should("eq", 200);
      });
  });

  /* it("Facebook link is working correctly", () => { // Use only if there are more links needed to review
    cy.visit(baseUrl);

    cy.scrollTo("bottom");

    cy.get(".social-links")
      .find("a")
      .should("have.attr", "href")
      .and("include", "facebook")
      .then((href) => {
        cy.request(href)
          .its("status")
          .should("eq", 200);
      });
  }); */
});
