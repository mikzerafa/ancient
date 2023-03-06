describe('CS Go Roll Tests', () => {
  before(() => {
    cy.visit('',  {
      headers: {
          'user-agent': 'pyton-requests/2.26.0'
      }
  })
  })

  it('Should have Bet Buttons Working as Expected', () => {
      cy.BetButtonsAreVisible()
      cy.BetButtonsAreClickable()
      cy.BetButtonsAreFunctional()
  })

  it('Should Update values when moving slider', () => {
      cy.SliderIsVisible()
      cy.MovingSliderUpdatesValues()
  })

  it('Should update inputs when updating other inputs', () => {

  })

  it('Should Update button Text when updatinhg Rolls Count', () => {

  })

  it('Should show empty list of bets when intercepting api and mocking response', () => {

  })
})