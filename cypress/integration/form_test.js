// Test for the User Onboarding Form App are found below

describe('User Onboarding App', () => {
  beforeEach(() => {
    // connect to app running locally in browser
    cy.visit('http://localhost:3000/');
  });

  const nameInput = () => cy.get('input[name="name"]');
  const emailInput = () => cy.get('input[name="email"]');
  const passwordInput = () => cy.get('input[name="password"]');
  const roleSelect = () => cy.get('select[name="role"]');
  const houseInput = () => cy.get('input[name="house"]');
  const submitBtn = () => cy.get('#submitBtn');
  const termsBox = () => cy.get('input[name="terms"]');
  const errorDiv = () => cy.get('.errors');

  it("allows user to type in the name, email, and password inputs", () => {
    // grab the inputs, assert they are empty, type in them, and assert that what we typed is there
    nameInput()
      .should('have.value', '')
      .type('Heinz, the Baron Krauss von Espy')
      .should('have.value', 'Heinz, the Baron Krauss von Espy');

    emailInput()
      .should('have.value', '')
      .type('HeinzBKvE@email.test')
      .should('have.value', 'HeinzBKvE@email.test');

    passwordInput()
      .should('have.value', '')
      .type('teST_pa$$w0Rd123')
      .should('have.value', 'teST_pa$$w0Rd123');
  });

  it("allows user to check off the terms of service checkbox", () => {
    // verify that terms of service is not selected, then selects it, then verifies that it is selected
    termsBox()
      .should('not.be.checked')
      .click()
      .should('be.checked');
  });

  it("allows user to submit form once input requirements are met", () => {
    // start with empty form and disabled submit button
    nameInput().should('have.value', '');
    emailInput().should('have.value', '');
    passwordInput().should('have.value', '');
    roleSelect().should('have.value', '');
    houseInput().should('not.be.checked');
    termsBox().should('not.be.checked');
    submitBtn().should('be.disabled');

    // correctly fill in form fields that pass validation
    nameInput().type('Albus Dumbledore');
    emailInput().type('FawkesDad@hogwarts.com');
    passwordInput().type('Lemon Drop');
    roleSelect().select('Headmaster');
    houseInput().check('Gryffindor');
    termsBox().click();

    // check that submit button is enabled, click it, and verify form clears upon submission
    submitBtn()
      .should('not.be.disabled')
      .click();
    nameInput().should('have.value', '');
    emailInput().should('have.value', '');
    passwordInput().should('have.value', '');
    roleSelect().should('have.value', '');
    houseInput().should('not.be.checked');
    termsBox().should('not.be.checked');
    submitBtn().should('be.disabled');

  });

  it("checks for form validation when an input is clear", () => {
    // start with empty form, disabled submit button and no errors
    nameInput().should('have.value', '');
    emailInput().should('have.value', '');
    passwordInput().should('have.value', '');
    roleSelect().should('have.value', '');
    houseInput().should('not.be.checked');
    termsBox().should('not.be.checked');
    errorDiv().contains(/must/i).should('not.exist'); // all errors feature 'must'
    submitBtn().should('be.disabled');

    // enter text into password input then clear to trigger validation
    passwordInput()
      .type('password')
      .clear();
    
    // check for error code
    errorDiv().contains(/must/i);

    // Okay so like, the instructions say to check for 'an input' so I'm just going to do the one. But, I could check each individual input similarly where I'd clear the previous error by correctly completing that input then tirgger the next input error to be tested.
  });
});
