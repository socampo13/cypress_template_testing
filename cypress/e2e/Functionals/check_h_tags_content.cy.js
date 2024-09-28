describe('Check texts exist', () => {
   beforeEach(() => {
      cy.visit('https://spelmanlogistics.com/');
   });

   it('Check that the text in H tags is the correct one', () => {

    const expectedH2 = [
      "READY → RAPID → RELIABLE",
      "How we deliver results for clients just like you",
      "Why Choose Spelman Logistics?",
      "On-Demand Delivery at lightning speed",
      "Exclusively Yours Dedicated Delivery",
      "Freight brokering for seamless national coverage",
      "\n\t\t\tTalk to our dispatch specialists today\n\t\t",
      "We’ve always got your back. Always.",
    ];

    const expectedH3 = [
        "On-Demand",
        "Scheduled",
        "Dedicated",
        "Air Courier",
        "Freight Brokering",
        "/Start here with a\s*free quote for\s*your delivery/",
        "Schedule a pick-up",
        "Quote a delivery",
        "Ready to get started?"
    ];

    const expectedH4 = [
        "\n            +\n        ",
        "\n            +\n        ",
        "\n            +\n        ",
        "Full National Certifications",
        "On-Time and Undamaged",
        "Contracted Lanes",
        "Proof of Delivery"
    ];

    const textToAvoid = [
        "See how World Market saved million with Spelman last-p"
    ];

    const expectedH6 = [
        "Affiliations and Trusted Partners:",
        "\n\t\t\tWe’re standing by and ready to help.\n\t\t",
        "- TOTAL SUPPORT 24/7",
        "  Company ",
        "  Services ",
        "  Legal "
    ];


      cy.get('h1').should('have.text', 'Your reliable logistics partner across the Northeast');

      cy.get('h2').each((element, index) => {
        cy.wrap(element).should('have.text', expectedH2[index]);
      });

      cy.get('h3').each((element, index) => {
        if(index !== 5){
            cy.wrap(element).should('have.text', expectedH3[index]);
        }
      });

      cy.get('h4').each((element) => {
        const elementText = element.textContent ? element.textContent.trim() : '';
        if (expectedH4.includes(elementText)){
            cy.wrap(element).should('have.text', elementText);
        }
      });

      //cy.get('h5').should('have.text', 'Your reliable logistics partner across the Northeast');
      cy.get('h6').each((element, index) => {
        cy.wrap(element).should('have.text', expectedH6[index])
      });
   });
});