Cypress.config('pageLoadTimeout', 30000);

beforeEach(() => {
  cy.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

describe('Page Load Time Test', () => {
    it('should measure page load time and assert it is less than 10 seconds', () => {
      const startTime = Date.now();
  
      cy.visit('https://12br.com');
  
      cy.window().then(() => {
        const endTime = Date.now();
        const loadTime = endTime - startTime;
  
        cy.log(`Page loaded in ${loadTime} ms`);
        expect(loadTime).to.be.lessThan(7000); // Assert that the load time is less than 10 seconds
      });
    });
  });
  