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

  })
});

// it('submit button is disabled until both inputs are filled out', () => {
//   // set up --> act --> assert
//   textInput()
//     .should('have.value', '');

//   authorInput()
//     .should('have.value', '');

//   submitBtn()
//     .should('be.disabled');

//   textInput()
//     .type('have fun learning React')
//     .should('have.value', 'have fun learning React');

//   authorInput()
//     .type('author name')
//     .should('have.value', 'author name');

//   submitBtn()
//     .should('not.be.disabled');

// });

// it('can cancel a new quote', () => {
//   // set up
//   textInput().should('have.value', '');
//   authorInput().should('have.value', '');

//   // act
//   textInput()
//     .type('have fun learning React')
//     .should('have.value', 'have fun learning React');

//   authorInput()
//     .type('author name')
//     .should('have.value', 'author name');

//   cancelBtn().click();

//   // assert
//   textInput().should('have.value', '');
//   authorInput().should('have.value', '');

// });

// it('can submit a new quote', () => {
//   // setup: that a quote is not currently in the DOM
//   cy.get('.container');
//   cy.contains(/have fun (Rhiannon)/i)
// })
// });