const get = {
    betAmountSection: () => cy.get('section[ckass="bet-amount-section"]'),
    mainCard: () => get.betAmountSection().parent(),
    betFormSection: () => get.mainCard().find('div[class="bet-form"]'),
    sliderSection: () => get.mainCard().find('div[class="uo-range"]'),
    rollDiceSection: () => get.mainCard().find('section[class="wager-footer"]'),

    sprayButton: () => cy.get('button[data-test="mode-batch"]'),
    autoButton: () => cy.get('button[data-test="mode-auto"]'),
    slowRollButton: () => cy.get('button[data-test="mode-animation"]'),

    betValue: () => get.betAmountSection().find('input[id="mat-input-4"]'),
    clearButton: () => get.betAmountSection().find('button[data-test="clear"]'),
    betplus1Button: () => get.betAmountSection().find('button[data-test="plus-1"]'),
    betplus10Button: () => get.betAmountSection().find('button[data-test="plus-10"]'),
    betHalfButton: () => get.betAmountSection().find('button[data-test="1-div-2"]'),
    betTimes2Button: () => get.betAmountSection().find('button[data-test="x2"]'),
    betMaxButton: () => get.betAmountSection().find('button[data-test="profit-on-win"]'),
    switchButton: () => get.betFormSection().find('button[data-test="choice-switch"]'),
    thresholdField: () => get.betFormSection().find('input[data-test="treshold"]'),
    multiplierField: () => get.betFormSection().find('input[data-test="multiplier"]'),
    chanceField: () => get.betFormSection().find('input[data-test="chance"]'),
    slider: () => get.sliderSection().find('div[style*="var(--success)"').eq(0).parent().parent().find('span[class^="range-tooltip"]'),
    RollDiceButton: () => get.rollDiceSection().find('button[type="submit"]')
}

export default {
    get
}