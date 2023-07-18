import { getGreeting } from '../support/app.po';

describe('weed-map', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    cy.get('#main-button').contains('Zobrazit seznam')
  });
});
