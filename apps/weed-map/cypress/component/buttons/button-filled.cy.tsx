import { Button } from '@ui/button';

describe('Buttons', () => {
  it('should display button filled button', () => {
    cy.mount(<Button icon="list" label="Zobrazit seznam" variant="filled" />);
    cy.get('span').should('have.text', 'Zobrazit seznam');
  });
});
