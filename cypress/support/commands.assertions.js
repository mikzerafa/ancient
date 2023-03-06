Cypress.Commands.add('IsVisible', {prevSubject: true}, (subject)=> {
    return cy.wrap(subject).should('be.visible')
})