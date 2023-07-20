import { Button } from '@ui/button';

describe('Buttons', () => {
  it('should display button icon', () => {
    cy.mount(<Button icon="list" />);
    cy.get('span').should('not.exist');
  });
});
