describe('Proceso de Checkout', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('test@example.com', 'password123');
  });

  it('debería permitir al usuario completar el proceso de checkout', () => {
    cy.intercept('GET', '/api/products').as('getProducts');
    cy.wait('@getProducts');

    cy.get('[data-testid="product-item"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid="checkout-button"]').click();
    
    cy.get('[data-testid="checkout-form"]').within(() => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="address"]').type('123 Test St');
      cy.get('input[name="city"]').type('Test City');
      cy.get('input[name="zipCode"]').type('12345');
    });
    
    cy.intercept('POST', '/api/orders').as('placeOrder');
    cy.get('[data-testid="place-order-button"]').click();
    cy.wait('@placeOrder');
    
    cy.get('[data-testid="order-confirmation"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('exist');
  });

  it('debería mostrar un error si el pago falla', () => {
    // Simular un fallo en el pago
    cy.intercept('POST', '/api/orders', {
      statusCode: 400,
      body: { error: 'Payment failed' }
    }).as('failedOrder');

    // ... (pasos para añadir al carrito y llegar al checkout)

    cy.get('[data-testid="place-order-button"]').click();
    cy.wait('@failedOrder');
    
    cy.get('[data-testid="error-message"]').should('be.visible')
      .and('contain', 'Payment failed');
  });
});