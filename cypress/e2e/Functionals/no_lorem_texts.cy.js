describe("Checks for lorem ipsum texts while visiting all pages", () => {
  const urls = [ //Add the links that you want to test 
    "https://12br.com",
    "https://12br.com/about-us",
    "https://12br.com/our-services",
    "https://12br.com/learning-center",
    "https://12br.com/careers-page",
    "https://12br.com/sales",
    "https://12br.com/blog",
    "https://12br.com/contact-us",
  ];

  beforeEach(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  urls.forEach((url) => {
    it(`should not contain 'Lorem Ipsum' text on ${url}`, () => {
      cy.visit(url);

      const elementsToCheck = ["p", "a", "h1", "h2", "h3", "h4", "h5", "h6"];

      elementsToCheck.forEach((selector) => {
        cy.get("body").then(($body) => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).each(($el) => {
              const text = $el.text();
              expect(text).to.not.include("Lorem Ipsum");
            });
          }
        });
      });
    });
  });
});
