describe("Testing a login page", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it("Should display the login form", () => {
    /* // Assert that the URL is correct
      cy.url().should('include', '/login'); */

    // Assert that the username and password fields are visible
    cy.get('input[name="user-name"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    // Assert that the login button is visible and enabled
    cy.get('input[type="submit"]')
      .should("be.visible")
      .and("not.be.disabled");
  });

  it("should display an error message for invalid credentials", () => {
    // Enter invalid credentials
    cy.get('input[name="user-name"]').type("invalidUser");
    cy.get('input[name="password"]').type("invalidPassword");

    // Click the login button
    cy.get('input[type="submit"]').click();

    // Assert that the error message is displayed
    cy.get(".error")
      .should("be.visible")
      .and(
        "contain",
        "Epic sadface: Username and password do not match any user in this service"
      );
  });
  it("should successfully log in with valid credentials", () => {
    // Enter valid credentials
    cy.get('input[name="user-name"]').type("standard_user");
    cy.get('input[name="password"]').type("secret_sauce");

    // Click the login button
    cy.get('input[type="submit"]').click();

    // Assert that the URL changes to the dashboard or home page
    cy.url().should("include", "/inventory.html");

    // Optionally, you can also assert that a specific element on the dashboard page is visible
    cy.get(".inventory_list").should("be.visible");
  });
});
