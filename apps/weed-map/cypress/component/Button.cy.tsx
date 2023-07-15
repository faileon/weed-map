import { Button } from '@ui/button';

describe('Buttons', () => {
  it('should display button with label and icon at start', () => {
    cy.mount(<Button icon="list" label="Zobrazit seznam" />);
    cy.get('span').should('have.text', 'Zobrazit seznam');
  });

  it('should display button with label and icon at end', () => {
    cy.mount(<Button icon="list" label="Zobrazit seznam" iconPosition="end" />);
    cy.get('span').should('have.text', 'Zobrazit seznam');

  });

  it('should display button icon', () => {
    cy.mount(<Button icon="list" variant="ghost" />);
    cy.get('span').should('not.exist');
  });
});
