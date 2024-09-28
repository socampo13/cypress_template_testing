describe('E-Commerce Shopping Cart Tests', () => {
   beforeEach(() => {
      cy.visit('/product-page');
   });

   it('Should add a product to the cart and update the product count', () => {
      cy.get('[data-cy=add-to-cart-button-id-or-class]').click();

      cy.get('[data-cy=cart-item-count-id-or-class]').should('contain', '1');
   });

   it('Should calculate the total price correctly when adding multiple products', () => {
      cy.get('[data-cy=add-to-cart-button-id-or-class]').click();
      cy.get('[data-cy=add-to-cart-button-id-or-class]').click();

      cy.get('[data-cy=cart-total-id-or-class]').should(($total) => {
        const pricePerItem = 20.00;
        const itemCount = 2;
        const expectedTotal = pricePerItem * itemCount;
        expectedTotal(parseFloat($total.text())).to.equal(expectedTotal);
      });
   });

   it('Should remove a product from the cart and recalculate the total', () => {
      cy.get('[data-cy=add-to-cart-button-id-or-class]').click();

      cy.get('[data-cy=remove-from-cart-button-id-or-class]').click();

      cy.get('[data-cy=cart-item-count-id-or-class]').should('contain', '0');

      cy.get('[data-cy=cart-total-id-or-class]').should('contain', '0.00');
   });

   it('Should not allow adding a product that is out of stock', () => {
      cy.get('[data-cy=out-of-stock-id-or-class]').should('exist');
      cy.get('[data-cy=add-to-cart-button-id-or-class]').should('be.disabled');
   });

   it('Should handle server error when adding a product to the cart', () => {
      cy.intercept('POST', '/api/cart', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      }).as('addToCartError');

      cy.get('[data-cy=add-to-cart-button-id-or-class]').click();

     // Esperar la solicitud interceptada
      cy.wait('@addToCartError');

        // Verificar que se muestra un mensaje de error en la UI
      cy.get('[data-cy=error-message-id-or-class]').should('contain', 'Error al agregar el producto al carrito');

        // Verificar que el número de productos en el carrito no cambia
      cy.get('[data-cy=cart-item-count-id-or-class]').should('contain', '0');
   });

   it('Should verify that animations occur when adding/removing items from cart', () => {
      cy.get('[data-cy=add-to-cart-button-id-or-class]').click();

      cy.get('[data-cy=cart-item-id-or-class]').should('have.css', 'opacity', '1');

      cy.get('[data-cy=remove-from-cart-button-id-or-class]').click();

      cy.get('[data-cy=cart-item-id-or-class]').should('have.css', 'opacity', '0');
   });
});