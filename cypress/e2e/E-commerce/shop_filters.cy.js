describe('Test filters from the shop', () => {
    it('Test filters', () => {
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

        cy.get('[data-test=product-sort-container]').click();
        cy.get('[data-test=product-sort-container]').type('az');
        cy.get('[data-test=product-sort-container]').click();
        cy.get('[data-test=product-sort-container]').type('za');
        cy.get('[data-test=product-sort-container]').click();
        cy.get('[data-test=product-sort-container]').type('lohi');
        cy.get('[data-test=product-sort-container]').click();
        cy.get('[data-test=product-sort-container]').type('hilo')
    });
})