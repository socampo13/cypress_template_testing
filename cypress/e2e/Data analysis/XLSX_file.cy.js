describe('Read XLSX file', () => {
   it('Should read and analyze the Excel file', () => {
    const filePath = 'cypress/assets/Workflows Inventory.xlsx'; //In each test make sure to fix the path for your file.
    //Before running a test, create the file "assets"
    //The "assets" file should contain your file
    
    cy.readExcelFile(filePath).then((data) => {
        cy.log(JSON.stringify(data));

        expect(data.length).to.be.greaterThan(0);

        data.forEach((row) => { //Validates if the rows exists
            expect(row).to.have.property('Reviewed by');
            expect(row).to.have.property('Workflow Name');
            expect(row).to.have.property('Source ID');
            expect(row).to.have.property('Target ID');
            expect(row).to.have.property('Status');
        });

        const expectedNames = ['Andrés B', 'Otro Revisor', 'None', 'Andrés P', 'Viviana R']; //Validates if the values of rows exists
        data.forEach((row) => {
            if(row['Reviewed by'] !== ''){
                expect(expectedNames).to.be.include(row['Reviewed by']);
            };
        });

        const permittedStates = ['CREATED', 'ANOTHER_STATUS']; //Validates if the status is one of the permitted values
        data.forEach((row) => {
            expect(permittedStates).to.include(row.Status);
        });
    });
   });
});