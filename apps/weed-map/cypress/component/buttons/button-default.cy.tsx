import { Button } from '@ui/button';

describe('Buttons', () => {
  it('should display button with label and icon at start', () => {
    cy.mount(<Button icon="list" label="Zobrazit seznam" />);
    cy.get('span').should('have.text', 'Zobrazit seznam');
  });
});
