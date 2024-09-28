describe('Performance test', () => {
   it('Homepage should load in less than 3 seconds', () => {
      const start = performance.now();
      cy.visit('https://www.onthefuze.com');
      cy.window().then(() => {
        const end = performance.now();
        const loadTime = end - start;
        expect(loadTime).to.be.lessThan(3000)
      });
   });

   it('Should measure total loading time of the whole site', () => {
      cy.visit('https://www.onthefuze.com');
      cy.window().then((win) => {
        const timing = win.performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        cy.log('Total loading time: ' + pageLoadTime + ' ms');

        expect(pageLoadTime).to.be.lessThan(3000);
      });
   });

   it('Should measure the FCP', () => {
      cy.visit('https://www.onthefuze.com');

      cy.window().then((win) => {
        const performanceEntries = win.performance.getEntriesByType('paint');
        const fcpEntry = performanceEntries.find(entry => entry.name === 'first-contentful-paint');
        const fcpTime = fcpEntry ? fcpEntry.startTime : null;
        cy.log('First Contentful Paint: ' + fcpTime + ' ms');

        expect(fcpTime).to.be.lessThan(1000);
      });
   });

   it('Simulating slow net', () => {
      cy.visit('https://www.onthefuze.com', {
        onBeforeLoad: (win) => {
            const connection = win.navigator.connection || {};
            connection.downlink = 0.3;
        },
      });

      cy.window().then((win) => {
        const timing = win.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        cy.log('Loading in slow net: ' + loadTime + ' ms');

        expect(loadTime).to.be.lessThan(15000);
      });
   });

   it('Images should not pass 300KB', () => {
      cy.visit('https://www.onthefuze.com');
      cy.get('img').each(($img) => {
        cy.request($img.prop('src')).then((response) => {
            expect(response.headers['content-length']).to.be.lessThan(300000);
        });
      });
   });
});