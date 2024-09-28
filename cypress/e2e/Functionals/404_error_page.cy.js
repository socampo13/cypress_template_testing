describe('Test the 404 error page', () => {
   it('Should display the 404 error page', () => {
    cy.visit('https://44909384.hs-sites.com/error', { failOnStatusCode: false }); //Just change the URL between the ''. As this is an error page, add the /error so it triggers the 404 page

    cy.request({
        url: '/error', //If the site has a page named "error", just add something non existent in the site so it triggers correctly
        failOnStatusCode: false
    });

    cy.contains('404').should('be.visible');
    cy.contains('Page not found').should('be.visible'); // The text 'Page not found' you can change it in case the page has a different text. Text is CASE SENSITIVE
   });
});