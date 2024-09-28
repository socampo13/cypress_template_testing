describe('Site Navigation tests', () => {
   it('Should load correctly homepage', () => {
      cy.visit('https://www.onthefuze.com');
      cy.title().should('include', 'On The Fuze');
      cy.contains('Contact Us').should('be.visible'); // Checks that contact us button exists
   });

   it('Should redirect correctly when clicking in the contact us button', () => {
      cy.get('a[href="/contact"]').click();
      cy.url().should('include', '/contact');
      cy.get('h1').should('contain', 'Contact'); //Checks page title
   });

   it('Should have security headings', () => {
        cy.request('https://www.onthefuze.com').then((response) => {
        expect(response.headers).to.have.property('content-security-policy');
        expect(response.headers).to.have.property('x-frame-options');
        expect(response.headers).to.have.property('x-content-type-options');
        expect(response.headers).to.have.property('strict-transport-security');
        });
    });
    const sensitiveFiles = [
        '.env',
        'package.json',
        'config.json',
        'wp-config.php', // Para sitios basados en WordPress
        'server.js'
      ];
    
      sensitiveFiles.forEach((file) => {
        it(`No debería exponer el archivo ${file}`, () => {
          cy.request({
            url: `https://www.onthefuze.com/${file}`,
            failOnStatusCode: false, // No fallar si el archivo no existe
          }).then((response) => {
            expect(response.status).to.equal(404); // El archivo no debe existir públicamente
          });
        });
    });
    it('Makes sure cookies are Secure and HttpOnly', () => {
        cy.visit('https://www.onthefuze.com');
        cy.getCookies().should('exist').then((cookies) => {
          cookies.forEach((cookie) => {
            expect(cookie).to.have.property('secure', true); // La cookie debe ser Secure
            expect(cookie).to.have.property('httpOnly', true); // La cookie debe ser HttpOnly
          });
        });
    });
})