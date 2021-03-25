import './App.css';
import React, { useState, useEffect } from 'react';
import UserOnboardForm from './Form';
import User from './User';
import * as yup from 'yup';
import axios from 'axios';


// Setting initial form values 
const initialFormValues = {
  // Text Inputs
  name: '',
  email: '',
  password: '',
  // Dropdown Input for user role
  role: '',
  // Radio Buttons for House Selection
  house: '',
  // Mandatory Checkbox for Terms of Service then optional checkboxes for focus areas
  terms: false,
  charms: false,
  potions: false,
  transfiguration: false,
  defense: false,
  history: false,
  runes: false,
  divination: false, 
  quidditch: false
};

// Setting intial values for form validation error messages
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  role: '',
  house: '',
  terms: ''
};

// Setting initial values for saved users and whether form submit button is disabled
const initialUsers = [];
const initialDisabled = true;

// Create schema for form validation
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name must be filled in')
    .min(6, 'Name must be at least 6 characters'),
  email: yup
    .string()
    .email('You must enter a valid email')
    .required('Email must be entered'),
  password: yup
    .string()
    .required('You must enter a password')
    .min(7, 'Your password must be at least 7 characters'),
  role: yup
    .string()
    .oneOf(['Student', 'Caretaker', 'Ghost', 'Gamekeeper', 'Kitchen Staff', 'Nurse', 'Professor', 'Headmaster'], 'A role must be selected'),
  house: yup
    .string()
    .oneOf(['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], 'You must select a house'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must agree to the Terms of Service'),
  charms: yup.string(),
  potions: yup.string(),
  transfiguration: yup.string(),
  defense: yup.string(),
  history: yup.string(),
  runes: yup.string(),
  divination: yup.string(), 
  quidditch: yup.string()
});

export default function App() {
  // Setting variables into State

  // Setting into state user variable for array of user info which will change on successful form submissions
  const [users, setUsers] = useState(initialUsers);
  // Setting form values object into state
  const [formValues, setFormValues] = useState(initialFormValues);
  // Setting object containing different form field errors into state
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  // Setting boolean variable controlling submit button into state
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = newUser => {

    // Using axios to post successfully submitted form with new user data to backend location
    axios
      .post(`https://reqres.in/api/users`, newUser)
        .then((res) => {
          // If post is successful, new data is added to existing user array with spread operator
          setUsers([res.data, ...users]);
          
        })
        .catch(err => {
          console.log(err);
        })
        // Form is reset regardless of whether post is successful
        .finally(setFormValues(initialFormValues))
  }

  // Event handler functions
  const inputChange = (name, value) => {
    // Using yup.reach to use the defined schema to test individual parts of the form for validation
    // It takes the schema as the first argument, and the key to be tested as the second argument
    yup
      .reach(schema, name) 
      .validate(value)
      // Clears error if validation is successful
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          // Validation error from schema if unsuccessful
          [name]: err.errors[0],
        });
      })
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const formSubmit = () => {
    const newUser = {
      username: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role.trim(),
      house: formValues.house.trim(),
      terms: formValues.terms,
      focus: ['charms', 'potions', 'transfiguration', 'defense', 'history', 'runes', 'divination', 'quidditch'].filter(focus => formValues[focus])
    };
    postNewUser(newUser);
  }

  // Employing an effect hook to validate the form each time it is updated allowing for the submit button to be enabled once the form is totally valid
  useEffect(() => {
    
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues])

  return (
    <body className='container'>
      <header><h1>User Onboarding Form</h1></header>

      <UserOnboardForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </body>
  );
}


