describe('test description', () => {
    /* before(() => {
        cy.login();
    });

    beforeEach(() => {
       const authToken = window.localStorage.getItem('authToken');
       if(authToken){
        window.localStorage.setItem('authToken', authToken);
       }
       cy.visit('https://saucedemo.com');
    }); */
    it("should successfully add and remove items from the cart", () => {
        cy.visit('https://saucedemo.com');
        // Enter valid credentials
        cy.get('input[name="user-name"]').type("standard_user");
        cy.get('input[name="password"]').type("secret_sauce"); 
    
        // Click the login button
        cy.get('input[type="submit"]').click();
    
        // Assert that the URL changes to the dashboard or home page
        cy.url().should("include", "/inventory.html");
    
        // Optionally, you can also assert that a specific element on the dashboard page is visible
        cy.get(".inventory_list").should("be.visible");
        
        // Add and inside the cart, delete the items. Then, go back to listing.
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
        cy.get('[data-test=add-to-cart-sauce-labs-bike-light]').click();
        cy.get('[data-test=shopping-cart-link]').click();
        cy.get('[data-test=remove-sauce-labs-backpack]').click();
        cy.get('[data-test=remove-sauce-labs-bike-light]').click();
        cy.get('[data-test=continue-shopping]').click();
    });
});