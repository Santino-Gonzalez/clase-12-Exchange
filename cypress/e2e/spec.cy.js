const url = 'http://127.0.0.1:8080';

context('Exchange Rates App', () => {
    beforeEach(() => {
        cy.visit(url);
    });

    it('Debe mostrar el título de la página', () => {
        cy.get('#title').should('contain', 'Exchange Rates');
    });

    it('Debe tener un selector de moneda base con opciones', () => {
        cy.get('#base').should('exist').and('not.be.empty');
    });

    it('Debe tener un input de fecha', () => {
        cy.get('#fecha').should('exist');
    });

    it('Debe mostrar una alerta si se presiona el botón sin seleccionar moneda y fecha', () => {
        cy.get('#botonConfirmar').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Debes seleccionar una moneda base y una fecha.');
        });
    });

    it('Debe mostrar cotizaciones al seleccionar moneda y fecha válidas', () => {
        cy.get('#base').select('USD');
        cy.get('#fecha').type('2024-01-01');
        cy.get('#botonConfirmar').click();
        cy.get('#titleCotizaciones').should('be.visible');
        cy.get('#containerCotizaciones').children().should('have.length.at.least', 1);
    });

    it('Debe convertir valores correctamente', () => {
        cy.get('#base').select('USD');
        cy.get('#fecha').type('2024-01-01');
        cy.get('#botonConfirmar').click();

        cy.get('.cambio').first().within(() => {
            cy.get('#monedaBase').type('10');
            cy.get('.botonConvertir').click();

            cy.get('#cotizacion')
                .invoke('val')
                .should('not.be.empty')
                .and('not.eq', '0'); // Asegura que tenga un valor válido
            ;
        });

    });
});
