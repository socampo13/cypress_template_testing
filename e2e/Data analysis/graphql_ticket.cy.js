describe('GraphQL Ticket Query Test', () => {
    it('Should fetch ticket data by ID', () => {
      // Define the GraphQL query as a string
      const query = `
        query get_ticket($id: String!) {
          CRM {
            ticket(uniqueIdentifier: "id", uniqueIdentifierValue: $id) {
              hs_object_id
            }
          }
        }
      `;
  
      // Define the variables for the query
      const variables = {
        id: "el_valor_del_ticket_id" // Reemplaza esto con un ID de ticket válido
      };
  
      // Make the request to the GraphQL endpoint
      cy.request({
        method: 'GET',
        url: 'https://www.powwr.com/tickets-view?offset=0', // Reemplaza esto con el endpoint real
        body: {
          query,       // Aquí se pasa la consulta GraphQL
          variables    // Aquí se pasan las variables de la consulta
        }
      }).then((response) => {
        // Check the status code
        expect(response.status).to.eq(200);
  
        // Check that the response data is not null
        expect(response.body.data).to.not.be.null;
  
        // Validate the hs_object_id field
        expect(response.body.data.CRM.ticket.hs_object_id).to.eq("el_valor_esperado_de_hs_object_id");
      });
    });
  });