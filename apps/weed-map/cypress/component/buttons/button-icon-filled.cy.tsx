import { Button } from '@ui/button';

describe('Buttons', () => {
  it('should display button icon', () => {
    cy.mount(<Button icon="list" variant="filled" />);
    cy.get('span').should('not.exist');
  });
});
