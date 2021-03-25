import React from 'react';

export default function UserOnboardForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = evt => {
    evt.preventDefault();
    submit();
  }

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Add a User</h2>

        {/* Submit button defaults to disabled */}
        <button disabled={disabled} id='submitBtn' >Submit</button>

        <div className='errors'>
          {/* This section is for rendering any form validation errors that are triggered */}
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.role}</div>
          <div>{errors.house}</div>
          <div>{errors.terms}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>General information</h4>

        {/* Text inputs for Name, Email, and Password */}
        <label>Name&nbsp;
          <input
            value={values.name}
            onChange={onChange}
            name='name'
            type='text'
          />
        </label>

        <label>Email
          <input
            value={values.email}
            onChange={onChange}
            name='email'
            type='text'
          />
        </label>

        <label>Password
          <input
            value={values.password}
            onChange={onChange}
            name='password'
            type='text'
          />
        </label>

        {/* Dropdown input for role */}
        <label>Role
          <select
            onChange={onChange}
            value={values.role}
            name='role'
          >
            <option value=''>- Select an option -</option>
            <option value='Student'>Student</option>
            <option value='Caretaker'>Caretaker</option>
            <option value='Ghost'>Ghost</option>
            <option value='Gamekeeper'>Gamekeeper</option>
            <option value='Kitchen Staff'>Kitchen Staff</option>
            <option value='Nurse'>Nurse</option>
            <option value='Professor'>Professor</option>
            <option value='Headmaster'>Headmaster</option>
          </select>
        </label>

        {/* Radio buttons for House designation */}
        <label>Gryffindor
          <input
            type='radio'
            name='house'
            value='Gryffindor'
            onChange={onChange}
            checked={values.house === 'Gryffindor'}
          />
        </label>

        <label>Hufflepuff
        <input
            type='radio'
            name='house'
            value='Hufflepuff'
            onChange={onChange}
            checked={values.house === 'Hufflepuff'}
          />
        </label>

        <label>Ravenclaw
          <input
            type='radio'
            name='house'
            value='Ravenclaw'
            onChange={onChange}
            checked={values.house === 'Ravenclaw'}
          />
        </label>

        <label>Slytherin
        <input
            type='radio'
            name='house'
            value='Slytherin'
            onChange={onChange}
            checked={values.house === 'Slytherin'}
          />
        </label>
      </div>

      <div className='form-group checkboxes'>
        <h4>Areas of Focus</h4>

        {/* Checkboxes for focus areas */}
        <label>Charms
          <input
            type='checkbox'
            name='charms'
            onChange={onChange}
            checked={values.charms}
          />
        </label>

        <label>Potions
          <input
            type='checkbox'
            name='potions'
            onChange={onChange}
            checked={values.potions}
          />
        </label>

        <label>Transfiguration
          <input
            type='checkbox'
            name='transfiguration'
            onChange={onChange}
            checked={values.transfiguration}
          />
        </label>

        <label>Defense Against the Dark Arts
          <input
            type='checkbox'
            name='defense'
            onChange={onChange}
            checked={values.defense}
          />
        </label>

        <label>History of Magic
          <input
            type='checkbox'
            name='history'
            onChange={onChange}
            checked={values.history}
          />
        </label>

        <label>Ancient Runes
          <input
            type='checkbox'
            name='runes'
            onChange={onChange}
            checked={values.runes}
          />
        </label>

        <label>Divination
          <input
            type='checkbox'
            name='divination'
            onChange={onChange}
            checked={values.divination}
          />
        </label>

        <label>Quidditch
          <input
            type='checkbox'
            name='quidditch'
            onChange={onChange}
            checked={values.quidditch}
          />
        </label>
      </div>
      {/* Mandatory checkbox for terms of service */}
      <div className='form-group checkboxes'>
        <h4>User Terms of Service</h4>
        <label>Accept Terms?
            <input
              type='checkbox'
              name='terms'
              onChange={onChange}
              checked={values.terms}
            />
          </label>
      </div>
    </form>
  )
}