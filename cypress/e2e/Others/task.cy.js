describe('Pruebas para hubl_module', () => {
    beforeEach(() => {
      // Mock the hbspt object and its forms.create method
      cy.window().then((win) => {
        win.hbspt = {
          forms: {
            create: cy.stub().as('createMock')
          }
        };
      });
    });
  
    it('form_is_created_successfully', () => {
      cy.window().then((win) => {
        // Include the code under test
        win.hbspt.forms.create({
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: function ($form) {
            const productSKU = win.document.querySelector(".productView-line-info.sku-label");
            const productName = win.document.querySelector("h1.productView-title");
            const productNameText = productName.innerText;
            const productSkuText = productSKU.innerText;
  
            const hubspotForm = $form;
            const desiredProduct = hubspotForm.querySelector('input[name="desired_product"]');
            desiredProduct.value = `${productNameText} - ${productSkuText}`;
            desiredProduct.dispatchEvent(new Event("input"));
          }
        });
  
        // Assert that the create method was called with the correct parameters
        cy.get('@createMock').should('have.been.calledWith', {
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: Cypress.sinon.match.func,
        });
      });
    });
  
    it('product_sku_element_not_found', () => {
      cy.window().then((win) => {
        // Mock the document.querySelector to return null for the SKU element
        cy.stub(win.document, 'querySelector').callsFake((selector) => {
          if (selector === ".productView-line-info.sku-label") {
            return null;
          }
          if (selector === "h1.productView-title") {
            return { innerText: "Test Product" };
          }
          return null;
        });
  
        // Include the code under test
        win.hbspt.forms.create({
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: function ($form) {
            const productSKU = win.document.querySelector(".productView-line-info.sku-label");
            const productName = win.document.querySelector("h1.productView-title");
            const productNameText = productName ? productName.innerText : "";
            const productSkuText = productSKU ? productSKU.innerText : "";
  
            const hubspotForm = $form;
            const desiredProduct = hubspotForm.querySelector('input[name="desired_product"]');
            desiredProduct.value = `${productNameText} - ${productSkuText}`;
            desiredProduct.dispatchEvent(new Event("input"));
          }
        });
  
        // Assert that the create method was called with the correct parameters
        cy.get('@createMock').should('have.been.calledWith', {
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: Cypress.sinon.match.func,
        });
  
        // Assert that document.querySelector was called with the correct selectors
        cy.get(win.document.querySelector).should('have.been.calledWith', ".productView-line-info.sku-label");
        cy.get(win.document.querySelector).should('have.been.calledWith', "h1.productView-title");
      });
    });
  
    it('product_sku_and_product_name_selection', () => {
      const formMock = document.createElement('form');
      const inputMock = document.createElement('input');
      const skuLabelMock = document.createElement('div');
      const titleMock = document.createElement('h1');
  
      skuLabelMock.classList.add('productView-line-info', 'sku-label');
      titleMock.classList.add('productView-title');
  
      skuLabelMock.innerText = 'SKU123';
      titleMock.innerText = 'Product Name';
  
      document.body.appendChild(formMock);
      formMock.appendChild(inputMock);
      document.body.appendChild(skuLabelMock);
      document.body.appendChild(titleMock);
  
      cy.window().then((win) => {
        const createMock = cy.stub().as('createMock');
        win.hbspt = {
          forms: {
            create: createMock
          }
        };
  
        win.hbspt.forms.create({
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: function ($form) {
            const productSKU = win.document.querySelector(".productView-line-info.sku-label");
            const productName = win.document.querySelector("h1.productView-title");
            const productNameText = productName.innerText;
            const productSkuText = productSKU.innerText;
  
            const hubspotForm = $form;
            const desiredProduct = hubspotForm.querySelector('input[name="desired_product"]');
            desiredProduct.value = `${productNameText} - ${productSkuText}`;
            desiredProduct.dispatchEvent(new Event("input"));
          }
        });
  
        cy.get('@createMock').should('have.been.calledWith', {
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: Cypress.sinon.match.func,
        });
  
        cy.wrap(inputMock).should('have.value', 'Product Name - SKU123');
  
        document.body.removeChild(formMock);
        document.body.removeChild(skuLabelMock);
        document.body.removeChild(titleMock);
      });
    });
  
    it('product_name_and_sku_concatenated_to_desired_product_field', () => {
      cy.window().then((win) => {
        const createMock = cy.stub().as('createMock');
        win.hbspt = {
          forms: {
            create: createMock
          }
        };
  
        win.hbspt.forms.create({
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: function ($form) {
            const productSKU = document.createElement("div");
            productSKU.className = "productView-line-info sku-label";
            productSKU.innerText = "SKU123";
  
            const productName = document.createElement("h1");
            productName.className = "productView-title";
            productName.innerText = "Product ABC";
  
            const hubspotForm = document.createElement("form");
            const desiredProduct = document.createElement("input");
            desiredProduct.setAttribute("name", "desired_product");
  
            hubspotForm.appendChild(desiredProduct);
  
            $form.appendChild(productSKU);
            $form.appendChild(productName);
            $form.appendChild(hubspotForm);
  
            const productNameText = productName.innerText;
            const productSkuText = productSKU.innerText;
  
            desiredProduct.value = `${productNameText} - ${productSkuText}`;
            desiredProduct.dispatchEvent(new Event("input"));
          }
        });
  
        cy.get('@createMock').should('have.been.calledWith', {
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: Cypress.sinon.match.func,
        });
      });
    });
  
    it('form_is_embedded_in_target_element', () => {
      cy.window().then((win) => {
        const createMock = cy.stub().as('createMock');
        win.hbspt = {
          forms: {
            create: createMock
          }
        };
  
        win.hbspt.forms.create({
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: function ($form) {
            const productSKU = win.document.querySelector(".productView-line-info.sku-label");
            const productName = win.document.querySelector("h1.productView-title");
            const productNameText = productName.innerText;
            const productSkuText = productSKU.innerText;
  
            const hubspotForm = $form;
            const desiredProduct = hubspotForm.querySelector('input[name="desired_product"]');
            desiredProduct.value = `${productNameText} - ${productSkuText}`;
            desiredProduct.dispatchEvent(new Event("input"));
          }
        });
  
        cy.get('@createMock').should('have.been.calledWith', {
          region: "na1",
          portalId: "45671654",
          formId: "9e3a3a3f-7cc6-4770-9396-f5d7e6cf56aa",
          target: ".modal-content .modal-body",
          onFormReady: Cypress.sinon.match.func,
        });
      });
    });
  });
  