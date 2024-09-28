describe('Reqres API Automation Test', () => {
    const apiUrl = 'https://reqres.in/api/users';

    it('should fetch all users', () => {
        cy.request('GET', `${apiUrl}?page=2`)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
          });
    });

    it('should create a new user', () => {
        const newUser = {
            name: 'John Doe',
            job: 'Software Developer'
        };

        cy.request('POST', apiUrl, newUser)
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('createdAt');
            expect(response.body.name).to.eq(newUser.name);
            expect(response.body.job).to.eq(newUser.job);
          });
    });

    it('should update a user', () => {
       const updatedUser = {
        name: 'Jane Doe',
        job: 'Project Manager'
       };

       cy.request('PUT', `${apiUrl}/2`, updatedUser)
         .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq(updatedUser.name);
            expect(response.body.job).to.eq(updatedUser.job);
            expect(response.body).to.have.property('updatedAt');
         });
    });

    it('should delete a user', () => {
        cy.request('DELETE', `${apiUrl}/2`)
          .then((response) => {
            expect(response.status).to.eq(204);
          });
    });
});