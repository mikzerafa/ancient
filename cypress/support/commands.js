import roll from './pom/rollPage'
const je = require('json-evolve/types/jsonEvolve.js').default;

//Bet Buttons
Cypress.Commands.add('BetButtonsAreVisible', () => {
    roll.get.clearButton().IsVisible()
    roll.get.betplus1Button().IsVisible()
    roll.get.betplus10Button().IsVisible()
    roll.get.betHalfButton().IsVisible()
    roll.get.betTimes2Button().IsVisible()
    roll.get.betMaxButton().IsVisible()
})

Cypress.Commands.add('BetButtonsAreClickable', () => {
    roll.get.clearButton().click()
    roll.get.betplus1Button().click()
    roll.get.betplus10Button().click()
    roll.get.betHalfButton().click()
    roll.get.betTimes2Button().click()
    roll.get.betMaxButton().click()
})

Cypress.Commands.add('BetButtonsAreFunctional', () => {
    cy.BetPlus1ButtonIsWorking()
    cy.BetPlus10ButtonIsWorking()
    cy.BetHalfButtonIsWorking()
    cy.BetTimes2ButtonIsWorking()
    cy.BetClearButtonIsWorking()
})

Cypress.Commands.add('BetPlus1ButtonIsWorking', () => {
    const value = getBetValue()
    roll.get.betplus1Button().click()
    const newValue = getBetValue()

    cy.wrap(newValue).should('eq', value + 1)
})

Cypress.Commands.add('BetPlus10ButtonIsWorking', () => {
    const value = getBetValue()
    roll.get.betplus10Button().click()
    const newValue = getBetValue()

    cy.wrap(newValue).should('eq', value + 10)
})

Cypress.Commands.add('BetHalfButtonIsWorking', () => {
    const value = getBetValue()
    roll.get.betHalfButton().click()
    const newValue = getBetValue()

    cy.wrap(newValue).should('eq', value /2)
})
Cypress.Commands.add('BetTimes2ButtonIsWorking', () => {
    const value = getBetValue()
    roll.get.betTimes2Button().click()
    const newValue = getBetValue()

    cy.wrap(newValue).should('eq', value *2)
})

Cypress.Commands.add('BetClearButtonIsWorking', () => {
    roll.get.clearButton().click()
    cy.wrap(getBetValue()).should('be.empty')
})

const getBetValue = () => {
    je.get.valueWithAncestor(localStorage.getItem('dice-wager'), 'amount', '_value')
}

//Slider
Cypress.Commands.add('SliderIsVisible', () => {
    roll.get.slider().should('be.visible')
})

Cypress.Commands.add('MoveSliderRight', (amount) => {
    roll.get.slider().invoke('text').then(text => text+amount)
})

Cypress.Commands.add('MoveSlideLeft', (amount) => {
    roll.get.slider().invoke('text').then(text => text - amount)
})

Cypress.Commands.add('MovingSliderUpdatesValues', () => {
    cy.MovingSliderUpdatesThreshold()
    cy.MovingSliderUpdatesMultiplierField()
    cy.MovingSliderUpdatesChanceField()
})

Cypress.Commands.add('MovingSliderUpdatesThreshold', () => {
    roll.get.thresholdField().invoke('val').then((value) => {
        const originalValue = value;
        cy.MoveSliderRight(2)

        roll.get.thresholdField().invoke('val').then((value2) => {
            const newValue = value2

            cy.wrap(originalValue).should('not.eq', newValue)
        })
    })
})


Cypress.Commands.add('MovingSliderUpdatesMultiplierField', () => {
    roll.get.multiplierField().invoke('val').then((value) => {
        const originalValue = value;
        cy.MoveSliderRight(2)

        roll.get.multiplierField().invoke('val').then((value2) => {
            const newValue = value2

            cy.wrap(originalValue).should('not.eq', newValue)
        })
    })
})

Cypress.Commands.add('MovingSliderUpdatesChanceField', () => {
    roll.get.chanceField().invoke('val').then((value) => {
        const originalValue = value;
        cy.MoveSliderRight(2)

        roll.get.chanceField().invoke('val').then((value2) => {
            const newValue = value2

            cy.wrap(originalValue).should('not.eq', newValue)
        })
    })
})

//Inputs

Cypress.Commands.add('InputFieldsAreVisible', () => {
    roll.get.thresholdField().IsVisible()
    roll.get.multiplierField().IsVisible()
    roll.get.chanceField().IsVisible()
    roll.get.slider().IsVisible()
})

Cypress.Commands.add('ChangingthresholdUpdatesInputFields', () => {
    cy.InputFieldsUpdatedWhenRunningFunction(() => {cy.IncreaseThreshold()})
})

Cypress.Commands.add('ChangingMultiplierUpdatesInputFields', () => {
    cy.InputFieldsUpdatedWhenRunningFunction(() => {cy.IncreaseMultiplier()})
})

Cypress.Commands.add('ChangingChanceUpdatesInputFields', () => {
    cy.InputFieldsUpdatedWhenRunningFunction(() => {cy.IncreaseChance()})
})


Cypress.Commands.add('IncreaseThreshold', () => {
    roll.get.thresholdField().invoke('val').then(val = val+1)
})

Cypress.Commands.add('DecreaseThreshold', () => {
    roll.get.thresholdField().invoke('val').then(val = val-1)
})

Cypress.Commands.add('IncreaseMultipler', () => {
    roll.get.multiplierField().invoke('val').then(val = val + 1)
})

Cypress.Commands.add('DecreaseMultiplier', () => {
    roll.get.multiplierField().invoke('val').then(val = val -1)
})

Cypress.Commands.add('IncreaseChance', () => {
    roll.get.chanceField().invoke('val').then(val = val + 1)
})

Cypress.Commands.add('DecreaseChance', () => {
    roll.get.chanceField().invoke('val').then(val = val -1)
})


Cypress.Commands.add('InputFieldsUpdatedWhenRunningFunction', (fun) => {
    roll.get.thresholdField().invoke('val').then((threshold) => {
        const thresholdOriginal = threshold
        roll.get.multiplierField().invoke('val').then((multiplier) => {
            const multiplierOrginal = multiplier;
            roll.get.chanceField().invoke('val').then((chance) => {
                const chanceOriginal = chance
                roll.get.slider().invoke('text').then((slider) => {
                    const sliderOriginal = slider

                    //Run the function
                    fun()

                    roll.get.thresholdField().invoke('val').then((threshold) => {
                        const thresholdNew = threshold
                        roll.get.multiplierField().invoke('val').then((multiplier) => {
                            const multiplierNew  = multiplier;
                            roll.get.chanceField().invoke('val').then((chance) => {
                                const chanceNew = chance
                                roll.get.slider().invoke('text').then((slider) => {
                                    const sliderNew = slider


                                    //Test that values arent equal

                                    cy.wrap(thresholdOriginal).should('not.eq', thresholdNew);
                                    cy.wrap(multiplierOrginal).should('not.eq', multiplierNew);
                                    cy.wrap(chanceOriginal).should('not.eq', chanceNew);
                                    cy.wrap(sliderOriginal).should('not.eq', sliderNew);

                                })
                            })
                        })
                    })


                })
            })
        })
    })
  
})



