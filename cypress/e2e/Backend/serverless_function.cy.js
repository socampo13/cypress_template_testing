describe('Test Serverless Function', () => {
   const baseUrl = 'https://pokeapi.co/api/v2/';
   it('Should return a succesful response', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}pokemon/ditto`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        
        expect(response.body.name).to.equal('ditto');
      });
   });

   it('Handle error responses correctly' , () => {
    cy.request({
        method: 'GET',
        url: `${baseUrl}pokemon/ditt`, //It is bad written in purpose
        failOnStatusCode: false
    }).then((response) => {

        console.log('Response:', response);
        expect(response.status).to.be.within(400, 499);
    });
   });
});