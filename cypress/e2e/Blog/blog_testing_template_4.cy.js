//ALWAYS TAKE INTO ACCOUNT THE SLUGS TO AVOID ISSUES AND NOT WANTED ERRORS
describe("Test Blog Listing templates functionalities", () => {
  const baseUrl = "https://45594336.hs-sites.com/listing"; //The baseUrl should be the URL from the LISTING page. Only change URL commented lines that explains it
  const baseSearch = "https://45594336.hs-sites.com/hs-search-results"; //The baseSearch should be the URL from the SEARCH page. Only change URL commented lines that explains it
  const basePage2 = "https://45594336.hs-sites.com/listing/page/2"; // only need to change https://45763993.hs-sites.com
  const basePage3 = "https://45594336.hs-sites.com/listing/page/3"; // https://45763993.hs-sites.com
  const basePost = "https://45594336.hs-sites.com/listing/journey-continues"; // Just change the URL comming from one of the post in the listing page
  const basePostInside =
    "https://45594336.hs-sites.com/listing/journey-continues"; // URL from the post that was previously clicked
  const nextPagePost =
    "https://45594336.hs-sites.com/listing/shaping-web-content-future"; // URL from the post that comes after clicking the "next article >" button

  it("Search bar is working properly", () => {
    cy.visit(baseUrl);

    cy.get(".hs-search-field__input").click();
    cy.get(".hs-search-field__input").type("test");
    cy.get("button").click();
    cy.get(".hs-search-field__bar > form").submit();

    cy.url().should("contains", baseSearch);
  });

  it("Check if pagination is working correctly", () => {
    cy.visit(baseUrl);
    cy.get(".pagination__link--next").click();
    cy.url().should("contains", basePage2);

    cy.get(".pagination__link--next").click();
    cy.url().should("contains", basePage3);

    cy.get(".pagination__link--prev").click();
    cy.url().should("contains", basePage2);

    cy.get(".pagination__link:nth-child(2)").click();
    cy.url().should("contains", baseUrl);
  });

  it("Check if clicking a post redirects correctly", () => {
    cy.visit(baseUrl);

    cy.get(".text-image__container")
      .first()
      .find(".blog-index-imagen", basePost)
      .click();
    cy.url().should("include", basePostInside);
  });

  it("Buttons inside the posts are working correctly", () => {
    cy.visit(basePostInside);

    cy.get(".button:nth-child(2)").click();
    cy.url().should("contains", nextPagePost);

    cy.get(".blog-post__navigation > .button").click();
    cy.url().should("contains", baseUrl);
  });

  // First form
  it("Check if the form inside posts works correctly", () => {
    cy.visit(basePostInside);

    cy.get(".blog-post__columns").click();
    cy.get(".input").click({ multiple: true });
    cy.get(
      '#email-b4cf7084-899c-4093-bc0c-0e0aaebdf036_7714, input[name="email"]'
    )
      .first()
      .click({ multiple: true })
      .type("support@onthefuze.com");
    cy.get(".hs-button").click({ multiple: true });
  });

  //Bottom form
  it("Check if the form inside posts works correctly", () => {
    cy.visit(basePostInside);

    cy.get(".newsletter-form").within(() => {
      cy.get(".input");
      cy.get(
        '#email-b4cf7084-899c-4093-bc0c-0e0aaebdf036_7714, input[name="email"]'
      )
        .first()
        .click({ multiple: true })
        .type("support@onthefuze.com");
      cy.get(".hs-button").click({ multiple: true });
    });
  });
});
