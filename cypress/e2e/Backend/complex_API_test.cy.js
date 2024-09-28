describe("Complex Reqres API Automation Test", () => {
  const apiUrl = "https://reqres.in/api";

  // Obtains all users from page 2 and checks pagination
  it("should fetch all users from page 2 and verify pagination", () => {
    cy.request("GET", `${apiUrl}/users?page=2`).then((response) => {
        // Checks if response is 200 meaning it is connected correctly
      expect(response.status).to.eq(200);
      // Checks that the body gives the response with the required fields
      expect(response.body).to.have.property("page", 2);
      expect(response.body).to.have.property("per_page");
      expect(response.body).to.have.property("total");
      expect(response.body).to.have.property("total_pages");
      // Checks that the 'data' field is an array
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
    });
  });

  // Checks if you can create a new user and verifies authentication
  it("should create a new user and verify authentication", () => {
    const newUser = {
      name: "John Doe",
      job: "Software Developer",
    };

    // Makesa POST call to create a new user
    cy.request("POST", `${apiUrl}/users`, newUser).then((response) => {
        // Checks if the response is 201 meaning it was succesful
      expect(response.status).to.eq(201);
      // Checks that the response has the required fields
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("createdAt");
      expect(response.body.name).to.eq(newUser.name);
      expect(response.body.job).to.eq(newUser.job);
    });

    const loginDetails = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    // Makes a POST call to log in
    cy.request("POST", `${apiUrl}/login`, loginDetails).then((response) => {
        //Checks the response is 200 meaning it was connected succesfully
      expect(response.status).to.eq(200);
      //Checks if the response includes the authentication token
      expect(response.body).to.have.property("token");
    });
  });

  // Test for updating a user and verify its fields
  it("should update a user and verify fields", () => {
    const updatedUser = {
      name: "Jane Doe",
      job: "Project Manager",
    };

    // Makes a PUT call to update an existing user
    cy.request("PUT", `${apiUrl}/users/2`, updatedUser).then((response) => {
        //Checks the response is 200 meaning it was connected succesfully
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updatedUser.name);
      expect(response.body.job).to.eq(updatedUser.job);
      //Checks that the response contains the updatedAt field
      expect(response.body).to.have.property("updatedAt");
    });
  });

  // Deletes a user and handle the elimination of a non existing user
  it("should delete a user and handle non-existing user gracefully", () => {
    // Makes a DELETE call to delete an existing user
    cy.request('DELETE', `${apiUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(204);
      //Checks the response is 204 meaning it was connected succesfully
    });

    // Makes a DELETE call for a non existing user and checks error
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/users/999`,
      failsOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // Checks the authentication handles errors
  it("should handle authentication errors", () => {
    const invalidLoginDetails = {
      email: "peter@klaven",
    };

    // Makes a POST call with incomplete log in data
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: invalidLoginDetails,
      failOnStatusCode: false,
    }).then((response) => {
        // Verifies the 404 state and the correct error message
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });

  // Handle register errors
  it("should handle registration errors", () => {
    const invalidRegistrationDetails = {
      email: `sydney@fife`,
    };

    // Makes a POST call with incomplete register data
    cy.request({
      method: "POST",
      url: `${apiUrl}/register`,
      body: invalidRegistrationDetails,
      failOnStatusCode: false,
    }).then((response) => {
        // Verifies the 404 state and the correct error message
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });
});
