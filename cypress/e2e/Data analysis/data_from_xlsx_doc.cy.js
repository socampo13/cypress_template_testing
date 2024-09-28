describe("Verification of data from a XLSX file", () => {
  it("Check data is correct", () => {
    // Loads data from the JSON file
    cy.fixture("data.json").then((data) => {
      // Supose you want to check all registers from the XLSX file
      data.forEach((register, index) => {
        //Verify data from the register are correct
        // Add all the verifications according to the data you have in the document
        expect(register.Name, `Register ${index + 1}: Name`).to.exist;
        expect(register.Email, `Register ${index + 1}: Email`).to.exist;
        expect(register.Phone, `Register ${index + 1}: Phone`).to.exist;
        expect(register.Address, `Register ${index + 1}: Address`).to.exist;
        expect(register.Register_Date, `Register ${index + 1}: Register Date`).to.exist;
        // You can add more verifications according to your needs

        // Check that the Email format is correct
        expect(register.Email, `Register ${index + 1}: Email`).to.match(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]\.[a-zA-Z]{2,6}$/
        );

        // Checks that the phone number has the correct format
        expect(register.Phone, `Register ${index + 1}: Phone`).to.match(
          /^\d{3}-\d{3}-\d{4}$/
        );

        // Checks that the register date is a valid date
        const registerDate = new Date(register.registerDate);
        expect(
          registerDate.toString(),
          `Register ${index + 1}: Register Date`
        ).not.to.eq("Invalid Date");

        // Checks that the address is not empty
        expect(register.Address, `Register ${index + 1}: Address`).not.to.be.empty;
      });
    });
  });
});
