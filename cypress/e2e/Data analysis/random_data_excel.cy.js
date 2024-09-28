describe("Check random data from Companies in an Excel", () => {
  // Get X elements from an array
  const getRandomElements = (arr, n) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  it("Checks that the company properties randomly selected are correct", () => {
    // Loads data from the JSON file
    cy.fixture("companies.json").then((data) => {
      // Randomly gets 5 companies
      const selectedCompanies = getRandomElements(data, 5);

      selectedCompanies.forEach((company, index) => {
        // Checks all fields exist
        expect(company.Name, `Company ${index + 1}: Name`).to.exist;
        expect(company.Address, `Company ${index + 1}: Address`).to.exist;
        expect(company.Phone, `Company ${index + 1}: Phone`).to.exist;
        expect(company.Email, `Company ${index + 1}: Email`).to.exist;
        expect(company.Associations, `Company ${index + 1}: Associations`).to.exist;

        // Checks that the email format is correct
        expect(company.Email, `Company ${index + 1}: Email`).to.match(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        );

        // Checks that the phone number has the correct format
        expect(company.Phone, `Company ${index + 1}: Phone`).to.match(
          /^\d{3}-\d{3}-\d{4}$/
        );

        // Checks that the address is not empty
        expect(company.Address, `Company ${index + 1}: Address`).to.not.be.empty;

        // Checks that the associations are not empty and be an array
        expect(
          company.Associations,
          `Company ${index + 1}: Associations`
        ).to.be.an("array").that.is.not.empty;

        // Checks every association
        company.Associations.forEach((association, assocIndex) => {
          expect(
            association.Name,
            `Company ${index + 1}: Association ${assocIndex + 1}: Name`).to.exist;
          expect(
            association.Type,
            `Company ${index + 1}: Association ${assocIndex + 1}: Type`).to.exist;
        });
      });
    });
  });
});
