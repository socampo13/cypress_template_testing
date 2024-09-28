// A complex test. It checks ALL <p></p> tags THAT ARE VISIBLE and checks
// Inside the expected_texts.json archive inside the fixtures file

describe('Check paragraphs are correct', () => {
    before(() => {
        cy.fixture('expected_texts.json').as('paragraphData');
    });
    beforeEach(() => {
        cy.visit('https://45425856.hs-sites.com/cit_on_nasdaq');
    });

    it('Review paragraphs', function(){
        const expectedParagraphTexts = this.paragraphData.texts;
        const cleanText = (text) => text.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();

        cy.get('p').filter(':visible').then(($paragraphs) => {
            const visibleParagraphCount = $paragraphs.length;
            const expectedParagraphCount = expectedParagraphTexts.length;

            expect(visibleParagraphCount).to.equal(expectedParagraphCount);
            cy.log('Expected texts:');
            expectedParagraphTexts.forEach((text,index) => {
                cy.log(`[${index + 1}] "${text}"`);
            });
            cy.log('Actual texts of visible paragraphs');
            cy.wrap($paragraphs).each((element, index) => {
                cy.wrap(element).invoke('text').then((text) => {
                    const cleanedText = cleanText(text);
                    cy.log(`[${index + 1}] "${cleanedText}"`);
                });
            });

            cy.wrap($paragraphs).each((element, index) => {
                cy.wrap(element).invoke('text').then((text) => {
                    const cleanedText = cleanText(text);
                    expect(cleanedText).to.equal(expectedParagraphTexts[index]);
                });
            });
        });
    });
});